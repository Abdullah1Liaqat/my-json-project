const url = 'http://localhost:3000/products';

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
    if (!name || !quantity || !pricePerUnit) {
        document.getElementById('mineAlert').classList.remove('d-none');
        return;
    }
    const totalPrice = quantity * pricePerUnit;
    const body = JSON.stringify({ name, quantity, pricePerUnit, totalPrice });
    const modified_url = editId ? `${url}/${editId}` : url;
    const method = editId ? 'PUT' : 'POST';
    await fetch(modified_url, { method, headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body });
    window.location.hash = '#/products';
    Swal.fire({
        title: "SUCCESS",
        text: "Record saved successfully!",
        icon: "success",
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000
    });
    loadProducts();
}
loadProducts();