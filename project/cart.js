let cart = [];

// Add item to cart
function addToCart(name, price) {
    // If item exists, increase quantity
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCartCount();
}

// Update cart number shown on Cart button
function updateCartCount() {
    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
        cartCountElement.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}

// Open cart
function openCart() {
    displayCart();
    document.getElementById("cartModal").style.display = "flex";
}

// Close cart
function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

// Display items inside the cart
function displayCart() {
    let container = document.getElementById("cartItems");
    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong> ($${item.price.toFixed(2)})
                <br>
                Quantity: 
                <button onclick="changeQty(${index}, -1)">−</button>
                ${item.qty}
                <button onclick="changeQty(${index}, 1)">+</button>
                <br>
                Item Total: $${itemTotal.toFixed(2)}
                <hr>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = total.toFixed(2);
}

// Increase / decrease quantity
function changeQty(index, amount) {
    cart[index].qty += amount;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1); // remove item if qty 0
    }

    displayCart();
    updateCartCount();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let summary = "Your Order:\n\n";

    cart.forEach(item => {
        summary += `${item.name} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
    });

    summary += `\nTotal: $${document.getElementById("cartTotal").innerText}`;

    alert(summary + "\n\n✔ Order Successful!");

    cart = [];
    updateCartCount();
    closeCart();
}