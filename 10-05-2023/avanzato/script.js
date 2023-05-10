const selectAllByClass = (className) =>
  document.querySelectorAll(`.${className}`);
const selectById = (id) => document.querySelector(`#${id}`);

const screen = selectById("screen");
const result = selectById("result");

const numberButtons = selectAllByClass("number");
const operatorButtons = selectAllByClass("operator");
const clearButton = selectById("clear");
const equalsButton = selectById("equals");

let firstNumber = "";
let secondNumber = "";
let operator = null;

const updateScreen = (value) => {
  result.textContent = value;
};

const handleNumberClick = (event) => {
  const number = event.target.textContent;
  if (operator === null) {
    firstNumber += number;
    updateScreen(firstNumber);
  } else {
    secondNumber += number;
    updateScreen(secondNumber);
  }
};

const handleOperatorClick = (event) => {
  operator = event.target.textContent;
  updateScreen(operator);
};

const clear = () => {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  updateScreen(0);
};

const operatorFunctions = {
  "+": (n1, n2) => n1 + n2,
  "-": (n1, n2) => n1 - n2,
  "*": (n1, n2) => n1 * n2,
  "/": (n1, n2) => n1 / n2,
};

const calculate = () => {
  const n1 = parseInt(firstNumber);
  const n2 = parseInt(secondNumber);
  let result = 0;

  const resolvedFunction = operatorFunctions[operator];

  if (!resolvedFunction) throw new Error("Invalid operator");
  result = resolvedFunction(n1, n2);

  updateScreen(result);
  firstNumber = result.toString();
  secondNumber = "";
  operator = null;
};

numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumberClick);
});
operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperatorClick);
});
clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", calculate);
