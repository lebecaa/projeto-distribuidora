localStorage.removeItem('cart');

const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal-price');
const totalElement = document.getElementById('total-price');
const deliveryLocation = document.getElementById('delivery-location');
let subtotalPrice = 0;
let totalPrice = 0;

function updatePrices() {
    const deliveryFee = parseFloat(deliveryLocation.value) || 0;
    totalPrice = subtotalPrice + deliveryFee;
    subtotalElement.textContent = subtotalPrice.toFixed(2);
    totalElement.textContent = totalPrice.toFixed(2);
}



cartItems.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
        <span>${item.name}</span>
        <span>Qtd: ${item.qty}</span>
        <span>R$ ${(item.price * item.qty).toFixed(2)}</span>
        <button onclick="removeFromCart(${index})">Remover</button>
    `;
    cartContainer.appendChild(itemElement);
    subtotalPrice += item.price * item.qty;
});

updatePrices();


deliveryLocation.addEventListener('change', updatePrices);

function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.location.reload();
}


document.getElementById('order-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = this.querySelector('input[placeholder="Nome completo"]').value;
    const endereco = this.querySelector('input[placeholder="Endereço"]').value;
    const telefone = this.querySelector('input[placeholder="Telefone"]').value;
    const deliveryFee = parseFloat(deliveryLocation.value) || 0;


    let mensagem = `Pedido de ${nome}\nEndereço: ${endereco}\nTelefone: ${telefone}\n`;
    cartItems.forEach(item => {
        mensagem += `\n${item.qty}x ${item.name} - R$ ${(item.price * item.qty).toFixed(2)}`;
    });
    mensagem += `\nSubtotal: R$ ${subtotalPrice.toFixed(2)}`;
    mensagem += `\nEntrega: R$ ${deliveryFee.toFixed(2)}`;
    mensagem += `\nTotal: R$ ${(subtotalPrice + deliveryFee).toFixed(2)}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=558699854956&text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
});
