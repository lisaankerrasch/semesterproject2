import { getItemsInCart, saveCart } from "./storage.js";

export function handleClick() {
  this.classList.toggle("notInCart");
  this.classList.toggle("inCart");

  const id = this.dataset.id;
  const title = this.dataset.name;
  const description = this.dataset.description;
  const price = this.dataset.price;
  const category = this.dataset.category;
  const imageUrl = this.dataset.image;

  const currentCart = getItemsInCart();

  const productIsInCart = currentCart.find(function (cartItem) {
    return cartItem.id === id;
  });

  if (productIsInCart === undefined) {
    const product = {
      id: id,
      title: title,
      description: description,
      price: price,
      category: category,
      image_url: imageUrl,
    };
    currentCart.push(product);
    saveCart(currentCart);
    location.reload();
  } else {
    const newCart = currentCart.filter((cartItem) => cartItem.id !== id);
    saveCart(newCart);
  }
}
