const gameBoard = (() => {
  console.log("Greetings Earthling 👋");
  const h1 = document.querySelector("h1");
  const startButton = document.querySelector(".start");
  const menu = document.querySelector(".menu");
  const gameBoard = document.querySelector(".game");
  const board1 = document.querySelector(".board-one");
  const board2 = document.querySelector(".board-two");
  const squares = [...document.querySelectorAll(".square")];
  const cells = [...document.querySelectorAll(".cell")];
  const restart = document.querySelector(".restart");
  const form = document.querySelector("form");
  let turnX = true;
  let gameOver = false;
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  appear();

  //Title and start button become visible when page loads
  function appear() {
    h1.style.opacity = "1";
    h1.style.transition = "1.5s";
    startButton.style.transform = "scale(1)";
    startButton.style.transition = ".5s";
  }

  //Shift menu up
  function shiftUp() {
    menu.style.position = "absolute";
    menu.style.animation = "menu 1s";
    menu.style.top = "5%";
    startButton.style.display = "none";
    newButtons();
  }

  //create gamemode buttons
  function newButtons() {
    let buttonNode = document.createElement("div");
    buttonNode.classList.add("buttons");

    const button1 = document.createElement("button");
    button1.classList.add("btn1");
    button1.innerHTML = `AI Bot<i class="fas fa-robot" id="btn-icons"></i>`;

    const button2 = document.createElement("button");
    button2.classList.add("btn2");
    button2.innerHTML = `Two Players<i class="fas fa-user-friends" id="btn-icons"></i>`;

    buttonNode.appendChild(button1);
    buttonNode.appendChild(button2);
    menu.appendChild(buttonNode);

    //Play with AI
    button1.addEventListener("click", () => {
      gameMode1 = true;
      gameMode2 = false;
      gameOver = false;
      turnX = true;
      restart.style.background = "var(--gray)";
      document.querySelector("#player-turn").style.opacity = "0";
      setTimeout(() => {
        gameBoard.style.transition = "0.5s";
        gameBoard.style.transform = "scale(1)";
        board1.style.transform = "scale(1)";
        board2.style.transform = "scale(0)";
      }, 100);
      basicAI();
      closeForm();
      deleteNames();
      cells.forEach((cell) => {
        cell.innerHTML = "<div></div>";
      });
    });

    //Two player tic tac toe
    button2.addEventListener("click", () => {
      gameMode1 = false;
      gameMode2 = true;
      gameOver = false;
      turnX = true;
      openForm();
      deleteNames();
      squares.forEach((square) => {
        square.innerHTML = "<div></div>";
      });
    });
  }

  //Start of AI mode code
  function emptyCells() {
    return cells.filter((cell) => cell.innerText === "");
  }

  function basicAI() {
    squares.forEach((square) => {
      square.innerHTML = "<div></div>";
    });
    cells.forEach((cell) =>
      cell.addEventListener("click", () => {
        if (turnX && cell.innerHTML === `<div></div>` && !gameOver) {
          cell.innerHTML = `<div class="x" id="x">X</div>`;
          turnX = !turnX;
          if (!turnX && emptyCells().length > 0 && !gameOver) {
            emptyCells()[0].innerHTML = `<div class="o" id="o">O</div>`;
            turnX = !turnX;
          }
        }
        //Check for wins and tie
        const playerTurn = document.querySelector("#player-turn");
        if (checkWinOCell()) {
          playerTurn.innerHTML = `AI wins this round! 🤠🎉`;
          playerTurn.style.opacity = "1";
          restart.innerHTML = `Play Again<i class="fas fa-redo" id="icon">`;
          gameOver = true;
        }
        if (checkWinXCell()) {
          playerTurn.innerHTML = `Human wins this round! 😉🎉`;
          playerTurn.style.opacity = "1";
          restart.innerHTML = `Play Again<i class="fas fa-redo" id="icon">`;
          gameOver = true;
        }
        if (isTieCell()) {
          playerTurn.innerHTML = `It's a tie!🤝`;
          playerTurn.style.opacity = "1";
          restart.innerHTML = `Play Again<i class="fas fa-redo" id="icon">`;
          gameOver = true;
        }
      })
    );
  }

  function checkWinXCell() {
    return winningConditions.some((combination) => {
      return combination.every((i) => {
        return cells[i].innerText === "X";
      });
    });
  }

  function checkWinOCell() {
    return winningConditions.some((combination) => {
      return combination.every((i) => {
        return cells[i].innerText === "O";
      });
    });
  }

  function isTieCell() {
    return cells.every((cell) => {
      return cell.innerText === "X" || cell.innerText === "O";
    });
  }
  // End of AI mode code

  //Start of two player mode code
  function twoPlayers(e) {
    const names = document.createElement("div");
    names.classList.add("names");

    // left side
    const title1 = document.createElement("h4");
    title1.setAttribute("id", "left-title");
    title1.classList.add("left-title");
    title1.innerHTML = "Player One:";

    const player1 = document.querySelector("#player-1").value;
    const playerOneName = document.createElement("h2");
    playerOneName.setAttribute("id", "left-name");
    playerOneName.classList.add("left-name");
    playerOneName.innerHTML = `${player1}`;

    let score1 = document.createElement("h3");
    score1.setAttribute("id", "left-score");
    score1.classList.add("left-score");
    score1.innerHTML = 0;

    // right side
    const title2 = document.createElement("h4");
    title2.setAttribute("id", "right-title");
    title2.classList.add("right-title");
    title2.innerHTML = "Player Two:";

    const player2 = document.querySelector("#player-2").value;
    const playerTwoName = document.createElement("h2");
    playerTwoName.setAttribute("id", "right-name");
    playerTwoName.classList.add("right-name");
    playerTwoName.innerHTML = `${player2}`;

    let score2 = document.createElement("h3");
    score2.setAttribute("id", "right-score");
    score2.classList.add("right-score");
    score2.innerHTML = 0;

    names.appendChild(playerOneName);
    names.appendChild(title1);
    names.appendChild(score1);
    names.appendChild(playerTwoName);
    names.appendChild(title2);
    names.appendChild(score2);
    document.body.appendChild(names);
    setTimeout(() => {
      gameBoard.style.transition = "0.5s";
      gameBoard.style.transform = "scale(1)";
      board1.style.transform = "scale(0)";
      board2.style.transform = "scale(1)";
      restart.style.background = "var(--red)";
      document.querySelector("#player-turn").style.opacity = "1";
    }, 100);

    e.preventDefault();
    e.target.reset();
    closeForm();
    playerTurn(player1, player2);

    if (gameMode2) {
      squares.forEach((square) =>
        square.addEventListener("click", () => {
          if (turnX && square.innerHTML === `<div></div>` && !gameOver) {
            square.innerHTML = `<div class="x" id="x">X</div>`;
            turnX = !turnX;
          } else if (
            !turnX &&
            square.innerHTML === `<div></div>` &&
            !gameOver
          ) {
            square.innerHTML = `<div class="o" id="o">O</div>`;
            turnX = !turnX;
          }
          playerTurn(player1, player2);
          if (checkWinXSquare()) {
            if (!gameOver) {
              score1.innerHTML++;
            }
            const playerTurn = document.querySelector("#player-turn");
            playerTurn.innerHTML = `${player1} wins this round! 😉🎉`;
            restart.innerHTML = `Play Again<i class="fas fa-redo" id="icon">`;
            gameOver = true;
          }
          if (checkWinOSquare()) {
            if (!gameOver) {
              score2.innerHTML++;
            }
            const playerTurn = document.querySelector("#player-turn");
            playerTurn.innerHTML = `${player2} wins this round! 🤠🎉`;
            restart.innerHTML = `Play Again<i class="fas fa-redo" id="icon">`;
            gameOver = true;
          }
          if (isTieSquare()) {
            const playerTurn = document.querySelector("#player-turn");
            playerTurn.innerHTML = `It's a tie!🤝`;
            restart.innerHTML = `Play Again<i class="fas fa-redo" id="icon">`;
            gameOver = true;
          }
        })
      );
    }
  }

  function checkWinXSquare() {
    return winningConditions.some((combination) => {
      return combination.every((i) => {
        return squares[i].innerText === "X";
      });
    });
  }

  function checkWinOSquare() {
    return winningConditions.some((combination) => {
      return combination.every((i) => {
        return squares[i].innerText === "O";
      });
    });
  }

  function isTieSquare() {
    return squares.every((square) => {
      return square.innerText === "X" || square.innerText === "O";
    });
  }
  //End of two player mode code

  function openForm() {
    const name = document.querySelector(".name");
    name.style.transform = "scale(1)";
  }

  function closeForm() {
    const name = document.querySelector(".name");
    name.style.transform = "scale(0)";
  }

  function deleteNames() {
    document.querySelector(".names").remove();
  }

  function playerTurn(player1, player2) {
    const playerTurn = document.querySelector("#player-turn");
    if (turnX) {
      playerTurn.innerHTML = `It's ${player1}'s turn!`;
    } else {
      playerTurn.innerHTML = `It's ${player2}'s turn!`;
    }
  }

  //Event Listeners
  startButton.addEventListener("click", shiftUp);
  form.addEventListener("submit", twoPlayers);
  restart.addEventListener("click", () => {
    turnX = true;
    gameOver = false;
    restart.innerHTML = `Restart<i class="fas fa-redo" id="icon">`;
    squares.forEach((square) => {
      square.innerHTML = "<div></div>";
    });
    cells.forEach((cell) => {
      cell.innerHTML = "<div></div>";
    });

    const icon = document.querySelector("#icon");
    icon.classList.add("clicked");

    setTimeout(() => {
      icon.classList.remove("clicked");
    }, 300);
  });
})();
