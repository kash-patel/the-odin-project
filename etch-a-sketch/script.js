let gridContainer = null;

function main () {

  window.addEventListener('load', () => init());
}

function init () {

  gridContainer = document.getElementById('container');
  Object.freeze(gridContainer);

  createGrid(16);
}

function createGrid (x) {

  gridContainer.style.display = "grid";
  gridContainer.style.background = "#202020";
  gridContainer.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${x}, 1fr)`;

  for (let i = 0; i < x; i++) {

    for (let ii = 0; ii < x; ii++) {

      div = document.createElement("div");
      div.style.display = "inline-block";
      div.style.background = "#fcfcfc";
      div.style.opacity = 0;
      div.addEventListener("mouseover", (e) => {
        e.target.style.opacity = Math.min(1, parseFloat(e.target.style.opacity) + 0.1);
      });

      gridContainer.appendChild(div);
    }
  }
}

function newGrid () {

  gridContainer.textContent = '';

  let newGridSize = parseInt(prompt("Enter new canvas grid size (between 1 and 100): "));

  while (newGridSize <= 0 || newGridSize > 100) {
    newGridSize = parseInt(prompt("Invalid; new canvas grid size must be between 1 and 100: "));
  }

  createGrid(newGridSize);
}

function clearGrid () {

  gridContainer.querySelectorAll("div").forEach(div => {
    div.style.opacity = 0;
  });
}

main();