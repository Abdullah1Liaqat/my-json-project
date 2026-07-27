function initAdd() {
    document.getElementById('tablePage').classList.add('d-none');
    document.getElementById('formPage').classList.remove('d-none');
    document.getElementById('formTitle').textContent = 'Add Product';
    document.getElementById('mineAlert').classList.add('d-none');
    document.getElementById('name').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    document.getElementById('total').value = '';

    initFormListeners(null);
}