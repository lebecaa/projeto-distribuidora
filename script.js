function changeQuantity(button, change) {
    const quantitySpan = button.parentNode.querySelector('.quantity');
    let currentQuantity = parseInt(quantitySpan.textContent);

    currentQuantity = Math.max(0, currentQuantity + change);

    quantitySpan.textContent = currentQuantity;
}

function addToCart(productName, price, button) {
    const quantitySelector = button.parentNode.querySelector('.quantity');
    const quantity = parseInt(quantitySelector.textContent);

    if (quantity > 0) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.qty += quantity;
        } else {
            cart.push({ name: productName, price: price, qty: quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${quantity} unidade(s) de ${productName} foram adicionadas ao carrinho.`);

        quantitySelector.textContent = '0';


        updateCartBadge();
    } else {
        alert('Por favor, selecione uma quantidade antes de adicionar ao carrinho.');
    }
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const cartBadge = document.getElementById('cart-badge');
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
