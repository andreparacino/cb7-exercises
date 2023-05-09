const btnElement = document.getElementById("btn");
const outputElement = document.getElementById("outputText");

btnElement.addEventListener("click", () => {
  outputElement.textContent = "Hello, world!";
});
