import { todoList, todos } from "./constants.js";
import { removeStoredTodos, updateStoredTodos } from "./storage.js";

export const renderTodos = () => {
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
      updateStoredTodos(todos);
      renderTodos();
    });

    deleteButton.textContent = "✕";
    deleteButton.className = "delete-button";

    li.appendChild(deleteButton);
    todoList.appendChild(li);

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      todos.splice(index, 1);

      if (!todos.length) removeStoredTodos();
      else updateStoredTodos(todos);
      renderTodos();
    });
  });
};
