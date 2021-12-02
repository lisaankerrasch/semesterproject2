import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import { getItemsInCart } from "./utils/storage.js";
import { handleClick } from "./utils/handleClick.js";

createMenu();

const title = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productUrl = baseUrl + "products?id=" + id;

if (!id) {
  document.location.href = "/";
}

async function getDetails() {
  try {
    const response = await fetch(productUrl);
    const detail = await response.json();

    renderProducts(detail);

    const cartButtons = document.querySelectorAll(".detail__cart");
    cartButtons.forEach((cart) => {
      cart.addEventListener("click", handleClick);
    });
  } catch (error) {
    console.log(error);
  }
}

function renderProducts(productsToRender) {
  const inCart = getItemsInCart();

  productsToRender.forEach(function (detail) {
    let cssClass = "notInCart";

    const detailContainer = document.querySelector(".container__details");

    detailContainer.innerHTML = "";

    const isProductInCart = inCart.find(function (cartItem) {
      return parseInt(cartItem.id) === detail.id;
    });

    if (isProductInCart) {
      cssClass = "inCart";
    }

    // title.innerHTML = `${detail[0].title}`;

    detailContainer.innerHTML = `

                                       <div class="detail">
                                             <div class="detail__flex__1">
                                                  <img class="detail__image" src="${detail.image_url}" alt="${detail.title}">
                                           </div>
                                             <div class="detail__flex__2">
                                                 <div class="detail__text">
                                                     <h1>${detail.title}</h1>
                                                 </div>
                                                 <div class="detail__description detail__text">
                                                 ${detail.description}
                                                 </div>
                                                 <div class="detail__info__flex">
                                                 <div class="detail__price detail__text">
                                                     <h4>$${detail.price}</h4>
                                                 </div>
                                                 <div class="detail__colors">
                                                     <div class="${detail.color}"></div>
                                                     <div class="${detail.color_secondary}"></div>
                                                     <div class="${detail.color_tertiary}"></div>
                                                 </div>
                                              </div>
                                              <div>
                                              <img class="detail__cart ${cssClass}" src="images/icons/cart-stroke.svg" alt="Add to cart" data-id="${detail.id}" data-name="${detail.title}" data-description="${detail.description}" data-price="${detail.price}" data-image="${detail.image_url}"data-category="${detail.category}">
                                              </div>
                                          </div>
                                     `;
  });
}

getDetails();
