import {
  qSA,
  getFilteredProducts,
  renderProducts,
  qS,
  createProductModal,
  getProducts,
} from "./helpers/utilities.js";

const categoryFilter = qS("#categorySelect");
const secondLevelFilters = qSA(".radioButton");
const productsList = qS(".Products");

let productsData = [];
let selectedFilter = "all";

(async () => {
  const products = await getProducts();
  productsData.push(...products);
  renderProducts(products);
})();

categoryFilter.addEventListener("change", async (event) => {
  const selectedCategory = event.target.value;
  const newProducts = await getProducts(selectedCategory);
  productsData = getFilteredProducts({
    filter: selectedFilter,
    productsData: newProducts,
  });
  renderProducts(productsData);
});

secondLevelFilters.forEach((filter) =>
  filter.addEventListener("change", (event) => {
    selectedFilter = event.target.value;
    renderProducts(
      getFilteredProducts({ filter: selectedFilter, productsData })
    );
  })
);

productsList.addEventListener("click", (event) => {
  const productCard = event.target.closest(".Products-product");
  if (!productCard) return;

  const productDetails = productsData.find(
    (product) => product.id === +productCard.id
  );

  createProductModal(productDetails);
});
