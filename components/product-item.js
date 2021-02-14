// product-item.js

let store = window.localStorage;
let cart = store.getItem('cart');
let cartSet;

if (cart === null || cart.toString() == "") {
  cartSet = [];
} else {
  cartSet = cart.split(",");
}

class ProductItem extends HTMLElement {

  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    // style

    shadow.innerHTML = `
    <style>
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
    </style>`;

    // li
    const product = document.createElement('li');
    product.setAttribute('class', 'product')

    // img
    const image = product.appendChild(document.createElement('img'));
    image.alt = this.getAttribute('alt');
    image.width = 200;

    // p - title
    const title = product.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');

    // p2 - price
    const price = product.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');

    // button
    const button = product.appendChild(document.createElement('button'));
    button.setAttribute('onclick', "addOrRemoveCart(event)");
    button.innerText = 'Add to Cart';

    shadow.append(product);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const prod = this.shadowRoot.lastChild;
    const childs = prod.children;
    if (attrName == 'src') {
      const image = childs[0];
      image.src = newVal;
    } else if (attrName == 'alt') {
      const image = childs[0];
      image.alt = newVal;
    } else if (attrName == 'title') {
      const title = childs[1];
      title.textContent = newVal;
    } else if (attrName == 'id') {
      const cartCount = document.getElementById('cart-count');
      const button = childs[3];
      let isBut = false;

      for (let i = 0; i < cartSet.length; i++) {
        if (cartSet[i] == newVal) {
          isBut = true;
        }
      }
      button.setAttribute("num", newVal);
      if (isBut) {
        button.textContent = "Remove from Cart";
        button.setAttribute("incart", true);
        cartCount.textContent = Number(cartCount.textContent) + 1;
      } else {
        button.textContent = "Add to Cart";
        button.removeAttribute("incart");
      }
    } else {
      const price = childs[2];
      price.textContent = '$' + newVal;
    }
  }

  static get observedAttributes() { 
    return ['title', 'src', 'alt', 'price', 'id']; 
  }

  connectedCallback() {
  }
}

customElements.define('product-item', ProductItem);