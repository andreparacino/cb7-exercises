import {
  qSA,
  getFilteredProducts,
  renderProducts,
  qS,
  createProductModal,
  getProducts,
  debouncedGetProducts,
  createCartModal,
  createAuthModal,
} from "./helpers/utilities.js";
const categoryFilter = qS("#categorySelect");
const secondLevelFilters = qSA(".radioButton");
const productsList = qS(".Products");
const searchBar = qS("#searchBar");
const cartBtn = qS("#cart");

export let cartItems = [];
let productsData = [];
let selectedFilter = "all";
let selectedCategory;

const startApplication = async () => {
  const pageContent = [qS(".Header"), qS(".Hero"), qS(".MainContent")];
  pageContent.forEach((el) => (el.style.display = "flex"));

  const products = await getProducts();
  productsData.push(...products);
  renderProducts(products);

  categoryFilter.addEventListener("change", async (event) => {
    selectedCategory = event.target.value;
    const newProducts = await getProducts({ category: selectedCategory });
    productsData = getFilteredProducts({
      filter: selectedFilter,
      productsData: newProducts,
    });
    renderProducts(productsData);
  });

  searchBar.addEventListener("input", async (event) => {
    let filteredProducts = [];

    if (selectedCategory)
      filteredProducts = productsData.filter((product) =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
    else
      filteredProducts = await debouncedGetProducts({
        query: event.target.value,
      });

    renderProducts(filteredProducts);
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

    if (!productDetails) return;

    createProductModal(productDetails);
  });

  cartBtn.addEventListener(
    "click",
    () => cartItems.length && createCartModal()
  );
};

createAuthModal(startApplication);
