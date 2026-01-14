// === Products Data ===
const products = [
    { id: 1, name: "Elegant Fascinator", price: 25, image: "assets/images/fascinator1.png", category: "Bridal Accessories", description: "Add elegance to your wedding ensemble with this beautifully crafted fascinator." },
    { id: 2, name: "Bridal Hand-Fan", price: 18, image: "assets/images/bridalfan1.png", category: "Bridal Accessories", description: "Keep cool and stylish with this elegant bridal hand-fan." },
    { id: 3, name: "Perfume Oil - Rose", price: 15, image: "assets/images/perfume2.png", category: "Perfume Oils", description: "Luxurious rose-scented perfume oil." },
    { id: 4, name: "Headband with Pearls", price: 20, image: "assets/images/headband.png", category: "Bridal Accessories", description: "Elegant pearl headband for bridal hairstyles." },
    { id: 5, name: "Perfume Oil - Vanilla", price: 20, image: "assets/images/perfume1.png", category: "Bridal Accessories", description: "Delicate vanilla-scented perfume oil." }
];

// === Cart Utilities ===
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (countEl) {
        const total = getCart().reduce((sum, item) => sum + (item.quantity || 1), 0);
        countEl.textContent = total;
    }
}

// === Render Products on Shop Page ===
const productGrid = document.getElementById("product-grid");
if (productGrid) {
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "category-card";

        card.innerHTML = `
            <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            </a>
            <p>$${product.price.toFixed(2)}</p>
            <button class="btn-primary btn-add-cart" data-id="${product.id}">Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });
}

// === Add to Cart Buttons on Shop Page ===
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-cart")) {
        const id = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === id);
        if (!product) return;

        // Add quantity property if not existing
        const cart = getCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart(cart);
        alert(`${product.name} added to cart!`);
    }
});

// === Product Page Logic ===
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));
if (productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const nameEl = document.getElementById("product-name");
        const categoryEl = document.getElementById("product-category");
        const priceEl = document.getElementById("product-price");
        const descEl = document.getElementById("product-description");
        const imgEl = document.getElementById("product-img");

        if (nameEl) nameEl.textContent = product.name;
        if (categoryEl) categoryEl.textContent = product.category;
        if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
        if (descEl) descEl.textContent = product.description;
        if (imgEl) imgEl.src = product.image;

        const addBtn = document.querySelector(".btn-add-cart");
        if (addBtn) {
            addBtn.dataset.id = product.id; // set id for product page button
        }
    }
}

// Update cart count on page load
updateCartCount();
