import { qS, createProduct } from "./helpers/utilities.js";

const productsList = qS(".Products");

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) =>
    data.products.forEach((product) =>
      productsList.append(createProduct(product))
    )
  );
