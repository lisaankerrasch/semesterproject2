import createMenu from "./components/common/createMenu.js";
import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import { handleClick } from "./utils/handleClick.js";

createMenu();

const productUrl = baseUrl + "products?featured=true";

async function getFeatured() {
  try {
    const response = await fetch(productUrl);
    const products = await response.json();

    renderProducts(products);

    const cartButtons = document.querySelectorAll(".product__cart");

    cartButtons.forEach((cart) => {
      cart.addEventListener("click", handleClick);
    });
  } catch (error) {
    console.log(error);
  }
}

getFeatured();

const heroContainer = document.querySelector(".hero-image-container");
const heroImageUrl = baseUrl + "home";

async function getHeroImage() {
  try {
    const response = await fetch(heroImageUrl);
    const heroImage = await response.json();

    heroContainer.innerHTML = ` <img class="hero__image" src="${heroImage.hero_Banner[0].formats.large.url}" alt="main image">
    `;
  } catch (error) {
    console.log(error);
  }
}

getHeroImage();
