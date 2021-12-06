import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";

const token = getToken();

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + "products?id=" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const category = document.querySelector("#category");
const imageUrl = document.querySelector("#image_url");
const color1 = document.querySelector("#color1");
const color2 = document.querySelector("#color2");
const color3 = document.querySelector("#color3");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container");
const idInput = document.querySelector("#id");
const loading = document.querySelector(".loading");

(async function () {
  try {
    const response = await fetch(productUrl);
    const product = await response.json();

    title.value = product[0].title;
    description.value = product[0].description;
    price.value = product[0].price;
    category.value = product[0].category;
    imageUrl.value = product[0].image_url;
    color1.value = product[0].color;
    color2.value = product[0].color_secondary;
    color3.value = product[0].color_tertiary;
    featured.value = product[0].featured;
    idInput.value = product[0].id;

    const editImage = document.querySelector(".edit__flex__image");
    editImage.innerHTML = `<img src="${imageUrl.value}" alt ="${title.value}">`;

    deleteButton(product[0].id);
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(submit) {
  submit.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value;
  const categoryValue = category.value.trim();
  const imageUrlValue = imageUrl.value.trim();
  const color1Value = color1.value.trim();
  const color2Value = color2.value.trim();
  const color3Value = color3.value.trim();
  const featuredValue = featured.value.trim();
  const idValue = idInput.value;

  if (
    titleValue.length === 0 ||
    descriptionValue.length === 0 ||
    priceValue.length === 0 ||
    categoryValue.length === 0 ||
    imageUrlValue.length === 0 ||
    color1Value.length === 0
  ) {
    return displayMessage(
      "warning",
      "All inputs must be filled",
      ".message-container"
    );
  }

  updateProduct(
    titleValue,
    descriptionValue,
    priceValue,
    categoryValue,
    imageUrlValue,
    color1Value,
    color2Value,
    color3Value,
    featuredValue,
    idValue
  );
}

async function updateProduct(
  title,
  description,
  price,
  category,
  imageUrl,
  color1,
  color2,
  color3,
  featured,
  id
) {
  const url = baseUrl + "products/" + id;
  const data = JSON.stringify({
    title: title,
    description: description,
    price: price,
    category: category,
    image_url: imageUrl,
    color: color1,
    color_secondary: color2,
    color_tertiary: color3,
    featured: featured,
  });

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage("success", "product updated!", ".message-container");
    }
    if (json.error) {
      displayMessage("error", "something went wrong", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
