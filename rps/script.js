const btnSelect = document.querySelectorAll(".selec");
const labelHumanScore = document.querySelector("#humanScore");
const labelComputerScore = document.querySelector("#computerScore");
const labelStatus = document.querySelector("#status");
const labelWon = document.querySelector("#labelWon");
const arr = ["rock", "paper", "scissors"];

let scoreHuman = 0;
let scoreComputer = 0;

const playerLose = function (rps) {
  if (scoreHuman !== 0) {
    scoreHuman -= 1;
    labelHumanScore.textContent = scoreHuman;
  }
  scoreComputer += 1;
  labelComputerScore.textContent = scoreComputer;
  labelStatus.textContent = `You lost! Bot selected ${rps}😟`;
};

const botLose = function (rps) {
  if (scoreComputer !== 0) {
    scoreComputer -= 1;
    labelComputerScore.textContent = scoreComputer;
  }
  scoreHuman += 1;
  labelHumanScore.textContent = scoreHuman;
  labelStatus.textContent = `You Won! Bot selected ${rps}🎉`;
};

const tie = function () {
  labelStatus.textContent = "Tie! You must select a different weapon!";
};

labelStatus.textContent = "Start the game";
btnSelect.forEach(function (cur) {
  cur.addEventListener("click", function (e) {
    e.preventDefault();
    let randomNum = Math.trunc(Math.random() * 3);
    let computerSelection = arr[randomNum];
    let playerSelection = e.target.id;
    if (playerSelection === "rock" && computerSelection === "paper") {
      playerLose(computerSelection);
    } else if (playerSelection === "rock" && computerSelection === "scissors") {
      botLose(computerSelection);
    } else if (playerSelection === "paper" && computerSelection === "rock") {
      botLose(computerSelection);
    } else if (
      playerSelection === "paper" &&
      computerSelection === "scissors"
    ) {
      playerLose(computerSelection);
    } else if (
      playerSelection === "scissors" &&
      computerSelection === "paper"
    ) {
      botLose(computerSelection);
    } else if (playerSelection === "scissors" && computerSelection === "rock") {
      botLose(computerSelection);
    } else {
      tie();
    }
    if (scoreHuman === 5) {
      document.body.classList.add("won");
      labelWon.textContent = "You Won!🎉";
      btnSelect.forEach(function (cur) {
        cur.setAttribute("disabled", "true");
        cur.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      });
    }
    if (scoreComputer === 5) {
      document.body.classList.add("lose");
      labelWon.textContent = "You Lost!😟";
      btnSelect.forEach(function (cur) {
        cur.setAttribute("disabled", "true");
        cur.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      });
    }
  });
});
