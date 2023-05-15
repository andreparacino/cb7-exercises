export const cE = (el) => document.createElement(el);
export const qS = (el) => document.querySelector(el);

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
