// Ambil data keranjang dari localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseInt(localStorage.getItem('total')) || 0;

// Fungsi render ringkasan pesanan dengan tombol hapus
function renderOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.name} - Rp ${item.price}
            <button class="btn btn-sm btn-danger remove-item" data-index="${index}">
                <i class="bi bi-x"></i> Hapus
            </button>
        `;
        orderSummary.appendChild(li);
    });
    document.getElementById('total-amount').textContent = total;
}

// Event listener untuk hapus item
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
        const index = parseInt(e.target.closest('.remove-item').dataset.index);
        const removedItem = cart.splice(index, 1)[0]; // Hapus item dari array
        total -= removedItem.price; // Kurangi total
        renderOrderSummary(); // Re-render ringkasan
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        localStorage.setItem('total', total);
    }
});

// Inisialisasi render
renderOrderSummary();

// Simulasi submit pembayaran (tetap sama)
document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const method = document.getElementById('payment-method').value;
    
    if (method === 'transfer') {
        document.getElementById('transfer-total').textContent = total;
        const transferModal = new bootstrap.Modal(document.getElementById('transfer-modal'));
        transferModal.show();
    } else {
        showReceipt();
    }
});

// Fungsi upload bukti (tetap sama)
document.getElementById('upload-proof').addEventListener('click', () => {
    const fileInput = document.getElementById('proof-upload');
    const file = fileInput.files[0];
    if (!file) {
        alert('Pilih file bukti transfer terlebih dahulu!');
        return;
    }
    alert(`Bukti transfer "${file.name}" berhasil diupload! (Simulasi)`);
    document.getElementById('upload-status').classList.remove('d-none');
    document.getElementById('confirm-transfer').classList.remove('d-none');
});

// Konfirmasi transfer (tetap sama)
document.getElementById('confirm-transfer').addEventListener('click', () => {
    bootstrap.Modal.getInstance(document.getElementById('transfer-modal')).hide();
    showReceipt();
});

// Fungsi tampilkan nota (tetap sama)
function showReceipt() {
    const orderId = 'ORD-' + Date.now();
    const orderDate = new Date().toLocaleString();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const method = document.getElementById('payment-method').value;
    
    document.getElementById('order-id').textContent = orderId;
    document.getElementById('order-date').textContent = orderDate;
    document.getElementById('receipt-name').textContent = name;
    document.getElementById('receipt-address').textContent = address;
    document.getElementById('receipt-email').textContent = email;
    document.getElementById('receipt-method').textContent = method;
    document.getElementById('receipt-total').textContent = total;
    
    const receiptItems = document.getElementById('receipt-items');
    receiptItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${item.name} - Rp ${item.price}`;
        receiptItems.appendChild(li);
    });
    
    const receiptModal = new bootstrap.Modal(document.getElementById('receipt-modal'));
    receiptModal.show();
    
    localStorage.clear();
}