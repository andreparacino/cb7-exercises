const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let todos = [];

const renderTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const todoText = document.createElement("span");
    const deleteButton = document.createElement("button");

    todoText.textContent = todo.text;
    li.appendChild(todoText);

    if (todo.completed) li.classList.toggle("completed");

    li.addEventListener("click", () => {
      todo.completed = !todo.completed;
      renderTodos();
    });

    deleteButton.textContent = "✕";
    deleteButton.className = "delete-button";

    li.appendChild(deleteButton);
    todoList.appendChild(li);

    deleteButton.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
    });
  });
};

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText === "") return;

  todos.push({ text: todoText, completed: false });
  todoInput.value = "";
  renderTodos();
});
