
console.log("NOIR FASHION STORE загружен!");

document.addEventListener("DOMContentLoaded", () => {

    const products = [
        {
            id: 1,
            name: "OVERSIZED T-SHIRT",
            category: "Футболки",
            price: 3990,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85"
        },
        {
            id: 2,
            name: "BLACK HOODIE",
            category: "Худи",
            price: 7990,
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=85"
        },
        {
            id: 3,
            name: "URBAN JACKET",
            category: "Куртки",
            price: 11990,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=85"
        },
        {
            id: 4,
            name: "WIDE LEG PANTS",
            category: "Брюки",
            price: 5990,
            image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=85"
        },
        {
            id: 5,
            name: "PREMIUM T-SHIRT",
            category: "Футболки",
            price: 4490,
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85"
        },
        {
            id: 6,
            name: "STREET HOODIE",
            category: "Худи",
            price: 8490,
            image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=85"
        }
    ];

    const productsGrid = document.querySelector(".products-grid");
    const cartButton = document.getElementById("cartButton");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutButton = document.getElementById("checkoutButton");
    const noirNotification = document.getElementById("noirNotification");
let notificationTimer;

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("noirCart")) || [];
    } catch (error) {
        cart = [];
    }

    function formatPrice(price) {
        return price.toLocaleString("ru-RU") + " ₽";
    }
    function showNotification() {
    noirNotification.classList.add("show");

    clearTimeout(notificationTimer);

    notificationTimer = setTimeout(() => {
        noirNotification.classList.remove("show");
    }, 2200);
}
let selectedCategory = "all";

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        renderProducts();
    });
});
    function renderProducts() {
        const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

productsGrid.innerHTML = filteredProducts.map(product => `
            <article class="product-card" data-id="${product.id}">
                <a href="product.html?id=${product.id}" class="product-image">
    <img src="${product.image}" alt="${product.name}" loading="lazy">
</a>

                <div class="product-info">
                    <span>${product.category}</span>
                    <h3>
    <a href="product.html?id=${product.id}" class="product-name-link">
        ${product.name}
    </a>
</h3>
                    <p>${formatPrice(product.price)}</p>

                    <button class="add-to-cart" data-id="${product.id}">
                        ДОБАВИТЬ В КОРЗИНУ +
                    </button>
                </div>
            </article>
        `).join("");
    }

    function saveCart() {
        localStorage.setItem("noirCart", JSON.stringify(cart));
    }

    function renderCart() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        cartCount.textContent = totalItems;
        cartTotal.textContent = formatPrice(totalPrice);

        if (cart.length === 0) {
            cartItems.innerHTML = "<p class='empty-cart'>Корзина пока пуста</p>";
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">
                    <h3>${item.name}</h3>
<p>Размер: ${item.size || "Не выбран"}</p>
<p>${formatPrice(item.price)}</p>

                    <div class="quantity-controls">
                        <button class="quantity-minus" data-id="${item.id}">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-plus" data-id="${item.id}">+</button>
                    </div>
                </div>

                <button class="remove-item" data-id="${item.id}">×</button>
            </div>
        `).join("");
    }

    productsGrid.addEventListener("click", (event) => {
        const button = event.target.closest(".add-to-cart");

        if (!button) return;

        const productId = Number(button.dataset.id);
        const product = products.find(item => item.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart();
        renderCart();
        showNotification();

        button.textContent = "ДОБАВЛЕНО ✓";

        setTimeout(() => {
            button.textContent = "ДОБАВИТЬ В КОРЗИНУ +";
        }, 1000);
    });

    cartButton.addEventListener("click", () => {
        cartOverlay.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        cartOverlay.classList.remove("active");
    });

    cartOverlay.addEventListener("click", (event) => {
        if (event.target === cartOverlay) {
            cartOverlay.classList.remove("active");
        }
    });

    cartItems.addEventListener("click", (event) => {
        const id = Number(event.target.dataset.id);

        if (!id) return;

        const item = cart.find(product => product.id === id);

        if (event.target.classList.contains("quantity-plus")) {
            item.quantity++;
        }

        if (event.target.classList.contains("quantity-minus")) {
            item.quantity--;

            if (item.quantity <= 0) {
                cart = cart.filter(product => product.id !== id);
            }
        }

        if (event.target.classList.contains("remove-item")) {
            cart = cart.filter(product => product.id !== id);
        }

        saveCart();
        renderCart();
    });

    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Твоя корзина пуста!");
            return;
        }

        alert("Это демонстрационный магазин. Реальное оформление заказов пока не подключено.");
    });

 renderProducts();
renderCart();

// Анимация появления при прокрутке

const revealElements = document.querySelectorAll(
    ".section-heading, .section-label, .about h2, .about p, .product-card"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

console.log("Каталог, корзина и анимации NOIR загружены!");

});
