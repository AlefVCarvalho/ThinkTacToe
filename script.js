
const $ = s => document.querySelector(s);

const screens = ["menu-screen", "difficulty-screen", "game-screen"];
const wins = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 4, 8], [2, 4, 6],
  [0, 3, 6], [1, 4, 7], [2, 5, 8]
];

const STORAGE_KEY = "tictactoe.results.v1";

const emptyData = () => ({
  scores: {
    pvp: { P1: 0, draw: 0, P2: 0 },
    pvc: { P1: 0, draw: 0, AI: 0 }
  },
  games: { pvp: [], pvc: [] }
});

let stats = loadStats();
let mode = "pvp";
let difficulty = "easy";
let board = Array(9).fill(0);
let current = 1;
let gameOver = false;
let moves = 0;
let saved = false;
let aiTimer = null;

function loadStats() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (raw?.scores && raw?.games) return normalizeStats(raw);
  } catch {}
  return emptyData();
}

function normalizeStats(raw) {
  const data = emptyData();

  for (const m of ["pvp", "pvc"]) {
    Object.assign(data.scores[m], raw.scores?.[m] || {});
    data.games[m] = Array.isArray(raw.games?.[m])
      ? raw.games[m]
      : [];
  }

  return data;
}

function persistStats() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    return true;
  } catch {
    return false;
  }
}

function showScreen(id) {
  screens.forEach(s =>
    $("#" + s).classList.toggle("active", s === id)
  );

  $("#end-overlay").classList.remove("active");
}

function winnerOf(cells) {
  for (const line of wins) {
    const [a, b, c] = line;

    if (
      cells[a] &&
      cells[a] === cells[b] &&
      cells[a] === cells[c]
    ) {
      return { winner: cells[a], line };
    }
  }

  return null;
}

function isDraw(cells) {
  return cells.every(Boolean) && !winnerOf(cells);
}

function emptyCells(cells) {
  return cells
    .map((v, i) => v ? -1 : i)
    .filter(i => i >= 0);
}

// Fácil: jogada aleatória.
function chooseEasy(cells) {
  const empty = emptyCells(cells);
  return empty[Math.floor(Math.random() * empty.length)];
}

// Médio: tenta vencer, depois bloquear o adversário.
function chooseMedium(cells) {
  for (const mark of [2, 1]) {
    for (const i of emptyCells(cells)) {
      cells[i] = mark;
      const winsNow = Boolean(winnerOf(cells));
      cells[i] = 0;

      if (winsNow) return i;
    }
  }

  return chooseEasy(cells);
}

// Difícil: Minimax.
function minimax(cells, maximizing, depth = 0) {
  const result = winnerOf(cells);

  if (result) {
    return result.winner === 2 ? 10 - depth : depth - 10;
  }

  if (cells.every(Boolean)) return 0;

  let best = maximizing ? -Infinity : Infinity;

  for (const i of emptyCells(cells)) {
    cells[i] = maximizing ? 2 : 1;

    const value = minimax(cells, !maximizing, depth + 1);

    cells[i] = 0;

    best = maximizing
      ? Math.max(best, value)
      : Math.min(best, value);
  }

  return best;
}

function chooseHard(cells) {
  let bestMove = -1;
  let bestScore = -Infinity;

  for (const i of emptyCells(cells)) {
    cells[i] = 2;
    const value = minimax(cells, false, 1);
    cells[i] = 0;

    if (value > bestScore) {
      bestScore = value;
      bestMove = i;
    }
  }

  return bestMove;
}

function chooseAiMove() {
  if (difficulty === "easy") return chooseEasy(board);
  if (difficulty === "medium") return chooseMedium(board);
  return chooseHard(board);
}

function renderScore() {
  const s = stats.scores[mode];
  const third = mode === "pvp" ? "P2" : "AI";

  $("#score").innerHTML = [
    ["P1", s.P1],
    ["Empate", s.draw],
    [third, s[third]]
  ].map(([label, value]) => `
    <div class="score-item">
      <span class="number">${Number(value) || 0}</span>
      <span class="label">${label}</span>
    </div>
  `).join("");
}

function renderBoard(winningLine = []) {
  const el = $("#board");
  el.innerHTML = "";

  board.forEach((value, index) => {
    const cell = document.createElement("button");

    cell.type = "button";

    cell.className =
      "cell" +
      (value === 1 ? " x" : value === 2 ? " o" : "") +
      (winningLine.includes(index) ? " winning" : "");

    // X azul. O tem a cor definida pelo modo no CSS.
    cell.textContent = value === 1 ? "×" : value === 2 ? "○" : "";

    cell.setAttribute(
      "aria-label",
      value
        ? `Casa ${index + 1}: ${
            value === 1 ? "P1" : mode === "pvc" ? "AI" : "P2"
          }`
        : `Casa ${index + 1}, vazia`
    );

    cell.disabled =
      gameOver ||
      Boolean(value) ||
      (mode === "pvc" && current === 2);

    cell.addEventListener("click", () => playMove(index));
    el.appendChild(cell);
  });

  $("#player-one").classList.toggle(
    "active",
    !gameOver && current === 1
  );

  $("#player-two").classList.toggle(
    "active",
    !gameOver && current === 2
  );
}

