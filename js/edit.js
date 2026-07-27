function initEdit(id) {
    document.getElementById('tablePage').classList.add('d-none');
    document.getElementById('formPage').classList.remove('d-none');
    document.getElementById('mineAlert').classList.add('d-none');

    fetch(`${url}/${id}`)
        .then(res => res.json())
        .then(product => {
            document.getElementById('formTitle').textContent = 'Edit Product';
            document.getElementById('name').value = product.name;
            document.getElementById('quantity').value = product.quantity;
            document.getElementById('price').value = product.pricePerUnit;
            document.getElementById('total').value = product.totalPrice;
            initFormListeners(product.id);
        });
}