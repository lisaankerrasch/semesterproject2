import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import {
  searchProducts,
  filterProducts,
  seeAllproducts,
} from "./ui/searchProducts.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const productUrl = baseUrl + "products/";

async function getProducts() {
  try {
    const response = await fetch(productUrl);
    const products = await response.json();

    renderProducts(products);
    searchProducts(products);
    filterProducts(products);
    seeAllproducts(products);
  } catch (error) {
    console.log(error);
    displayMessage("error", "Something went wrong :(", ".message-container");
  }
}

getProducts();
