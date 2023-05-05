function calculate() {
  let firstNumber = "";
  let secondNumber = "";
  let operator = "";
  let result;

  // Qui sfrutto i tre while loop per controllare che l'input inserito sia valido.
  // Se non lo è, chiedo all'utente di re inserirlo.

  while (firstNumber === "" || isNaN(firstNumber)) {
    firstNumber = prompt("Enter the first number:")?.trim();
  }

  while (secondNumber === "" || isNaN(secondNumber)) {
    secondNumber = prompt("Enter the second number:")?.trim();
  }

  while (!["+", "-", "*", "/"].includes(operator)) {
    operator = prompt("Choose an operator (+, -, *, /):");
  }

  switch (operator) {
    case "+":
      result = Number(firstNumber) + Number(secondNumber);
      break;
    case "-":
      result = Number(firstNumber) - Number(secondNumber);
      break;
    case "*":
      result = Number(firstNumber) * Number(secondNumber);
      break;
    case "/":
      result = Number(firstNumber) / Number(secondNumber);
      break;
    default:
      console.log("Invalid operator");
  }

  return `${firstNumber} ${operator} ${secondNumber} = ${result}`;
}

console.log(calculate());
