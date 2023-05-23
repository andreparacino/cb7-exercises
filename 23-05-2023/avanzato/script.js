import { getCart, createDummyCart } from "./helpers/api.js";
import {
  createAuthModal,
  createCart,
  createElement,
  userData,
} from "./helpers/utilities.js";

export let cartInfo = null;
export const setCartInfo = (newCartInfo) => {
  cartInfo = newCartInfo;
};

const dummyPostBtn = document.querySelector(".dummyPost");
console.log(dummyPostBtn);

dummyPostBtn.addEventListener("click", createDummyCart);

const startApplication = async () => {
  const root = document.getElementById("root");
  root.style.display = "block";

  const greetingText = document.querySelector(".greetingText");
  greetingText.textContent = `Welcome ${userData.name}!`;

  cartInfo = await getCart();
  createCart();
};

createAuthModal(startApplication);
