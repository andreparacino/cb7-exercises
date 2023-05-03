const firstNumber = Number(prompt("Enter the first number:"));
const secondNumber = Number(prompt("Enter the second number:"));
const operator = prompt("Choose an operator (+, -, *, /):");

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

console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
