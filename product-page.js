
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

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    const product = products.find(item => item.id === productId);

    const productImage = document.getElementById("productImage");
    const productName = document.getElementById("productName");
    const productCategory = document.getElementById("productCategory");
    const productPrice = document.getElementById("productPrice");
    const addButton = document.getElementById("detailAddButton");
    let selectedSize = null;

const sizeButtons = document.querySelectorAll(".size-option");

sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
        sizeButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedSize = button.dataset.size;
    });
});

    function formatPrice(price) {
        return price.toLocaleString("ru-RU") + " ₽";
    }

    if (!product) {
        productName.textContent = "ТОВАР НЕ НАЙДЕН";
        productCategory.textContent = "Вернитесь в каталог NOIR.";
        productImage.style.display = "none";
        productPrice.textContent = "";
        addButton.style.display = "none";
        return;
    }

    productImage.src = product.image;
    productImage.alt = product.name;

    productName.textContent = product.name;
    productCategory.textContent = product.category;
    productPrice.textContent = formatPrice(product.price);

    addButton.addEventListener("click", () => {
        if (!selectedSize) {
    addButton.textContent = "ВЫБЕРИ РАЗМЕР!";

    setTimeout(() => {
        addButton.textContent = "ДОБАВИТЬ В КОРЗИНУ";
    }, 1500);

    return;
}

        let cart = [];

        try {
            cart = JSON.parse(localStorage.getItem("noirCart")) || [];
        } catch (error) {
            cart = [];
        }

        const cartItem = cart.find(item =>
    item.id === product.id && item.size === selectedSize
);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({
    ...product,
    size: selectedSize,
    quantity: 1
});
        }

        localStorage.setItem("noirCart", JSON.stringify(cart));

        addButton.textContent = "ДОБАВЛЕНО ✓";

        setTimeout(() => {
            addButton.textContent = "ДОБАВИТЬ В КОРЗИНУ";
        }, 1200);

    });

});
