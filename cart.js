let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseInt(localStorage.getItem('total')) || 0;

// Fungsi render tabel keranjang
function renderCart() {
    const cartTableBody = document.getElementById('cart-table-body');
    cartTableBody.innerHTML = '';
    
    if (cart.length === 0) {
        document.getElementById('empty-cart').classList.remove('d-none');
        document.getElementById('total').textContent = '0';
        document.getElementById('cart-badge').textContent = '0';
        return;
    } else {
        document.getElementById('empty-cart').classList.add('d-none');
    }
    
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rp ${item.price}</td>
            <td>
                <input type="number" class="form-control quantity-input" data-index="${index}" value="${item.quantity || 1}" min="1">
            </td>
            <td>Rp <span class="item-total">${(item.price * (item.quantity || 1))}</span></td>
            <td>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">
                    <i class="bi bi-trash"></i> Hapus
                </button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });
    
    updateTotal();
    updateCartBadge();
}

// Update total
function updateTotal() {
    total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    document.getElementById('total').textContent = total;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
}

// Update badge
function updateCartBadge() {
    document.getElementById('cart-badge').textContent = cart.length;
}

// Event listener untuk update jumlah
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('quantity-input')) {
        const index = parseInt(e.target.dataset.index);
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            const itemTotal = cart[index].price * newQuantity;
            e.target.closest('tr').querySelector('.item-total').textContent = itemTotal;
            updateTotal();
        }
    }
});

// Event listener untuk hapus item
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
        const index = parseInt(e.target.closest('.remove-item').dataset.index);
        cart.splice(index, 1);
        renderCart();
    }
});

// Tombol update keranjang (opsional, untuk konfirmasi)
document.getElementById('update-cart').addEventListener('click', () => {
    alert('Keranjang telah diupdate!');
    renderCart();
});

// Inisialisasi
renderCart();