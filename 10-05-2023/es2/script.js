// So di averlo reso inutilmente complesso, ma volevo
// sperimentare un po' 😅

const selectById = (id) => document.getElementById(id);

const HTML_IDS = {
  FIRST_NUMBER: "firstNumber",
  SECOND_NUMBER: "secondNumber",
  OPERATOR_SELECT: "operatorSelect",
  RESULT: "result",
};

const { FIRST_NUMBER, SECOND_NUMBER, OPERATOR_SELECT, RESULT } = HTML_IDS;

const inputs = [
  selectById(FIRST_NUMBER),
  selectById(SECOND_NUMBER),
  selectById(OPERATOR_SELECT),
];
const result = selectById(RESULT);

const calculatorData = {
  [FIRST_NUMBER]: 0,
  [SECOND_NUMBER]: 0,
  [OPERATOR_SELECT]: null,
};

const operatorFunctions = {
  "+": (n1, n2) => n1 + n2,
  "-": (n1, n2) => n1 - n2,
  "*": (n1, n2) => n1 * n2,
  "/": (n1, n2) => n1 / n2,
};

const inputHandler = (event) => {
  const { value, id } = event.target;
  calculatorData[id] = value || 0;

  if (!Object.values(calculatorData).every(Boolean)) {
    result.textContent = "0";
  } else {
    result.textContent = operatorFunctions[calculatorData[OPERATOR_SELECT]](
      parseInt(calculatorData[FIRST_NUMBER]),
      parseInt(calculatorData[SECOND_NUMBER])
    );
  }
};

inputs.forEach((input) => input.addEventListener("input", inputHandler));
