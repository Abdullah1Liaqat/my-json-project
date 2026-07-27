function initFormListeners(editId) {
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
        const saveUrl = editId ? `${url}/${editId}` : url;
        const method = editId ? 'PUT' : 'POST';

        await fetch(saveUrl, {
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