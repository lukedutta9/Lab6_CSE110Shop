// Script.js

window.addEventListener('DOMContentLoaded', async () => {
  let store = window.localStorage;
  let items = null;

  let cart = store.getItem('cart');
  let cartSet = null;
  
  if (cart === null || cart.toString() == "") {
    cartSet = [];
  } else {
    cartSet = cart.split(",");
  }

  console.log(cartSet.toString() === "");

  if (store.getItem('itemsArray') === null) {
    console.log("fetching");
    await fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => items = data)
      .then(() => store.setItem('itemsArray', JSON.stringify(items)));
  } else {
    items = JSON.parse(store.getItem('itemsArray'));
  }
  
  const productList = document.getElementById('product-list')

  for (let i = 0; i < items.length; i++) {
    const product = items[i];
    const itm = productList.appendChild(document.createElement('product-item'));
    itm.setAttribute('src', product.image);
    itm.setAttribute('alt', product.title);
    itm.setAttribute('title', product.title);
    itm.setAttribute('price', product.price);
    itm.setAttribute('id', product.id);
  }
});

function addOrRemoveCart(ev) {
  const button = ev.explicitOriginalTarget;
  const cartCount = document.getElementById('cart-count');

  if (!button.hasAttribute("incart")) {
    button.textContent = "Remove from Cart";
    button.setAttribute("incart", true);
    cartSet.push(button.getAttribute("num"));
    cartCount.textContent = Number(cartCount.textContent) + 1;
  } else {
    button.textContent = "Add to Cart";
    button.removeAttribute("incart");
    const index = cartSet.indexOf(button.getAttribute("num"));
    if (index > -1) { 
      let remove = cartSet.splice(index, 1);
    }
    cartCount.textContent = Number(cartCount.textContent) - 1;
  }

  console.log(cartSet);
  store.setItem('cart', cartSet.toString());
}