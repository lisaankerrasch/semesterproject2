import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import { getItemsInCart } from "./utils/storage.js";
import { handleClick } from "./utils/handleClick.js";
import { displayMessage } from "./components/common/displayMessage.js";

createMenu();

const title = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const detaillUrl = baseUrl + "products?id=" + id;
const productsUrl = baseUrl + "products";

if (!id) {
  document.location.href = "/";
}

async function getDetails() {
  try {
    const response = await fetch(detaillUrl);
    const detail = await response.json();
    const currentCategory = detail[0].category;
    const currentId = detail[0].id;

    renderDetails(detail);

    async function mightLike() {
      try {
        const response = await fetch(productsUrl);
        const detail = await response.json();

        const mightlikeContainer = document.querySelector(
          ".container__might-like__content"
        );

        for (let i = 1; i < detail.length; i++) {
          if (
            detail[i].category === currentCategory &&
            detail[i].id !== currentId
          ) {
            mightlikeContainer.innerHTML += `
                                              <div class="product">
                                              <a href="details.html?id=${detail[i].id}">
                                              <img class="product__thumbnail" src="${detail[i].image_url}" alt="${detail[i].title}">
                                              <div class="product__title product__text">
                                                  <h3>${detail[i].title}</h3>
                                              </div>
                                              </a>
                                                    <div class="product__price product__text">
                                                      <h4>$${detail[i].price}</h4>
                                                    </div>
                                                    <div class="product__info__flex">
                                                      <div class="product__colors">
                                                        <div class="circle circle__${detail[i].color}"></div>
                                                        <div class="circle circle__${detail[i].color_secondary}"></div>
                                                        <div class="circle circle__${detail[i].color_tertiary}"></div>
                                                      </div>
                                                    </div>
                                                </div>`;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    mightLike();

    const cartButtons = document.querySelectorAll(".detail__cart");
    cartButtons.forEach((cart) => {
      cart.addEventListener("click", handleClick);
    });
  } catch (error) {
    console.log(error);
  }
}

function renderDetails(detailsToRender) {
  const inCart = getItemsInCart();

  detailsToRender.forEach(function (detail) {
    let cssClass = "notInCart";

    const detailContainer = document.querySelector(".container__details");

    detailContainer.innerHTML = "";

    const isProductInCart = inCart.find(function (cartItem) {
      return parseInt(cartItem.id) === detail.id;
    });

    if (isProductInCart) {
      cssClass = "inCart";
    }
    title.innerHTML = `${detail.title}`;

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
                                                     <div class="circle circle__${detail.color}"></div>
                                                     <div class="circle circle__${detail.color_secondary}"></div>
                                                     <div class="circle circle__${detail.color_tertiary}"></div>
                                                 </div>
                                              </div>
                                              <div>
                                              <img class="detail__cart ${cssClass}" src="images/icons/cart-stroke-2.svg" alt="Add to cart" data-id="${detail.id}" data-name="${detail.title}" data-description="${detail.description}" data-price="${detail.price}" data-image="${detail.image_url}"data-category="${detail.category}">
                                              </div>
                                          </div>
                                     `;
  });
}

getDetails();
