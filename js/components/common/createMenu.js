import { getItemsInCart, getUserName } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const username = getUserName();
  const loggedinContainer = document.querySelector(".loggedin-container");

  let authLink = `<a href="products.html" class=${
    pathname === "/products.html" ? "active" : ""
  }>
    Shop
  </a>
  <a href="about.html" class=${pathname === "/about.html" ? "active" : ""}>
    about
  </a>
  <a id="login" href="login.html" class=${
    pathname === "/login.html" ? "active" : ""
  }>Log in</a>`;

  if (username) {
    authLink = `<a href="products.html" class=${
      pathname === "/products.html" ? "active" : ""
    }>
      Edit Product
    </a><a href="add.html" class=${
      pathname === "/add.html" ? "active" : ""
    }>Add product</a>
    <a href="#" id="logout">Log out</a>`;

    loggedinContainer.innerHTML = `<p>Logged in as ${username}.</p>`;
  }

  const menuContainer = document.querySelector(".menu");

  menuContainer.innerHTML = `<div class="menu__content">
                                <div class="menu__mobile">
                                  <div class="menu__logo">
                                    <a href="/">éphémère</a>
                                  </div>
                                  <div class="menu__icon">
                                  <img src="images/icons/menu.svg" alt="menu-icon">
                                  </div>
                                </div>
                                <div class="menu__links ">
                                  ${authLink} 
                                  <a href="cart.html"><img class="menu__cart" src="images/icons/cart-filled.svg" alt="See cart"></a>
                                  <div class="cart__counter"></div>
                                </div>
                            </div>`;
  logoutButton();
  showMenu();
  countCart();
}

function showMenu() {
  const menuIcon = document.querySelector(".menu__icon");
  const menuLinks = document.querySelector(".menu__links");

  if (window.innerWidth < 768) {
    menuLinks.classList.add("hidden");
  }

  menuIcon.onclick = function () {
    menuLinks.classList.toggle("hidden");
  };
}

export function countCart() {
  const cartCounter = document.querySelector(".cart__counter");
  const cartCount = getItemsInCart().length;

  console.log(cartCount);
  if (cartCount !== 0) {
    cartCounter.style.display = "block";
  }

  cartCounter.innerHTML = cartCount;
}
