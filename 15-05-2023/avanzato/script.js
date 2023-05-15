import {
  qSA,
  getFilteredProducts,
  renderProducts,
} from "./helpers/utilities.js";

const filters = qSA(".radioButton");

const productsData = [];

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    productsData.push(...data.products);
    renderProducts(data.products);
  });

filters.forEach((filter) =>
  filter.addEventListener("change", (event) => {
    const selectedFilter = event.target.value;
    renderProducts(
      getFilteredProducts({ filter: selectedFilter, productsData })
    );
  })
);
