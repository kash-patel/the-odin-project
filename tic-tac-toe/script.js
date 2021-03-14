const options = [ "Rock", "Paper", "Scissors" ];

main = () => game();

game = () => {

  let input = null;

  do {
    
    input = window.prompt("Enter your choice, or enter nothing to quit: ");
    playRound(input, computerPlay());

  } while (input !== "");
}

playRound = (playerSelection, computerSelection) => {

  playerSelection = capitalise(playerSelection);

  const p = selectionToInt(playerSelection);
  const c = selectionToInt(computerSelection);
  const state = didWin(p, c);

  switch (state) {
    case -1: 
      console.log("You lose! " + computerSelection + " beats " + playerSelection + "!");
      break;
    case 0:
      console.log("Tie!");
      break;
    case 1:
      console.log("You win! " + playerSelection + " beats " + computerSelection + "!");
      break;
    default:
      console.log("Something went horribly wrong!");
      break;
  }
};

computerPlay = () => { return options[Math.floor(Math.random() * 3)]; }

didWin = (p, c) => {
  
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

selectionToInt = selection => {

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

capitalise = playerSelection => {

  switch (playerSelection.toLowerCase()) {
    case "rock": return "Rock";
    case "paper": return "Paper";
    case "scissors": return "Scissors";
    default: return null;
  }
};

main();