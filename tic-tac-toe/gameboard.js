"use strict";


const Gameboard = (function () {

  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  let neutralSquares = 9;

  return {
    selectSquare,
    factionOf,
    checkForWin,
    checkForTie,
    disableBoard,
    resetBoard
  };

  
  function selectSquare (row, col, faction) {
    
    board[row][col] = faction;
    DisplayController.updateBoard(row, col, faction);
    DisplayController.setLocalFaction(-faction);

    neutralSquares--;
  }

  function factionOf (row, col) { return board[row][col]; }

  function checkForWin () {

    for (let i = 0; i < 3; i++) {
      if (colSum(i) === 3) return 1;
      else if (colSum(i) === -3) return -1;
      else if (rowSum(i) === -3) return -1;
      else if (rowSum(i) === 3) return 1;
      else if (board[1][1] === 1) {
        if (board[0][0] === 1 && board[2][2] === 1 || board[0][2] === 1 && board[2][0] === 1) return 1;
      }
      else if (board[1][1] === -1) {
        if (board[0][0] === -1 && board[2][2] === -1 || board[0][2] === -1 && board[2][0] === -1) return -1;
      }
    }

    return 0;
  }

  function checkForTie () {
    return neutralSquares === 0 && checkForWin() === 0;
  }

  function colSum (col) { return board[0][col] + board[1][col] + board[2][col]; }

  function rowSum (row) { return board[row][0] + board[row][1] + board[row][2]; }

  function disableBoard () { DisplayController.disableBoard(); }

  function resetBoard () {

    board.forEach(row => {
      row.length = 0;
      row.push(0);
      row.push(0);
      row.push(0);
    });

    neutralSquares = 9;

    DisplayController.resetBoard();
  }

  function printBoard () {

    board.forEach(row => {
      console.log(row);
    });
  }

})();