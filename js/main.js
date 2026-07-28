const PRODUCTS_URL = 'http://localhost:3000/products';

function loadScript(src, callback) {
    if (document.querySelector(`script[src="${src}"]`)) {
        if (callback) {
            callback();
        }
        if (`${src}` === 'js/load.js') {
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
    const hash = window.location.hash;
    if (hash === '#/products') {
        loadScript('js/load.js');
    } else if (hash === '#/products/create') {
        loadScript('js/save.js', () => create());
    } else if (hash.includes('edit')) {
        const parts = hash.split('/');
        const id = parts[2];
        loadScript('js/save.js', () => Edit(id));
    }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.location.hash = '#/products';
    }
    handleRoute();
});