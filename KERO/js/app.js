let cart = JSON.parse(localStorage.getItem("keroCart")) || [];
let favorites = JSON.parse(localStorage.getItem("keroFavorites")) || [];

function saveData() {
    localStorage.setItem("keroCart", JSON.stringify(cart));
    localStorage.setItem("keroFavorites", JSON.stringify(favorites));
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveData();
    updateCartCount();

    alert(name + " foi adicionado ao carrinho.");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveData();
    location.reload();
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveData();
    location.reload();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = count;
    });
}

function addFavorite(name) {
    if (!favorites.includes(name)) {
        favorites.push(name);
        saveData();
        alert(name + " foi adicionado aos favoritos.");
    } else {
        alert(name + " já está nos favoritos.");
    }
}

function searchProducts() {
    const input = document.getElementById("searchInput");

    if (!input) return;

    const value = input.value.trim();

    if (value) {
        window.location.href =
            "catalogo.html?search=" + encodeURIComponent(value);
    }
}

function finalizarCompra() {
    if (cart.length === 0) {
        alert("O seu carrinho está vazio.");
        return;
    }

    window.location.href = "encomendas.html";
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const search = document.getElementById("searchInput");

    if (search) {
        search.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                searchProducts();
            }
        });
    }
});