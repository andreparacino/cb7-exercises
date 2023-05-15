export const cE = (el) => document.createElement(el);
export const qS = (el) => document.querySelector(el);
export const qSA = (el) => document.querySelectorAll(el);

export const formatDescriptionText = (str) =>
  str.split(" ").splice(0, 10).join(" ") + "...";

export const createProduct = (data) => {
  const productCard = cE("div");
  const cardBody = cE("section");
  const imageEl = cE("img");
  const titleEl = cE("h3");
  const descriptionEl = cE("p");
  const ratingEl = cE("p");
  const priceEl = cE("h4");
  const buttonEl = cE("button");

  productCard.className = "Products-product";
  cardBody.className = "Products-productBody";
  imageEl.src = data.thumbnail;
  imageEl.alt = data.title;
  titleEl.textContent = data.title;
  descriptionEl.textContent = formatDescriptionText(data.description);
  ratingEl.textContent = `Rating: ${data.rating} ⭐`;
  priceEl.textContent = `Price: ${data.price}$`;
  buttonEl.textContent = "Add to Cart";

  cardBody.append(titleEl, descriptionEl, ratingEl, priceEl, buttonEl);

  productCard.append(imageEl, cardBody);

  return productCard;
};

export const renderProducts = (data) => {
  const productsList = qS(".Products");

  productsList.innerHTML = "";
  data.forEach((product) => productsList.append(createProduct(product)));
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
