let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseInt(localStorage.getItem('total')) || 0;

// Update badge keranjang
function updateCartBadge() {
    document.getElementById('cart-badge').textContent = cart.length;
}

// Filter produk
document.getElementById('category-filter').addEventListener('change', (e) => {
    const category = e.target.value;
    const products = document.querySelectorAll('.product-item');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// Tambah ke keranjang
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);
        
        if (isNaN(price)) {
            alert('Harga tidak valid!');
            return;
        }
        
        cart.push({ id, name, price });
        total += price;
        updateCart();
        updateCartBadge();
    });
});

// Update keranjang
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${item.name} - Rp ${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = total;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
}

// Inisialisasi
updateCart();
updateCartBadge();
