import { todos } from "../script.js";
import { deleteTodo, updateTodo } from "./api.js";

const todoList = document.querySelector("#todo-list");

export const renderTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const todoText = document.createElement("span");
    const deleteButton = document.createElement("button");
    todoText.textContent = todo.todo;
    li.appendChild(todoText);

    if (todo.completed) li.classList.toggle("completed");

    li.addEventListener("click", () => {
      updateTodo(index, !todo.completed);
    });

    deleteButton.textContent = "✕";
    deleteButton.className = "delete-button";

    li.appendChild(deleteButton);
    todoList.appendChild(li);

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodo(index);
    });
  });
};
