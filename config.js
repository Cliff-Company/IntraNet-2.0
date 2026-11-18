// =====================================================
//  IntraNet 2.0 — Configuración
//  Pega aquí la URL de tu Web App de Google Apps Script
//  (Implementar → Administrar implementaciones → URL)
// =====================================================
window.INTRANET_CONFIG = {
    API_URL: 'PEGA_AQUI_LA_URL_DE_TU_WEB_APP'
};

// Utilidades compartidas por index.html e intranet.html
window.Intranet = (function () {
    const CLAVE = 'intranet2_sesion';

    async function api(accion, datos) {
        const url = window.INTRANET_CONFIG.API_URL;
        if (!url || url.indexOf('PEGA_AQUI') === 0) {
            return { ok: false, error: 'Falta configurar la URL del servidor en config.js' };
        }
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(Object.assign({ accion: accion }, datos || {}))
            });
            return await res.json();
        } catch (e) {
            return { ok: false, error: 'No se pudo conectar con el servidor. Revisa tu conexión.' };
        }
    }

    function guardarSesion(r) {
        try { localStorage.setItem(CLAVE, JSON.stringify({ token: r.token, expira: r.expira, usuario: r.usuario })); } catch (e) {}
    }
    function leerSesion() {
        try {
            const s = JSON.parse(localStorage.getItem(CLAVE) || 'null');
            if (!s || !s.token) return null;
            if (s.expira && Date.now() > s.expira) { borrarSesion(); return null; }
            return s;
        } catch (e) { return null; }
    }
    function borrarSesion() { try { localStorage.removeItem(CLAVE); } catch (e) {} }

    return { api: api, guardarSesion: guardarSesion, leerSesion: leerSesion, borrarSesion: borrarSesion };
})();
