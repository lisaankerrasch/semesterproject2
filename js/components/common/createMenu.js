import { getUserName } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const username = getUserName();
  const loggedinContainer = document.querySelector(".loggedin-container");

  let authLink = `<a href="products.html" class=${
    pathname === "/products.html" ? "active" : ""
  }>
    Shop
  </a><a id="login" href="login.html" class=${
    pathname === "/login.html" ? "active" : ""
  }>Log in</a>`;

  if (username) {
    authLink = `<a href="products.html" class=${
      pathname === "/products.html" ? "active" : ""
    }>
      Edit
    </a><a href="add.html" class=${
      pathname === "/add.html" ? "active" : ""
    }>Add</a>
    <a href="#" id="logout">Log out</a>`;

    loggedinContainer.innerHTML = `<p>Logged in as ${username}.</p>`;
  }

  const menuContainer = document.querySelector(".menu");

  menuContainer.innerHTML = `<div class="menu__content">
                                <div class="menu__logo">
                                  <a href="/">SASS BOUTIQUE </a>
                                </div>
                                <div class="menu__links">
                                  ${authLink} 
                                  <a href="cart.html"><img class="menu__cart" src="images/icons/cart-filled.svg" alt="See cart"></a>
                                </div>
                                <div class="menu__icon">
                                <img src="images/icons/menu.svg" alt="menu-icon">
                                </div>
                            </div>`;
  logoutButton();
}
