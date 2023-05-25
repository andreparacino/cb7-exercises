import { todos } from "../script.js";
import { renderTodos } from "./utilities.js";

const API_END_POINT = "https://dummyjson.com/todos";

export const getTodos = async () => {
  try {
    const response = await fetch(API_END_POINT);
    if (!response.ok) throw new Error();

    const data = await response.json();
    todos.push(...data.todos);
    renderTodos();

    console.log("Todos correttamente ricevuti");
  } catch (error) {
    console.error(
      `Qualcosa è andato storto provando a ricevere i todos dal server`
    );
  }
};

export const addTodo = async (todoText) => {
  let newTodo;
  try {
    const response = await fetch(`${API_END_POINT}/add`, {
      method: "POST",
      body: JSON.stringify({ text: todoText, completed: false, userId: 5 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error();

    newTodo = await response.json();
    todos.unshift(Object.assign(newTodo, { todo: todoText }));
    renderTodos();

    console.log(`Todo con id: ${newTodo.id} correttamente aggiunto`);
  } catch (error) {
    console.error(
      `Qualcosa è andato storto provando ad aggiungere il nuovo todo`
    );
  }
};

export const updateTodo = async (index, completed) => {
  const todo = todos[index];
  try {
    const response = await fetch(`${API_END_POINT}/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ completed }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error();

    todo.completed = completed;
    renderTodos();

    console.log(`Todo con id: ${todo.id} correttamente modificato`);
  } catch (error) {
    console.error(
      `Qualcosa è andato storto provando a modificare l'elemento con id ${todo.id}`
    );
  }
};

export const deleteTodo = async (index) => {
  const todo = todos[index];
  try {
    const response = await fetch(`${API_END_POINT}/${todo.id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error();

    todos.splice(index, 1);
    renderTodos();

    console.log(`Todo con id: ${todo.id} correttamente eliminato`);
  } catch (error) {
    console.error(
      `Qualcosa è andato storto provando a eliminare l'elemento con id ${todo.id}`
    );
  }
};
