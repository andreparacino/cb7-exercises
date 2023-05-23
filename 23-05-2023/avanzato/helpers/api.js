import { userData } from "./utilities.js";

const apiEndPoint = "https://dummyjson.com/carts";

export const getCart = async () => {
  const response = await fetch(`${apiEndPoint}/${userData.id}`);
  const cart = await response.json();
  return cart;
};

export const createDummyCart = async () => {
  const response = await fetch(apiEndPoint + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userData.id,
      products: [
        {
          id: 1,
          quantity: 1,
        },
        { id: 2, quantity: 10 },
        {
          id: 3,
          quantity: 1,
        },
      ],
    }),
  });
  const cart = await response.json();
  return cart;
};

export const updateCart = async (productInfo) => {
  const response = await fetch(`${apiEndPoint}/${userData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ merge: true, products: [productInfo] }),
  });
  const updatedCart = await response.json();
  return updatedCart;
};

export const deleteCart = async () => {
  const response = await fetch(`${apiEndPoint}/${userData.id}`, {
    method: "DELETE",
  });
  const deletedCart = await response.json();
  return deletedCart;
};
