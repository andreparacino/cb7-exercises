import { SESSION_STORAGE_KEY, setTodos } from "./constants.js";

export const getStoredTodos = () => {
  const storedTodos = sessionStorage.getItem(SESSION_STORAGE_KEY.items);
  if (!storedTodos) return;
  const parsedTodos = JSON.parse(storedTodos);
  setTodos(parsedTodos);
};

export const updateStoredTodos = (todosArr) =>
  sessionStorage.setItem(SESSION_STORAGE_KEY.items, JSON.stringify(todosArr));

export const removeStoredTodos = () =>
  sessionStorage.removeItem(SESSION_STORAGE_KEY.items);
