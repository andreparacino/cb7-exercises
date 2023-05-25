import { addTodo, deleteAllTodos, getTodos } from "./helpers/api.js";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const clearButton = document.querySelector("#clearAll");

export const todos = [];

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText === "") return;

  addTodo(todoText);
  todoInput.value = "";
});

// Ho aggiunto la possibilità di cancellare tutti i todo usando Promise.allSettled()
clearButton.addEventListener("click", () => deleteAllTodos());

getTodos();
