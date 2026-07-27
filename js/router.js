function handleRoute() {
    const hash = window.location.hash;
    if (hash === '#/products/add') {
        showForm(null);
    } else if (hash.includes('edit')) {
        const id = hash.split('/')[2];
        fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(product => showForm(product));
    } else {
        window.location.hash = '#/products';
        showTable();
    }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);