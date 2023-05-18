import { cartItems } from "../script.js";

export const cE = (el) => document.createElement(el);
export const qS = (el) => document.querySelector(el);
export const qSA = (el) => document.querySelectorAll(el);

const cartCounter = qS(".CartCounter");

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

export const createProductCard = (product) => {
  const productCard = cE("div");
  const cardBody = cE("section");
  const imageEl = cE("img");
  const titleEl = cE("h3");
  const descriptionEl = cE("p");
  const ratingEl = cE("p");
  const priceEl = cE("h4");
  const addToCartBtn = cE("button");

  productCard.className = "Products-product";
  productCard.id = product.id;
  cardBody.className = "Products-productBody";
  imageEl.src = product.thumbnail;
  imageEl.alt = product.title;
  titleEl.textContent = product.title;
  descriptionEl.textContent = formatDescriptionText(product.description);
  ratingEl.textContent = `Rating: ${product.rating} ⭐`;
  priceEl.textContent = `Price: ${product.price}$`;
  addToCartBtn.textContent = "Add to Cart";
  addToCartBtn.className = "Button";
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

  productsList.innerHTML = "";
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
  const overlay = cE("div");
  const modal = cE("div");
  const mainImage = cE("img");
  const productDetails = cE("div");
  const title = cE("h2");
  const description = cE("p");
  const rating = cE("p");
  const price = cE("h4");
  const actions = cE("div");
  const closeButton = cE("button");
  const cartButton = cE("button");

  overlay.className = "Overlay";
  modal.className = "ProductModal";
  actions.className = "ProductModal-actions";
  productDetails.className = "ProductModal-productDetails";
  mainImage.className = "ProductModal-image";
  mainImage.src = product.thumbnail;
  mainImage.alt = product.title;
  title.textContent = product.title;
  description.textContent = product.description;
  rating.textContent = `Rating: ${product.rating} ⭐`;
  price.textContent = `Price: ${product.price}$`;
  cartButton.textContent = "Add to Cart";
  closeButton.textContent = "Go back";
  closeButton.className = "Button";
  cartButton.className = "Button";

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
