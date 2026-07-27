let editId = null;
let deleteId = null;

function showForm(product) {
    document.getElementById('mineAlert').classList.add('d-none');
    editId = product ? product.id : null;
    document.getElementById('formTitle').textContent = product ? 'Edit Product' : 'Add Product';
    document.getElementById('name').value = product ? product.name : '';
    document.getElementById('quantity').value = product ? product.quantity : '';
    document.getElementById('price').value = product ? product.pricePerUnit : '';
    document.getElementById('total').value = product ? product.totalPrice : '';
    document.getElementById('tablePage').classList.add('d-none');
    document.getElementById('formPage').classList.remove('d-none');
}

function showTable() {
    document.getElementById('formPage').classList.add('d-none');
    document.getElementById('tablePage').classList.remove('d-none');
    editId = null;
}

['quantity', 'price'].forEach(id =>
    document.getElementById(id).addEventListener('input', () => {
        const q = document.getElementById('quantity').value;
        const p = document.getElementById('price').value;
        document.getElementById('total').value = (q * p);
    })
);

document.getElementById('saveBtn').addEventListener('click', saveProduct);

document.getElementById('cancelBtn').addEventListener('click', () => {
    window.location.hash = '#/products';
});

document.getElementById('productTable').addEventListener('click', async (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;

    if (btn.textContent.trim() == 'Edit') {
        window.location.hash = `#/products/${id}/edit`;
    }

    if (btn.textContent.trim() == 'Delete') {
        deleteId = id;
        const result = await Swal.fire({
            title: 'Confirm Deletion!',
            confirmButtonColor: "#FF0000",
            text: 'Do you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            toast: true,
            position: "top-right"
        });
        if (result.isConfirmed) {
            await fetch(`${url}/${deleteId}`, { method: 'DELETE' });
            loadProducts();
            Swal.fire({
                title: 'Deleted!',
                icon: 'success',
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000
            });
        }
    }
});