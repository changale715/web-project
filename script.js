// ✅ Add product to cart
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// ✅ Display cart items on cart.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("cart.html")) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPrice.textContent = "";
      return;
    }

    let total = 0;
    cartContainer.innerHTML = "";

    cartItems.forEach((item, index) => {
      total += item.price;
      cartContainer.innerHTML += `
        <div class="col-md-3 mb-4">
          <div class="card shadow-sm">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">₹${item.price}</p>
              <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    totalPrice.textContent = "Total: ₹" + total;
  }
});

// ✅ Remove single item
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

// ✅ Clear entire cart
function clearCart() {
  localStorage.removeItem("cart");
  window.location.reload();
}
