import { renderProducts } from "./renderProducts.js";
import { handleClick } from "../utils/handleClick.js";

const header = document.querySelector("h2");

export function searchProducts(products) {
  const search = document.querySelector(".search");
  const productContainer = document.querySelector(".container__products");

  search.onkeyup = function (search) {
    const searchValue = search.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
      if (
        product.title.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue)
      ) {
        return true;
      }
    });
    header.innerHTML = `Search result for ${searchValue}:`;

    renderProducts(filteredProducts);
    const cartButtons = document.querySelectorAll(".product__cart");

    cartButtons.forEach((cart) => {
      cart.addEventListener("click", handleClick);
    });
  };
}

export function filterProducts(products) {
  const categoryButtons = document.querySelectorAll(".category");
  categoryButtons.forEach((category) => {
    category.addEventListener("click", filterCategories);

    function filterCategories() {
      const filterValue = category.innerHTML.trim().toLowerCase();

      const filteredProducts = products.filter(function (product) {
        if (product.category.toLowerCase().includes(filterValue)) {
          header.innerHTML = filterValue;

          return true;
        }
      });
      renderProducts(filteredProducts);
      const cartButtons = document.querySelectorAll(".product__cart");

      cartButtons.forEach((cart) => {
        cart.addEventListener("click", handleClick);
      });
    }
  });
}

export function seeAllproducts(products) {
  const seeAllButton = document.querySelector(".see-all");

  seeAllButton.addEventListener("click", seeAll);

  function seeAll() {
    const allProducts = products.filter(function (product) {
      if (product.created_at.includes("2021")) {
        header.innerHTML = "All products";

        return true;
      }
    });
    renderProducts(allProducts);
    const cartButtons = document.querySelectorAll(".product__cart");

    cartButtons.forEach((cart) => {
      cart.addEventListener("click", handleClick);
    });
  }
}