function updateStatus(message) {
  $("#status").textContent = message;
}

function startGame(selectedMode, selectedDifficulty = "easy") {
  mode = selectedMode;
  difficulty = selectedDifficulty;

  $(".game-layout").classList.toggle("pvp", mode === "pvp");
  $(".game-layout").classList.toggle("pvc", mode === "pvc");

  $("#opponent-orb").textContent = mode === "pvp" ? "P2" : "AI";
  $("#opponent-name").textContent = mode === "pvp" ? "P2" : "AI";

  $("#player-two").classList.toggle("player-ai", mode === "pvc");
  $("#player-two").classList.toggle("player-two", mode === "pvp");

  renderScore();
  resetGame();
  showScreen("game-screen");
}

function resetGame() {
  clearTimeout(aiTimer);

  $("#end-overlay").classList.remove("active");

  board = Array(9).fill(0);
  current = 1;
  gameOver = false;
  moves = 0;
  saved = false;

  updateStatus("Vez de P1");
  renderBoard();
}

function finishGame(winner, line = []) {
  gameOver = true;

  const label =
    winner === 1
      ? "P1 venceu"
      : winner === 2
        ? (mode === "pvp" ? "P2 venceu" : "AI venceu")
        : "Empate";

  updateStatus(label);
  renderBoard(line);
  saveResult(winner);

  $("#end-result").textContent = label;
  $("#end-overlay").classList.add("active");
}

function saveResult(winner) {
  if (saved) return;
  saved = true;

  const winnerKey =
    winner === 1
      ? "P1"
      : winner === 2
        ? (mode === "pvc" ? "AI" : "P2")
        : "draw";

  const record = {
    date: new Date().toISOString(),
    mode,
    difficulty: mode === "pvc" ? difficulty : null,
    winner: winnerKey,
    moves
  };

  stats.scores[mode][winnerKey] =
    (Number(stats.scores[mode][winnerKey]) || 0) + 1;

  stats.games[mode].push(record);

  const ok = persistStats();
  renderScore();

  if (!ok) {
    alert(
      "Não foi possível salvar neste navegador. " +
      "Exporte os resultados para guardar uma cópia."
    );
  }
}

function playMove(index, isAiMove = false) {
  if (
    gameOver ||
    board[index] ||
    (mode === "pvc" && current === 2 && !isAiMove)
  ) {
    return;
  }

  board[index] = current;
  moves++;

  const result = winnerOf(board);

  if (result) {
    finishGame(result.winner, result.line);
    return;
  }

  if (isDraw(board)) {
    finishGame(0);
    return;
  }

  current = current === 1 ? 2 : 1;

  updateStatus(
    mode === "pvc" && current === 2
      ? "Vez da AI"
      : "Vez de " + (current === 1 ? "P1" : "P2")
  );

  renderBoard();

  if (mode === "pvc" && current === 2) {
    aiTimer = setTimeout(() => {
      if (gameOver) return;

      const move = chooseAiMove();
      if (move >= 0) playMove(move, true);
    }, 250);
  }
}

function exportResults() {
  const blob = new Blob(
    [JSON.stringify(stats, null, 2) + "\n"],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "tictactoe-results.json";
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function importResults(file) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);

      if (!parsed.scores || !parsed.games) throw Error();

      stats = normalizeStats(parsed);

      if (!persistStats()) throw Error();

      renderScore();
      alert("Resultados importados.");
    } catch {
      alert("Arquivo JSON inválido ou não foi possível salvar.");
    }
  };

  reader.readAsText(file);
}

// Eventos da interface.
$("#pvp-button").addEventListener("click", () => startGame("pvp"));

$("#pvc-button").addEventListener("click", () => {
  showScreen("difficulty-screen");
});

$("#difficulty-back").addEventListener("click", () => {
  showScreen("menu-screen");
});

document.querySelectorAll("[data-difficulty]").forEach(button => {
  button.addEventListener("click", () => {
    startGame("pvc", button.dataset.difficulty);
  });
});

$("#restart-button").addEventListener("click", resetGame);

$("#menu-button").addEventListener("click", () => {
  clearTimeout(aiTimer);
  showScreen("menu-screen");
});

$("#rematch-button").addEventListener("click", resetGame);

$("#end-menu-button").addEventListener("click", () => {
  clearTimeout(aiTimer);
  showScreen("menu-screen");
});

$("#export-button").addEventListener("click", exportResults);

$("#import-button").addEventListener("click", () => {
  $("#import-file").click();
});

$("#import-file").addEventListener("change", event => {
  if (event.target.files[0]) {
    importResults(event.target.files[0]);
  }

  event.target.value = "";
});
