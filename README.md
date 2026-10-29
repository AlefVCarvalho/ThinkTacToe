# 🎮 ThinkTacToe — Jogo da Velha

Projeto de Jogo da Velha desenvolvido com **HTML, CSS e JavaScript**, com suporte a partidas entre dois jogadores (PvP) e contra o computador (PvC), oferecendo diferentes níveis de dificuldade.

## 📑 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Algoritmos e dificuldades](#-algoritmos-e-dificuldades)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Telas do jogo](#%EF%B8%8F-telas-do-jogo)
- [Como executar](#%EF%B8%8F-como-executar)
- [Tecnologias utilizadas](#%EF%B8%8F-tecnologias-utilizadas)

## 🎯 Sobre o projeto

O objetivo é implementar o clássico Jogo da Velha em uma interface interativa, permitindo partidas entre dois jogadores ou contra uma inteligência artificial com diferentes níveis de dificuldade.

O projeto explora lógica de programação, manipulação do DOM, gerenciamento de estados e algoritmos de tomada de decisão.

## ✨ Funcionalidades

- **PvP (Player vs. Player):** dois jogadores se alternam na mesma partida.
- **PvC (Player vs. Computer):** partida contra o computador.
- **Dificuldades progressivas:** diferentes estratégias de decisão para a inteligência artificial.
- **Detecção de resultados:** identificação de vitória, derrota ou empate.
- **Interface interativa:** tabuleiro, seleção de modo e dificuldade.

## 🧠 Algoritmos e dificuldades

### 🟢 Fácil — Seleção aleatória (*Random*)

Neste nível, o algoritmo identifica todas as posições livres do tabuleiro e seleciona uma delas aleatoriamente. Não há análise tática, avaliação de estados futuros ou tentativa deliberada de vencer ou bloquear o oponente.

**Funcionamento:**
1. Percorre o tabuleiro e identifica as células vazias.
2. Constrói a lista de jogadas válidas.
3. Seleciona aleatoriamente uma posição dessa lista.
4. Executa a jogada selecionada.

### 🟡 Médio — Heurística tática (*Rule-Based*)

Neste nível, o algoritmo utiliza regras de prioridade para avaliar situações imediatas do tabuleiro. Em vez de escolher qualquer posição livre, verifica se existe uma jogada capaz de produzir uma vitória ou impedir uma vitória iminente do adversário.

**Funcionamento:**
1. Verifica se o computador pode vencer na próxima jogada e, se possível, executa o movimento vencedor.
2. Caso contrário, verifica se o adversário possui uma jogada que resultaria em vitória e ocupa a posição necessária para bloqueá-lo.
3. Se nenhuma dessas condições ocorrer, seleciona aleatoriamente uma posição livre.

Essa abordagem melhora a tomada de decisão em relação ao nível fácil, mas não avalia sistematicamente as consequências futuras das jogadas. Portanto, pode deixar de identificar ameaças ou oportunidades que dependam de múltiplos movimentos.

### 🔴 Difícil — Minimax (*Adversarial Search*)

Neste nível, a IA utiliza o algoritmo Minimax para explorar os possíveis estados futuros do jogo. Como o jogo da velha possui um espaço de busca relativamente pequeno, é possível analisar as sequências de jogadas até alcançar um estado terminal: vitória, derrota ou empate.

O algoritmo considera que ambos os jogadores tomam decisões ótimas. Assim, o computador procura maximizar seu resultado, assumindo que o adversário tentará minimizar esse mesmo resultado.

**Funcionamento:**
1. Gera os estados resultantes de cada jogada válida.
2. Expande recursivamente a árvore de possibilidades, alternando entre os turnos do computador e do adversário.
3. Avalia os estados terminais com pontuações: valores positivos para vitórias do computador, negativos para derrotas e zero para empates.
4. Propaga as pontuações pela árvore: maximiza nos turnos da IA e minimiza nos turnos do adversário.
5. Seleciona a jogada com a melhor pontuação, considerando as respostas possíveis do oponente.

A implementação também pode considerar a profundidade da árvore na avaliação dos resultados, atribuindo maior valor a vitórias rápidas e preferindo prolongar situações inevitáveis de derrota.

> Como o espaço de estados do jogo da velha é finito e pequeno, o Minimax, quando explora todas as possibilidades e utiliza uma avaliação terminal consistente, permite que a IA jogue de forma ótima. Dessa maneira, contra um adversário que também jogue perfeitamente, a **IA não perde**.

## 📂 Estrutura do projeto

```text
ThinkTacToe/
├── index.html   # Estrutura da interface
├── results.json # Armazenamento de memória local
├── style.css    # Estilos e layout do jogo
├── script.js    # Lógica, regras e algoritmos
└── README.md    # Documentação do projeto
```

## 🖼️ Telas do jogo

### 🏠 Tela inicial
<img width="480" height="300" alt="print (1)" src="https://github.com/user-attachments/assets/be9ee8a3-fd54-4964-9b9f-b3cf04a4fc2f" />

### 🎮 Modo PvP
<img width="480" height="300" alt="print (3)" src="https://github.com/user-attachments/assets/c71c54d1-16f4-498b-a347-12b0313136b7" />

### 🤖 Modo PvC
<img width="480" height="300" alt="print (2)" src="https://github.com/user-attachments/assets/83ba9843-a2f3-47e6-b62e-3bcc0579aff8" />

### 🏆 Resultado da partida
<img width="480" height="300" alt="print (4)" src="https://github.com/user-attachments/assets/0d29631d-820f-41e6-b1dc-77b358ca993e" />

## ▶️ Como executar

1. Faça download do zip desse repositório

2. Extraia os arquivos

3. Abra o arquivo `index.html` no navegador.

Não é necessário instalar dependências, desde que o projeto utilize apenas HTML, CSS e JavaScript nativos.

## 🛠️ Tecnologias utilizadas

- **HTML:** estrutura da aplicação.
- **CSS:** estilização e layout responsivo, conforme implementado.
- **JavaScript:** regras do jogo, interação com a interface e lógica da inteligência artificial
