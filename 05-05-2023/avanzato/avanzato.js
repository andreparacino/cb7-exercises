function getNumberInput(promptText) {
  let input = "";
  // Qui sfrutto il while loop per controllare che l'input inserito sia valido.
  // Se non lo è, chiedo all'utente di re inserire l'input.
  while (input === "" || isNaN(input)) {
    input = prompt(promptText)?.trim();
  }
  return Number(input);
}

function getOperatorInput() {
  let operator = "";
  // Anche qui, come in riga 5, valido l'input
  while (!["+", "-", "*", "/"].includes(operator)) {
    operator = prompt("Choose an operator (+, -, *, /):")?.trim();
  }
  return operator;
}

function calculate(firstNumber, secondNumber, operator) {
  let result;
  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      result = firstNumber / secondNumber;
      break;
    default:
      console.log("Invalid operator");
  }
  return result;
}

const firstNumber = getNumberInput("Enter the first number:");
const secondNumber = getNumberInput("Enter the second number:");
const operator = getOperatorInput();

const result = calculate(firstNumber, secondNumber, operator);

console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
