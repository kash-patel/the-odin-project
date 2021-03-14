let display = null;

let displayValue = "";
let hasDecimal = false;
let a = null;
let b = null;
let op = null;

function main () {

  window.addEventListener('load', () => init());
}

function init () {
  
  display = document.getElementById("display");
  Object.freeze(display);
}

function evaluateExpression () {

  if (a === null && b === null) {
    displayValue = 0;
    updateDisplay();
  }

  else if (b === null) {
    displayValue = a;
    updateDisplay();
  }

  else if (op === "/" && b === 0) {
    displayValue = "You divided by zero. I have perished.";
    updateDisplay(false);
    a = null;
    b = null;
    op = null;
  }

  else {
    displayValue = operate(op, a, b);
    updateDisplay();
  }
}

function appendOp (operator) {

  if (b != null) {
    a = operate(op, a, b);
    b = null;
  }

  op = operator;
}

function appendNum (num) {
  
  if (op !== null && b === null) {
    displayValue = "";
    updateDisplay();
  }

  displayValue += num.toString();
  displayValue = parseFloat(displayValue).toString();
  op === null ? updateA() : updateB();
  updateDisplay();
}

function appendDec () {

  if (hasDecimal) return;

  displayValue += ".";
  updateDisplay(false);
}

function operate (operator, a, b) {

  switch (operator) {

    case "+":
      return add(a, b);
    case "-":
      return sub(a, b);
    case "*":
      return mul(a, b);
    case "/":
      return div(a, b);
    default:
      return NaN;
  }
}

function updateA () {
  a = parseFloat(displayValue);
}

function updateB () {
  b = parseFloat(displayValue);
}

function updateDisplay (parse = true) {
  
  if (displayValue === "") {
    display.textContent = "";
    return;
  }

  display.textContent = parse ? parseFloat(displayValue) : displayValue;
}

function clearDisplay () {

  displayValue = "0";
  updateDisplay();
  
  a = null;
  b = null;
  op = null;
}

function add (a, b) {
  return a + b;
}

function sub (a, b) {
  return a - b;
}

function mul (a, b) {
  return a * b;
}

function div (a, b) {
  return a / b;
}

main();