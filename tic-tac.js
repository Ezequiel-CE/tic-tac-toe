// gamboar module
const GameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const fillBoard = () => {
    board.forEach((piece, i) => {
      div = document.createElement("div");
      div.setAttribute("data-num", i);
      div.classList.add("game-piece");
      div.textContent = piece;
      document.querySelector(".game-board").appendChild(div);
    });
  };

  return { fillBoard };
})();

//player factori
const Player = function (name, symbol) {
  let playerChoices = [];
  const playerName = name;

  const markPieces = function (e) {
    e.target.textContent = symbol;
    playerChoices.push(parseInt(e.target.dataset.num));
    Game.verifyWinner(playerChoices, playerName);
  };

  return { markPieces, playerChoices };
};

const Game = (function () {
  //turno actual 1 player 1, 2 player 2
  let turn = 1;

  //guardo cuando hay un ganador
  let matchFinish = undefined;
  // nombre del ganador
  let WinnerName = null;

  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");

  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //quita los listener del tablero
  const stopGame = () => {
    const pieces = document.querySelectorAll(".game-piece");
    pieces.forEach((piece) => {
      piece.removeEventListener("click", takeTurn);
    });
  };

  // fucion que verifica si un array tiene los elementos de otro
  const checker = (arr, targetArr) => targetArr.every((v) => arr.includes(v));

  const verifyWinner = (choices, playerName) => {
    for (let wCase of wins) {
      if (choices.length < 3) return;

      matchFinish = checker(choices, wCase);
      //si hay ganador termina
      if (matchFinish) {
        WinnerName = playerName;
        console.log(`ya gano player ${playerName}`);
        stopGame();
        break;
      }
    }
    if (!matchFinish && choices.length > 4) {
      console.log("empate");
    }
  };

  const star = () => {
    GameBoard.fillBoard();
    markPiecesListener();
  };

  const takeTurn = (e) => {
    //evitar que sobreescriba
    if (e.target.textContent) return;

    //cambia turno
    if (turn === 1) {
      player1.markPieces(e);
      turn = 2;
    } else {
      player2.markPieces(e);
      turn = 1;
    }
  };

  const markPiecesListener = () => {
    const pieces = document.querySelectorAll(".game-piece");
    pieces.forEach((piece) => {
      piece.addEventListener("click", takeTurn);
    });
  };

  return { star, verifyWinner };
})();

Game.star();
