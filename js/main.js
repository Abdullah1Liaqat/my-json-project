const PRODUCTS_URL = 'http://localhost:3000/products';

function loadScript(src, callback) {
    if (document.querySelector(`script[src="${src}"]`)) {
        if (callback) {
            callback();
        }
        if (`${src}` === 'js/listing.js') {
            load();
        }
        return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);

}
async function handleRoute() {
    document.getElementById('errorPage').classList.add('d-none');
    document.getElementById('tablePage').classList.add('d-none');
    document.getElementById('formPage').classList.add('d-none');
    const hash = window.location.hash;
    if (hash === '#/products') {
        loadScript('js/listing.js');
    } else if (hash === '#/products/create') {
        loadScript('js/save.js', () => create());
    } else if (hash.includes('edit')) {
        const parts = hash.split('/');
        const id = parts[2];
        loadScript('js/save.js', () => Edit(id));
    }
    else {
        document.getElementById('tablePage').classList.add('d-none');
        document.getElementById('formPage').classList.add('d-none');
        document.getElementById('errorPage').classList.remove('d-none');
    }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.location.hash = '#/products';
    }
    handleRoute();
});