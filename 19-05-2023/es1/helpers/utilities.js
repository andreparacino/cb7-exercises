import { cartItems } from "../script.js";
import USERS_DATA from "./credentials.js";

export const cE = (el) => document.createElement(el);
export const qS = (el) => document.querySelector(el);
export const qSA = (el) => document.querySelectorAll(el);

const cartCounter = qS(".CartCounter");

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

    if (user) onSuccess();
    else window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    overlay.remove();
  });

  const usernameInput = document.createElement("input");
  usernameInput.setAttribute("type", "text");
  usernameInput.setAttribute("name", "username");
  usernameInput.setAttribute("placeholder", "Username");
  form.appendChild(usernameInput);

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("placeholder", "Password");
  form.appendChild(passwordInput);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.className = "Button";
  form.appendChild(submitButton);

  modal.appendChild(form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
};

export const formatDescriptionText = (str) =>
  str.split(" ").splice(0, 10).join(" ") + "...";

export const getProducts = async (args) => {
  const categoryPath = args?.category ? `/category/${args?.category}` : "";
  const queryParam = args?.query ? `/search?q=${args?.query}` : "";

  const resolvedUrl = `https://dummyjson.com/products${categoryPath}${queryParam}`;

  const products = await fetch(resolvedUrl).then((res) => res.json());
  return products.products;
};

const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await func.apply(this, args);
        resolve(result);
      }, delay);
    });
  };
};

export const debouncedGetProducts = debounce(getProducts, 600);

const createEl = (el, props = {}) => {
  const element = cE(el);
  Object.assign(element, props);
  return element;
};

export const createProductCard = (product) => {
  const productCard = createEl("div", {
    className: "Products-product",
    id: product.id,
  });
  const cardBody = createEl("section", { className: "Products-productBody" });
  const imageEl = createEl("img", {
    src: product.thumbnail,
    alt: product.title,
  });
  const titleEl = createEl("h3", { textContent: product.title });
  const descriptionEl = createEl("p", {
    textContent: formatDescriptionText(product.description),
  });
  const ratingEl = createEl("p", {
    textContent: `Rating: ${product.rating} ⭐`,
  });
  const priceEl = createEl("h4", { textContent: `Price: ${product.price}$` });
  const addToCartBtn = createEl("button", {
    textContent: "Add to Cart",
    className: "Button",
  });

  addToCartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    handleAddToCart(product);
  });

  cardBody.append(titleEl, descriptionEl, ratingEl, priceEl, addToCartBtn);
  productCard.append(imageEl, cardBody);

  return productCard;
};

export const renderProducts = (data) => {
  const productsList = qS(".Products");

  productsList.innerText = "";
  data.forEach((product) => productsList.append(createProductCard(product)));
};

export const getFilteredProducts = ({ filter, productsData }) => {
  switch (filter) {
    case "all":
      return productsData;
    case "cheap":
      return productsData.filter((product) => product.price < 500);
    case "topRatings":
      return productsData.filter((product) => product.rating > 4.5);
    default:
      return productsData;
  }
};

const handleAddToCart = (product) => {
  const cartCounter = qS(".CartCounter");

  if (!cartItems.length) cartCounter.classList.add("active");

  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) existingItem.quantity++;
  else {
    product.quantity = 1;
    cartItems.push(product);
  }
  cartCounter.textContent = cartItems.length;

  alert("Product added to cart!");
};

export const createProductModal = (product) => {
  const overlay = createEl("div", { className: "Overlay" });
  const modal = createEl("div", { className: "ProductModal" });
  const mainImage = createEl("img", {
    className: "ProductModal-image",
    src: product.thumbnail,
    alt: product.title,
  });
  const productDetails = createEl("div", {
    className: "ProductModal-productDetails",
  });
  const title = createEl("h2", { textContent: product.title });
  const description = createEl("p", { textContent: product.description });
  const rating = createEl("p", { textContent: `Rating: ${product.rating} ⭐` });
  const price = createEl("h4", { textContent: `Price: ${product.price}$` });
  const actions = createEl("div", { className: "ProductModal-actions" });
  const closeButton = createEl("button", {
    textContent: "Go back",
    className: "Button",
  });
  const cartButton = createEl("button", {
    textContent: "Add to Cart",
    className: "Button",
  });

  closeButton.addEventListener("click", () => overlay.remove());
  cartButton.addEventListener("click", () => {
    handleAddToCart(product);
    overlay.remove();
  });

  actions.append(cartButton, closeButton);
  productDetails.append(title, description, rating, price, actions);
  modal.append(mainImage, productDetails);
  overlay.append(modal);

  document.body.append(overlay);
};

const getTotalPrice = () =>
  `Total: ${cartItems.reduce((acc, curr) => {
    const objectPrice = curr.price * curr.quantity;
    return acc + objectPrice;
  }, 0)}$`;

export const createCartItem = (itemsList, modalContainer) => {
  const totalIndicator = modalContainer.querySelector(".total");

  cartItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("item");

    listItem.innerHTML = `
      <div class="item-details">
        <h3 class="item-title">${item.title}</h3>
        <div class="item-quantity">
          <label for="quantity-${item.id}">Quantity:</label>
          <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" max="${item.stock}" />
        </div>
        <button class="Button remove-button">Remove</button>
      </div>
    `;

    const quantityInput = listItem.querySelector(`#quantity-${item.id}`);
    const removeButton = listItem.querySelector(".remove-button");

    quantityInput.addEventListener("change", (event) => {
      const newQuantity = parseInt(event.target.value);
      item.quantity = newQuantity;

      totalIndicator.textContent = getTotalPrice();
    });

    removeButton.addEventListener("click", () => {
      const index = cartItems.indexOf(item);
      if (index > -1) cartItems.splice(index, 1);

      cartCounter.textContent = cartItems.length || "";
      listItem.remove();

      if (!cartItems.length) {
        cartCounter.classList.remove("active");
        modalContainer.remove();
      }

      totalIndicator.textContent = getTotalPrice();
    });

    itemsList.appendChild(listItem);
  });
};

export const createCartModal = () => {
  const modalContainer = document.createElement("div");
  modalContainer.className = "Overlay";
  modalContainer.innerHTML = `
    <div class="CartModal">
      <span class="close-button">&times;</span>
      <h2>Cart Items</h2>
      <ul class="item-list"></ul>
      <p class="total">${getTotalPrice()}</p>
      <div class="action-buttons">
        <button class="Button checkout-button">Checkout</button>
      </div>
    </div>
  `;

  const closeButton = modalContainer.querySelector(".close-button");
  const itemsList = modalContainer.querySelector(".item-list");
  const checkoutButton = modalContainer.querySelector(".checkout-button");

  closeButton.addEventListener("click", () => modalContainer.remove());

  checkoutButton.addEventListener("click", () => {}); // Logica del checkout

  createCartItem(itemsList, modalContainer);

  document.body.appendChild(modalContainer);
};
