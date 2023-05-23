import { cartInfo, setCartInfo } from "../script.js";
import { deleteCart, updateCart } from "./api.js";
import USERS_DATA from "./credentials.js";

export let userData = null;

export const createElement = (el, props = {}) => {
  const element = document.createElement(el);
  Object.assign(element, props);
  return element;
};

export const createAuthModal = (onSuccess) => {
  const overlay = document.createElement("div");
  overlay.className = "Overlay";

  const modal = document.createElement("div");
  modal.className = "AuthModal";

  const form = document.createElement("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    const user = USERS_DATA.find(
      (userData) =>
        userData.username === username && userData.password === password
    );

    if (user) {
      userData = user;
      onSuccess();
    } else
      window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    overlay.remove();
  });

  const usernameInput = createElement("input", {
    type: "text",
    name: "username",
    placeholder: "Username",
  });
  form.appendChild(usernameInput);

  const passwordInput = createElement("input", {
    type: "password",
    name: "password",
    placeholder: "Password",
  });
  form.appendChild(passwordInput);

  const submitButton = createElement("button", {
    textContent: "Submit",
    className: "Button",
  });
  form.appendChild(submitButton);

  modal.appendChild(form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
};

export const createCartItems = (itemsList, container) => {
  const totalIndicator = container.querySelector(".total");

  itemsList.textContent = "";
  cartInfo.products
    .filter((product) => !!product.quantity)
    .forEach((product) => {
      const listItem = createElement("li", { className: "item" });

      listItem.innerHTML = `
      <div class="item-details">
        <h3 class="item-title">${product.title}</h3>
        <div class="item-quantity">
          <label for="quantity-${product.id}">Quantity:</label>
          <input type="number" id="quantity-${product.id}" value="${product.quantity}" min="1" max="10" />
        </div>
        <button class="Button remove-button">Remove</button>
      </div>
    `;

      const quantityInput = listItem.querySelector(`#quantity-${product.id}`);
      const removeButton = listItem.querySelector(".remove-button");

      quantityInput.addEventListener("change", async (event) => {
        const newQuantity = parseInt(event.target.value);
        product.quantity = newQuantity;

        const newCart = await updateCart({
          id: product.id,
          quantity: newQuantity,
        });
        setCartInfo(newCart);
        createCartItems(itemsList, container);
        totalIndicator.textContent = `Total: ${cartInfo.total}$`;
      });

      removeButton.addEventListener("click", async () => {
        const newCart = await updateCart({ id: product.id, quantity: 0 });
        setCartInfo(newCart);
        createCartItems(itemsList, container);

        totalIndicator.textContent = `Total: ${cartInfo.total}$`;
      });

      itemsList.appendChild(listItem);
    });
};

export const createCart = () => {
  const cartSection = document.querySelector(".Cart");
  cartSection.innerHTML = `
      <h2>Cart Items</h2>
        <ul class="item-list"></ul>
        <p class="total">Total: ${cartInfo.total}$</p>
        <div class="action-buttons">
        <button class="Button clear-button">Clear Cart</button>
          <button class="Button checkout-button">Checkout</button>
        </div>
    `;

  const itemsList = cartSection.querySelector(".item-list");
  const checkoutButton = cartSection.querySelector(".checkout-button");
  const clearButton = cartSection.querySelector(".clear-button");

  clearButton.addEventListener("click", () => {
    deleteCart();
    cartSection.textContent = "";
    cartSection.append(
      createElement("p", { textContent: "You cleared your cart!" })
    );
  });
  checkoutButton.addEventListener("click", () => {}); // Logica del checkout

  createCartItems(itemsList, cartSection);
};
