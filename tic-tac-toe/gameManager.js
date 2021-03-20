"use strict";


const GameManager = (function () {

  const attrs = {
    currentFaction: 1,
  }

  return {
    selectSquare,
    startLocalGame,
    startAIGame,
    returnToMainMenu,
    resetBoard,
  }

  function startLocalGame () {

    DisplayController.hideNewGameOptions();
    DisplayController.initialiseBoard();
    DisplayController.showBoard();
    DisplayController.showCurrentGameOptions();
    DisplayController.showStatusTextP();
    DisplayController.setStatusText("Blue's turn");
  }

  function startAIGame () {
    // TODO
  }
  
  function toggleFaction () {

    attrs.currentFaction = -attrs.currentFaction;
    DisplayController.setStatusText(attrs.currentFaction === 1 ? "Blue's turn" : "Red's turn");
  }

  function selectSquare (row, col) {

    Gameboard.selectSquare (row, col, attrs.currentFaction);

    const winState = Gameboard.checkForWin();

    if (winState === 1) {
      Gameboard.disableBoard();
      DisplayController.setStatusText("Blue wins!");
    } else if (winState === -1) {
      Gameboard.disableBoard();
      DisplayController.setStatusText("Red wins!");
    } else if (Gameboard.checkForTie()) {
      Gameboard.disableBoard();
      DisplayController.setStatusText("Tie!");
    } else {
      toggleFaction();
    }
  }

  function resetBoard () {

    attrs.currentFaction = 1;
    DisplayController.setStatusText("Blue's turn");
    Gameboard.resetBoard();
  }

  function returnToMainMenu () {

    window.location.href = window.location.href;

    // DisplayController.hideStatusTextP();
    // DisplayController.hideBoard();
    // DisplayController.hideCurrentGameOptions();

    // DisplayController.init();
    // DisplayController.showNewGameOptions();
  }

})();