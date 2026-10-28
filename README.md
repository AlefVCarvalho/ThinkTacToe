# 🎮 ThinkTacToe — Jogo da Velha

Projeto de Jogo da Velha desenvolvido com **HTML, CSS e JavaScript**, com suporte a partidas entre dois jogadores (PvP) e contra o computador (PvC), oferecendo diferentes níveis de dificuldade.

## 📑 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Algoritmos e dificuldades](#-algoritmos-e-dificuldades)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Telas do jogo](#-telas-do-jogo)
- [Como executar](#-como-executar)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)

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

A inteligência artificial utiliza estratégias distintas de acordo com a dificuldade selecionada.

### 🟢 Fácil

O computador realiza jogadas simples, com escolha aleatória entre as posições disponíveis. Esse nível permite uma partida mais casual, sem planejamento estratégico consistente.

**Conceito aplicado:** geração de jogadas válidas e seleção aleatória.

### 🟡 Médio

O computador utiliza regras táticas para identificar oportunidades de vitória e bloquear possíveis vitórias do adversário, tornando as partidas mais competitivas.

**Conceito aplicado:** análise de situações imediatas e aplicação de prioridades estratégicas.

### 🔴 Difícil

O computador utiliza uma estratégia de busca de jogadas para avaliar possíveis desdobramentos da partida e escolher movimentos mais vantajosos.

**Conceito aplicado:** algoritmo Minimax, caso seja o método implementado nesta dificuldade.

O Minimax explora as possibilidades futuras do jogo, considerando as melhores respostas de ambos os jogadores, buscando maximizar as chances de vitória e minimizar as de derrota.

> **Observação:** a descrição de cada dificuldade deve corresponder à implementação real do código. O Minimax, em particular, só deve ser mencionado se estiver presente no projeto.

## 📂 Estrutura do projeto

```text
ThinkTacToe/
├── index.html   # Estrutura da interface
├── style.css    # Estilos e layout do jogo
├── script.js    # Lógica, regras e algoritmos
└── README.md    # Documentação do projeto
```

## 🖼️ Telas do jogo

As imagens abaixo serão adicionadas posteriormente. Salve as capturas na pasta `screenshots/` e substitua os caminhos conforme os nomes dos arquivos.

### 🏠 Tela inicial
<img width="1205" height="729" alt="print (1)" src="https://github.com/user-attachments/assets/be9ee8a3-fd54-4964-9b9f-b3cf04a4fc2f" />

### 🎮 Modo PvP
<img width="1326" height="961" alt="print (3)" src="https://github.com/user-attachments/assets/c71c54d1-16f4-498b-a347-12b0313136b7" />

### 🤖 Modo PvC
<img width="1426" height="969" alt="print (2)" src="https://github.com/user-attachments/assets/83ba9843-a2f3-47e6-b62e-3bcc0579aff8" />

### 🏆 Resultado da partida
<img width="1280" height="942" alt="print (4)" src="https://github.com/user-attachments/assets/0d29631d-820f-41e6-b1dc-77b358ca993e" />

## ▶️ Como executar

1. Faça download do zip esse repositório

2. Extraia os arquivos

3. Abra o arquivo `index.html` no navegador.

Não é necessário instalar dependências, desde que o projeto utilize apenas HTML, CSS e JavaScript nativos.

## 🛠️ Tecnologias utilizadas

- **HTML:** estrutura da aplicação.
- **CSS:** estilização e layout responsivo, conforme implementado.
- **JavaScript:** regras do jogo, interação com a interface e lógica da inteligência artificial.<img width="1205" height="729" alt="Captura de tela 2026-10-28 194223" src="https://github.com/user-attachments/assets/5e38a5c0-7f88-4b06-b972-9fff02ac9ceb" />
