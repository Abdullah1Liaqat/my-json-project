const url = 'http://localhost:3000/products';

function loadScript(src, callback) {
    if (document.querySelector(`script[src="${src}"]`)) {
        callback && callback();
        return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}

function handleRoute() {
    const hash = window.location.hash || '#/products';
    if (hash === '#/products') {
        loadScript('js/load.js', () => loadProducts());
    } else if (hash === '#/products/add') {
        loadScript('js/add.js', () => initAdd());
    } else if (hash.includes('edit')) {
        const id = hash.split('/')[2];
        loadScript('js/edit.js', () => initEdit(id));
    }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);