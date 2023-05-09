const elements = {
  input: document.getElementById("input"),
  button: document.getElementById("button"),
  list: document.getElementById("list"),
};

const { input, button, list } = elements;

const addNewItem = () => {
  const inputValue = input.value.trim();

  if (inputValue === "") return;

  const li = document.createElement("li");
  li.textContent = inputValue;
  list.appendChild(li);
  input.value = "";
};

button.addEventListener("click", addNewItem);

input.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  event.preventDefault();
  addNewItem();
});
