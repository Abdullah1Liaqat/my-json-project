function formListeners(editId) {
    ['quantity', 'price'].forEach(id =>
        document.getElementById(id).addEventListener('input', () => {
            const q = document.getElementById('quantity').value;
            const p = document.getElementById('price').value;
            document.getElementById('total').value = q * p;
        })
    );
    document.getElementById('cancelBtn').onclick = () => {
        window.location.hash = '#/products';
    };
    document.getElementById('saveBtn').onclick = async () => {
        const name = document.getElementById('name').value.trim();
        const quantity = document.getElementById('quantity').value;
        const pricePerUnit = document.getElementById('price').value;

        if (!name || !quantity || !pricePerUnit) {
            document.getElementById('mineAlert').classList.remove('d-none');
            return;
        }
        const totalPrice = quantity * pricePerUnit;
        const body = JSON.stringify({ name, quantity, pricePerUnit, totalPrice });
        const savePRODUCTS_URL = editId ? `${PRODUCTS_URL}/${editId}` : PRODUCTS_URL;
        const method = editId ? 'PUT' : 'POST';

        await fetch(savePRODUCTS_URL, {
            method,
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body
        });
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
    };
}
async function Edit(id) {
    document.getElementById('tablePage').classList.add('d-none');
    document.getElementById('formPage').classList.remove('d-none');
    document.getElementById('mineAlert').classList.add('d-none');

    fetch(`${PRODUCTS_URL}/${id}`)
        .then(res => res.json())
        .then(product => {
            if (product.name === undefined) {
                document.getElementById('tablePage').classList.add('d-none');
                document.getElementById('formPage').classList.add('d-none');
                document.getElementById('errorPage').classList.remove('d-none');
                return;
            }
            document.getElementById('formTitle').textContent = 'Edit Product';
            document.getElementById('name').value = product.name;
            document.getElementById('quantity').value = product.quantity;
            document.getElementById('price').value = product.pricePerUnit;
            document.getElementById('total').value = product.totalPrice;
            formListeners(product.id);
        });
}
function create() {
    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('name').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    document.getElementById('total').value = '';
    document.getElementById('tablePage').classList.add('d-none');
    document.getElementById('formPage').classList.remove('d-none');
    document.getElementById('formTitle').textContent = 'Add Product';
    document.getElementById('mineAlert').classList.add('d-none');
    formListeners(null);
}