const options = [ "Rock", "Paper", "Scissors" ];

let stateText = null;
let messageText = null;
let playerScoreText = null;
let computerScoreText = null;

let playerScore = 0;
let computerScore = 0;

function main () {

  window.addEventListener('load', () => {
    init();
  });
}

function init () {

  const buttons = document.querySelectorAll("button");

  stateText = document.getElementById("state");
  messageText = document.getElementById("message");
  playerScoreText = document.querySelector(".score#player");
  computerScoreText = document.querySelector(".score#computer");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      playRound(button.id, computerPlay());
    });
  });
}

// function game () {

//   let input = null;

//   do {
    
//     input = window.prompt("Enter your choice, or enter nothing to quit: ");
//     playRound(input, computerPlay());

//   } while (input !== "");
// }

function playRound (playerSelection, computerSelection) {

  playerSelection = capitalise(playerSelection);

  const p = selectionToInt(playerSelection);
  const c = selectionToInt(computerSelection);
  const state = didWin(p, c);

  switch (state) {
    case -1: 
      // console.log("You lose! " + computerSelection + " beats " + playerSelection + "!");
      incrementComputer();
      stateText.style.color = "salmon";
      stateText.textContent = "Loss";
      messageText.style.color = "salmon";
      messageText.textContent = computerSelection + " > " + playerSelection;
      break;
    case 0:
      stateText.style.color = "#fcfcfc";
      stateText.textContent = "Tie";
      messageText.style.color = "#fcfcfc";
      messageText.textContent = computerSelection + " = " + playerSelection;
      break;
    case 1:
      // console.log("You win! " + playerSelection + " beats " + computerSelection + "!");
      incrementPlayer();
      stateText.style.color = "skyblue";
      stateText.textContent = "Win";
      messageText.style.color = "skyblue";
      messageText.textContent = playerSelection + " > " + computerSelection;
      break;
    default:
      console.log("Something went horribly wrong!");
      break;
  }
};

function computerPlay () {
  return options[Math.floor(Math.random() * 3)];
}

function incrementComputer () {
  computerScore++;
  computerScoreText.textContent = computerScore;
}

function incrementPlayer () {
  playerScore++;
  playerScoreText.textContent = playerScore;
}

function didWin (p, c) {
  
  if (p === c) return 0;

  switch (p) {
    case 0:
      switch (c) {
        case 1: return -1;
        case 2: return 1;
        default: return NaN;
      }
    case 1:
      switch (c) {
        case 0: return 1;
        case 2: return -1;
        default: return NaN;
      }
    case 2:
      switch (c) {
        case 0: return -1;
        case 1: return 1;
        default: return NaN;
      }
    default:
      return NaN;
  }
};

function selectionToInt (selection) {

  switch (selection) {
    case "Rock":
      return 0;
    case "Paper":
      return 1;
    case "Scissors":
      return 2;
    default:
      return -1;
  }
};

function capitalise (playerSelection) {

  switch (playerSelection.toLowerCase()) {
    case "rock": return "Rock";
    case "paper": return "Paper";
    case "scissors": return "Scissors";
    default: return null;
  }
};

main();