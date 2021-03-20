"use strict";


const DisplayController = (function () {

  const gameboardDiv = document.getElementById("gameboard");
  const newGameOptionsDiv = document.getElementById("newGameOptions");
  const currentGameOptionsDiv = document.getElementById("currentGameOptions");
  const statusTextP = document.getElementById("statusText");

  return {
    init,
    initialiseBoard,
    resetBoard,
    updateBoard,
    disableBoard,
    hideBoard,
    showBoard,
    setLocalFaction,
    hideNewGameOptions,
    showNewGameOptions,
    hideCurrentGameOptions,
    showCurrentGameOptions,
    hideStatusTextP,
    showStatusTextP,
    setStatusText
  }

  function init () {

    hideBoard();
    setLocalFaction(1);
    hideCurrentGameOptions();
    hideStatusTextP();
    showNewGameOptions();
  }

  function initialiseBoard () {

    for (const button of gameboardDiv.children) {
      
      button.addEventListener("click", e => {
        GameManager.selectSquare(parseInt(e.target.dataset.row), parseInt(e.target.dataset.col));
      });
    }
  }

  function resetBoard () {

    for (const button of gameboardDiv.children) {

      button.disabled = false;
      button.classList = "neutral";

    }

    setLocalFaction(1);
  }

  function updateBoard (row, col, faction) {

    const square = gameboardDiv.children.item( (3 * row) + col );

    square.disabled = true;
    square.classList.remove("neutral");
    square.classList.add(faction === 1 ? "player" : "opponent");
  }

  function disableBoard () {

    for (let i = 0; i < gameboardDiv.children.length; i++) {
      gameboardDiv.children.item(i).disabled = true;
    }

    setLocalFaction(0);
  }

  function hideBoard () {
    gameboardDiv.style.display = "none";
  }

  function showBoard () {
    gameboardDiv.style.display = "grid";
  }

  function setLocalFaction (faction) {

    for (const button of gameboardDiv.children) {

      button.classList.remove("playerHighlight");
      button.classList.remove("opponentHighlight");

      if (faction === 0) continue;
      
      if (button.classList.contains("neutral")) {
        button.classList.add(faction === 1 ? "playerHighlight" : "opponentHighlight");
      }
    }
  }

  function hideNewGameOptions () {
    newGameOptionsDiv.style.display = "none";
  }

  function showNewGameOptions () {
    newGameOptionsDiv.style.display = "flex";
  }

  function hideCurrentGameOptions () {
    currentGameOptionsDiv.style.display = "none";
  }

  function showCurrentGameOptions () {
    currentGameOptionsDiv.style.display = "flex";
  }

  function hideStatusTextP () {
    statusTextP.style.display = "none";
  }
  
  function showStatusTextP () {
    statusTextP.style.display = "inline-block";
  }

  function setStatusText (text) {
    statusTextP.textContent = text;
  }

})();