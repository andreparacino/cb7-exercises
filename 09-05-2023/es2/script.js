const elements = {
  form: document.querySelector("#myForm"),
  input: document.querySelector("#textInput"),
  output: document.querySelector("#output"),
};

const { form, input, output } = elements;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = input.value.trim();

  if (userInput === "") return;

  output.textContent = userInput;

  input.value = "";
});
