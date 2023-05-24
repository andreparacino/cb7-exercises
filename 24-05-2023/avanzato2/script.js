import { addTodo, getTodos } from "./helpers/api.js";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

export const todos = [];

// Ho praticamente rifatto l'avanzato di giorno 11 ma ora la logica sfrutta le
// API di dummyJSON

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText === "") return;

  addTodo(todoText);
  todoInput.value = "";
});

getTodos();
