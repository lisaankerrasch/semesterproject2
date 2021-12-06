import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const token = getToken();

if (!token) {
  location.href = "/";
}

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const category = document.querySelector("#category");
const imageUrl = document.querySelector("#image_url");
const color = document.querySelector("#color");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(product) {
  product.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value;
  const categoryValue = category.value.trim();
  const imageUrlValue = imageUrl.value.trim();
  const colorValue = color.value.trim();
  const featuredValue = featured.value.trim();

  if (
    titleValue.length === 0 ||
    descriptionValue.length === 0 ||
    priceValue.length === 0 ||
    categoryValue.length === 0 ||
    imageUrlValue.length === 0 ||
    colorValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please input all fields",
      ".message-container"
    );
  }

  addProduct(
    titleValue,
    descriptionValue,
    priceValue,
    categoryValue,
    imageUrlValue,
    colorValue,
    featuredValue
  );
}

async function addProduct(
  title,
  description,
  price,
  category,
  imageUrl,
  color,
  featured
) {
  const url = baseUrl + "products";

  const data = JSON.stringify({
    title: title,
    description: description,
    price: price,
    category: category,
    image_url: imageUrl,
    color: color,
    featured: featured,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "The product was added", ".message-container");
    }
  } catch (error) {
    displayMessage(
      "error",
      "The product was not added. Try again!",
      ".message-container"
    );
  }
}
