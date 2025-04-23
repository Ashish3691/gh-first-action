const categories = ['Beverages', 'Snacks', 'Fruits'];

const products = {
  Beverages: [
    { name: 'Coke', price: 1.5 },
    { name: 'Pepsi', price: 1.4 },
  ],
  Snacks: [
    { name: 'Chips', price: 2 },
    { name: 'Cookies', price: 2.5 },
  ],
  Fruits: [
    { name: 'Apple', price: 1 },
    { name: 'Banana', price: 0.8 },
  ]
};

let cart = [];

function renderCategories() {
  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = '';
  categories.forEach(cat => {
    const li = document.createElement('li');
    li.textContent = cat;
    li.className = 'cursor-pointer hover:underline';
    li.onclick = () => renderProducts(cat);
    categoryList.appendChild(li);
  });
}

function renderProducts(category) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  products[category].forEach(product => {
    const div = document.createElement('div');
    div.className = 'p-2 border rounded shadow-sm hover:bg-blue-100 cursor-pointer';
    div.textContent = `${product.name} - $${product.price}`;
    div.onclick = () => addToCart(product);
    productList.appendChild(div);
  });
}

function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cartList');
  const totalPrice = document.getElementById('totalPrice');
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center';
    li.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <div class="flex space-x-2">
        <button onclick="updateQty('${item.name}', -1)" class="px-2 py-1 bg-red-200 rounded">-</button>
        <button onclick="updateQty('${item.name}', 1)" class="px-2 py-1 bg-green-200 rounded">+</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  totalPrice.textContent = total.toFixed(2);
}

function updateQty(name, change) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("Order placed successfully!");
  cart = [];
  renderCart();
}

renderCategories();
