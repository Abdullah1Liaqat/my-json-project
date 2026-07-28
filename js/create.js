function create() {
    document.getElementById('tablePage').classList.add('d-none');
    document.getElementById('formPage').classList.remove('d-none');
    document.getElementById('formTitle').textContent = 'Add Product';
    document.getElementById('mineAlert').classList.add('d-none');
    loadScript('js/save.js', () => formListeners(null));
}