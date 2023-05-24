import { todos } from "../script.js";
import { renderTodos } from "./utilities.js";

const API_END_POINT = "https://dummyjson.com/todos";

export const getTodos = async () => {
  const response = await fetch(API_END_POINT);
  const data = await response.json();
  todos.push(...data.todos);
  renderTodos();
};

export const addTodo = async (todoText) => {
  const response = await fetch(`${API_END_POINT}/add`, {
    method: "POST",
    body: JSON.stringify({ text: todoText, completed: false, userId: 5 }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  todos.unshift(Object.assign(data, { todo: todoText }));
  renderTodos();
};

export const updateTodo = async (index, completed) => {
  const todo = todos[index];
  await fetch(`${API_END_POINT}/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  todo.completed = completed;
  renderTodos();
};

export const deleteTodo = async (index) => {
  const todo = todos[index];
  await fetch(`${API_END_POINT}/${todo.id}`, {
    method: "DELETE",
  });
  todos.splice(index, 1);
  renderTodos();
};
