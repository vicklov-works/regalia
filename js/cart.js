/* CART STATE */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* UTILITIES*/
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (!el) return;

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    el.textContent = count;
}

/* ADD TO CART */
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
}

/* GLOBAL CLICK HANDLER */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-cart")) {
        const id = parseInt(e.target.dataset.id);
        if (!id || typeof products === "undefined") return;

        const product = products.find(p => p.id === id);
        if (!product) return;

        addToCart(product);
        alert("Product added to cart");
    }

    if (e.target.classList.contains("btn-remove")) {
        const id = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
    }
});

/* CART PAGE RENDERING */
function renderCart() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        updateCartTotal();
        return;
    }

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <div>
                <img src="${item.image}" width="60">
                ${item.name}
            </div>
            <div>$${item.price.toFixed(2)}</div>
            <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-qty">
            <button class="btn-remove" data-id="${item.id}">Remove</button>
        `;

        container.appendChild(row);
    });

    updateCartTotal();
}

/* CART TOTAL */
function updateCartTotal() {
    const totalEl = document.getElementById("cart-total");
    if (!totalEl) return;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalEl.textContent = `$${total.toFixed(2)}`;
}

/* QUANTITY CHANGE */
document.addEventListener("change", (e) => {
    if (e.target.classList.contains("cart-qty")) {
        const id = parseInt(e.target.dataset.id);
        const qty = parseInt(e.target.value);

        const item = cart.find(i => i.id === id);
        if (item && qty > 0) {
            item.quantity = qty;
            saveCart();
            updateCartTotal();
        }
    }
});

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
});
