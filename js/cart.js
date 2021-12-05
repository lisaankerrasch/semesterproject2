import createMenu from "./components/common/createMenu.js";
import { renderProducts } from "./ui/renderProducts.js";
import { getItemsInCart } from "./utils/storage.js";

createMenu();

const inCart = getItemsInCart();

const cartContainer = document.querySelector(".container__cart");
const sumContainer = document.querySelector(".container__cart__total");

const clearButton = document.querySelector(".clear-button");

if (inCart.length === 0) {
  cartContainer.innerHTML = `<div><p>No items in cart. Go to the <a href="products.html">products page</a> to do something about it!</p></div>`;
  sumContainer.innerHTML = "";
}

inCart.forEach(function (product) {
  clearButton.classList.remove("hidden");

  cartContainer.innerHTML += `<div class="product">
                                <a href="details.html?id=${product.id}">
                                    <img class="product__thumbnail" src="${product.image_url}" alt="${product.title}">
                                    <div class="product__title product__text">
                                     <h3>${product.title}</h3>
                                    </div>
                                </a>
                                <div class="product__price product__text">
                                            <h4>$${product.price}</h4>
                                          </div>
                                          <div class="product__info__flex">
                                            <div class="product__colors">
                                              <div class="${product.color}"></div>
                                              <div class="${product.color_secondary}"></div>
                                              <div class="${product.color_tertiary}"></div>
                                            </div>
                                            <div>
                                            </div>
                                          </div>
                                      </div>`;
});

clearButton.addEventListener("click", clearCart);

function clearCart() {
  if (confirm("Are you sure you want to empty the cart?")) {
    cartContainer.innerHTML = `<div><p>No items in cart. Go to the <a href="shop.html">products page</a> to do something about it!</p></div>`;

    clearButton.classList.add("hidden");
    window.localStorage.removeItem("inCart");
    sumContainer.innerHTML = "";
    location.reload();

    renderProducts([]);
  }
}

let total = 0;

inCart.forEach(function (cartElement) {
  total += parseFloat(cartElement.price);
});

if (inCart.length !== 0) {
  sumContainer.innerHTML = `<h3>Cart total: $${total}</h3>`;
}
