export const todoForm = document.querySelector("#todo-form");
export const todoList = document.querySelector("#todo-list");

export let todos = [];
export const setTodos = (newTodos) => (todos = newTodos);

const SESSION_STORAGE_PREFIX = "todos_app";
export const SESSION_STORAGE_KEY = {
  items: SESSION_STORAGE_PREFIX + "_items",
};
