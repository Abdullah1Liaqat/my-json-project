let url = 'http://localhost:3000/products';
let editId = null;
let deleteId = null;
let editProdcut;
function handleRoute() {
    const hash = window.location.hash;
    if (hash === '#add-product') {
        showForm(null);
    }
    else if (hash === '#edit-product') {
        showForm(editProdcut);
    }
    else {
        showTable();
    }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);


['quantity', 'price'].forEach(id =>
    document.getElementById(id).addEventListener('input', () => {
        const q = document.getElementById('quantity').value;
        const p = document.getElementById('price').value;
        document.getElementById('total').value = (q * p);
    })
);

document.getElementById('saveBtn').addEventListener('click', saveProduct);

document.getElementById('productTable').addEventListener('click', async (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.textContent.trim() == 'Edit') {
        const res = await fetch(`${url}/${id}`);
        editProdcut = await res.json();
        window.location.hash = '#edit-product';
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
    editProdcut = null;
    editId = null;
}

async function loadProducts() {
    const tbody = document.getElementById('productTable');
    try {
        const res = await fetch(url);
        const products = await res.json();
        if (!products.length) {
            tbody.innerHTML = '<tr><td class="text-center text-muted py-3">No products yet.</td></tr>';
            return;
        }
        tbody.innerHTML = products.map((p) => `
        <tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.quantity}</td>
          <td>$${p.pricePerUnit}</td>
          <td>$${p.totalPrice}</td>
          <td>
            <button class="btn btn-sm btn-outline-warning" data-id="${p.id}"><i class="bi bi-pencil"></i> Edit</button>
            <button class="btn btn-sm btn-outline-danger" data-id="${p.id}"><i class="bi bi-trash"></i> Delete</button>
          </td>
        </tr>`).join('');
    }
    catch (err) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger py-3">Failed to load. Make sure server is running.</td></tr>';
    }
}

async function saveProduct() {
    const name = document.getElementById('name').value.trim();
    const quantity = document.getElementById('quantity').value;
    const pricePerUnit = document.getElementById('price').value;
    if (!name || !(quantity) || !(pricePerUnit)) {
        const mineAlert = document.getElementById('mineAlert');
        mineAlert.classList.remove('d-none');
        return;
    }
    const totalPrice = (quantity * pricePerUnit);
    const body = JSON.stringify({ name, quantity, pricePerUnit, totalPrice });
    let modified_url = editId ? `${url}/${editId}` : url;
    const method = editId ? 'PUT' : 'POST';
    await fetch(modified_url, { method, headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body });
    history.pushState('', '', window.location.pathname);
    showTable();
    Swal.fire({
        title: "SUCCESS",
        text: "Record saved successfully!",
        icon: "success",
        toast: "true",
        position: "top-right",
        showConfirmButton: false,
        timer: 3000
    });
    loadProducts();
}
document.getElementById('cancelBtn').addEventListener('click', () => {
    history.pushState('', '', window.location.pathname);
    showTable();
});

loadProducts();