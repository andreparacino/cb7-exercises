export const cE = (el) => document.createElement(el);
export const qS = (el) => document.querySelector(el);
export const qSA = (el) => document.querySelectorAll(el);

export const formatDescriptionText = (str) =>
  str.split(" ").splice(0, 10).join(" ") + "...";

export const getProducts = async (category) => {
  const products = await fetch(
    `https://dummyjson.com/products${category ? `/category/${category}` : ""}`
  ).then((res) => res.json());
  return products.products;
};

export const createProductCard = (product) => {
  const productCard = cE("div");
  const cardBody = cE("section");
  const imageEl = cE("img");
  const titleEl = cE("h3");
  const descriptionEl = cE("p");
  const ratingEl = cE("p");
  const priceEl = cE("h4");
  const buttonEl = cE("button");

  productCard.className = "Products-product";
  productCard.id = product.id;
  cardBody.className = "Products-productBody";
  imageEl.src = product.thumbnail;
  imageEl.alt = product.title;
  titleEl.textContent = product.title;
  descriptionEl.textContent = formatDescriptionText(product.description);
  ratingEl.textContent = `Rating: ${product.rating} ⭐`;
  priceEl.textContent = `Price: ${product.price}$`;
  buttonEl.textContent = "Add to Cart";
  buttonEl.className = "Button";

  cardBody.append(titleEl, descriptionEl, ratingEl, priceEl, buttonEl);

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
  modal.className = "Modal";
  actions.className = "Modal-actions";
  productDetails.className = "Modal-productDetails";
  mainImage.className = "Modal-image";
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

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.target !== modal) overlay.remove();
  });

  actions.append(cartButton, closeButton);
  productDetails.append(title, description, rating, price, actions);
  modal.append(mainImage, productDetails);
  overlay.append(modal);

  document.body.append(overlay);
};
