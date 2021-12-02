import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";
import displayMessage from "../common/displayMessage.js";

export default function deleteButton(id) {
  const deleteContainer = document.querySelector(".delete-container");
  deleteContainer.innerHTML = `<button type="button" class="button delete button__delete">Delete Product</button>`;

  const button = document.querySelector("button.delete");

  button.onclick = async function () {
    console.log(id);

    const doDelete = confirm("Are you sure you want to delete the product?");

    if (doDelete) {
      const url = baseUrl + "products/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      location.href = "/products.html";

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "/products.html";
      } catch (error) {
        console.log(error);
        displayMessage("warning", "Could not delete", ".message-container");
      }
    }
  };
}
