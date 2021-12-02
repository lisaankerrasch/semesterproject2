import { renderProducts } from "./renderProducts.js";
import { handleClick } from "../utils/handleClick.js";

export function searchProducts(products) {
  const search = document.querySelector(".search");

  search.onkeyup = function (search) {
    console.log(search);

    const searchValue = search.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
      if (
        product.title.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue)
      ) {
        header.innerHTML = `Search result for ${searchValue}:`;

        return true;
      }
    });

    console.log(filteredProducts);

    renderProducts(filteredProducts);
    const cartButtons = document.querySelectorAll(".product__cart");

    cartButtons.forEach((cart) => {
      cart.addEventListener("click", handleClick);
    });
  };
}
const header = document.querySelector("h2");

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
