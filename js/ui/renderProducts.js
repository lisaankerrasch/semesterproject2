import { getItemsInCart, getUserName } from "../utils/storage.js";
import { getToken } from "../utils/storage.js";
import { handleClick } from "../utils/handleClick.js";

const token = getToken();

export function renderProducts(productsToRender) {
  const inCart = getItemsInCart();

  const username = getUserName();
  const productsContainer = document.querySelector(".container__products");

  productsContainer.innerHTML = "";

  productsToRender.forEach(function (product) {
    let cssClass = "notInCart";

    const isProductInCart = inCart.find(function (cartItem) {
      return parseInt(cartItem.id) === product.id;
    });

    if (isProductInCart) {
      cssClass = "inCart";
    }

    let editLink = `<a href="details.html?id=${product.id}">
    <img class="product__thumbnail" src="${product.image_url}" alt="${product.title}">
    <div class="product__title product__text">
        <h3>${product.title}</h3>
    </div>
    </a>`;

    if (username) {
      editLink = `<a href="edit.html?id=${product.id}">
    <img class="product__thumbnail" src="${product.image_url}" alt="${product.title}">
    <div class="product__title product__text">
        <h3>${product.title}</h3>
    </div>
   </a>`;
    }

    productsContainer.innerHTML += `
                                    <div class="product">
                                       ${editLink}
                                          <div class="product__price product__text">
                                            <h4>$${product.price}</h4>
                                          </div>
                                          <div class="product__info__flex">
                                            <div class="product__colors">
                                              <div class="circle circle__${product.color}"></div>
                                              <div class="circle circle__${product.color_secondary}"></div>
                                              <div class="circle circle__${product.color_tertiary}"></div>
                                            </div>
                                            <div>
                                              <img class="product__cart ${cssClass}" src="images/icons/cart-stroke.svg" alt="Add to cart" data-id="${product.id}" data-name="${product.title}" data-description="${product.description}" data-price="${product.price}" data-image="${product.image_url}"data-category="${product.category}">
                                            </div>
                                          </div>
                                      </div>`;
  });
  const cartButtons = document.querySelectorAll(".product__cart");

  cartButtons.forEach((cart) => {
    cart.addEventListener("click", handleClick);
  });
}
