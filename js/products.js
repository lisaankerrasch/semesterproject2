import createMenu from "./components/common/createMenu.js";
import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import { searchProducts } from "./ui/searchProducts.js";
import { handleClick } from "./utils/handleClick.js";
import { filterProducts } from "./ui/searchProducts.js";

createMenu();

const productUrl = baseUrl + "products/";

async function getProducts() {
  try {
    const response = await fetch(productUrl);
    const products = await response.json();

    renderProducts(products);
    searchProducts(products);
    filterProducts(products);
  } catch (error) {
    console.log(error);
  }
}

getProducts();
