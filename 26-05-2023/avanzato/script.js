import { todoForm, todos } from "./helpers/constants.js";
import { getStoredTodos, updateStoredTodos } from "./helpers/storage.js";
import { renderTodos } from "./helpers/utilities.js";

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoContent = event.target.todoTextInput.value.trim();
  event.target.todoTextInput.value = "";

  todos.unshift({ text: todoContent, completed: false });

  updateStoredTodos(todos);
  renderTodos();
});

getStoredTodos();
renderTodos();
