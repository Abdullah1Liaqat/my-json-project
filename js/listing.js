function load() {
    loadProducts();
    initTableActions();
}
function loadProducts() {
    const tbody = document.getElementById('productTable');
    document.getElementById('tablePage').classList.remove('d-none');
    document.getElementById('formPage').classList.add('d-none');
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Loading...</td></tr>';
    fetch(PRODUCTS_URL)
        .then(res => res.json())
        .then(products => {
            if (!products.length) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-3">No products yet.</td></tr>';
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
                <button class="btn btn-sm btn-outline-danger" data-id="${p.id}" name="${p.name}"><i class="bi bi-trash"></i> Delete</button>
              </td>
            </tr>`).join('');
        })
        .catch(() => {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger py-3">Failed to load. Make sure server is running.</td></tr>';
        });
}

function initTableActions() {
    document.getElementById('productTable').addEventListener('click', async (event) => {
        const btn = event.target.closest('button');
        if (!btn) return;
        const id = btn.dataset.id;
        const name =btn.name;

        if (btn.textContent.trim() === 'Edit') {
            window.location.hash = `#/products/${id}/edit`;
        }

        if (btn.textContent.trim() === 'Delete') {
            const result = await Swal.fire({
                title: 'Confirm Deletion',
                confirmButtonColor: "#FF0000",
                text: `Do you want to delete ${name}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                toast: true,
                position: "top-right"
            });
            if (result.isConfirmed) {
                await fetch(`${PRODUCTS_URL}/${id}`, { method: 'DELETE' });
                Swal.fire({
                    title: 'Deleted!',
                    icon: 'success',
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 3000
                });
                loadProducts();
            }

        }
    });
}
load();