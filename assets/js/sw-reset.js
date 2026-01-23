// sw-reset.js
try {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.unregister();
                console.log('ServiceWorker unregistered:', registration);
            }
        }).catch(() => {
            // Silenciamos errores internos
        });
    }
} catch (e) {
    // Silencio total en protocolos no compatibles (file://)
}
