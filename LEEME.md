# IntraNet 2.0 — Guía de instalación

Registro con correo, verificación por código, recuperación de contraseña, roles editables y chat de Zendesk con usuarios **autenticados**.

## Qué contiene

| Archivo | Qué es |
|---|---|
| `index.html` | Acceso: iniciar sesión, crear cuenta, verificar correo y recuperar contraseña |
| `intranet.html` | La intranet (igual a la versión 1, con sesiones seguras y Zendesk autenticado) |
| `config.js` | Aquí va la URL de tu servidor (paso 4) |
| `zoho-gracias.html` | Confirmación del formulario de Zoho Desk |
| `servidor/Code.gs` | El servidor. **No se sube a GitHub**: se pega en Google Apps Script |

Del repositorio original copia también la carpeta **`img/`** y el archivo **`flipbook.html`**.

---

## 1. Crear la base de datos y el servidor (Google)

1. Crea una hoja nueva en Google Sheets llamada **IntraNet 2.0 – Usuarios**. Usa la cuenta de Google que enviará los correos con los códigos.
2. En la hoja: **Extensiones → Apps Script**.
3. Borra lo que aparece y pega todo el contenido de `servidor/Code.gs`. Guarda.
4. Arriba, elige la función **`configurarHojas`** y dale **Ejecutar**. Google te pedirá permisos (hoja y envío de correo): acéptalos. Se crearán las pestañas *Usuarios, Codigos, Sesiones y Accesos*.

## 2. Crear la clave de firma en Zendesk

1. Zendesk → **Centro de administración → Cuenta → Seguridad → Autenticación de usuarios finales → pestaña Mensajería**.
2. **Crear clave**. Copia el **ID de la clave** (empieza con `app_`) y el **secreto**. El secreto solo se muestra una vez.
3. ⚠️ El secreto **nunca** va en los archivos HTML ni en GitHub. Solo en el paso 3.

## 3. Configurar el servidor

En Apps Script: **⚙️ Configuración del proyecto → Propiedades de la secuencia de comandos**. Llena:

| Propiedad | Valor |
|---|---|
| `ZENDESK_KID` | El ID de la clave (`app_...`) |
| `ZENDESK_SECRET` | El secreto de la clave |
| `DOMINIOS_PERMITIDOS` | `cliff.com.mx` (solo esos correos podrán registrarse; vacío = cualquiera) |
| `ADMINS` | Tu correo, por ejemplo `luis@cliff.com.mx` (al registrarse recibe rol admin) |

## 4. Publicar el servidor

1. **Implementar → Nueva implementación → ⚙️ Tipo: Aplicación web**.
2. *Ejecutar como:* **Yo**. *Quién tiene acceso:* **Cualquier usuario**.
3. **Implementar** y copia la **URL de la aplicación web**.
4. Pégala en `config.js`, en lugar de `PEGA_AQUI_LA_URL_DE_TU_WEB_APP`.

> Si después cambias `Code.gs`: **Implementar → Administrar implementaciones → ✏️ → Versión: Nueva versión**. La URL se mantiene.

## 5. Subir a GitHub Pages

1. Crea un repositorio nuevo llamado **`IntraNet-2.0`** (GitHub no permite espacios).
2. Sube `index.html`, `intranet.html`, `config.js`, `zoho-gracias.html`, la carpeta `img/` y `flipbook.html`.
3. **Settings → Pages →** rama `main`, carpeta `/ (root)` → **Save**.
4. Tu intranet quedará en: `https://cliff-company.github.io/IntraNet-2.0/`

## 6. Probar

1. Entra, ve a **Crear cuenta** y regístrate con tu correo.
2. Te llega un código de 6 dígitos (revisa spam la primera vez). Escríbelo y entrarás a la intranet.
3. Abre el globito **Zendesk** y escribe un mensaje. En Zendesk, el cliente aparecerá con su **nombre y correo verificado**, sin que el chat se los pida.

---

## Administración diaria

- **Cambiar el rol de alguien:** en la pestaña *Usuarios*, columna `rol`, escribe `admin`, `directivo`, `comite`, `adn` o `empleado`. Se aplica la próxima vez que esa persona abra la intranet.
- **Desactivar a alguien:** en la columna `activo`, pon `FALSE`. Pierde el acceso de inmediato.
- **Historial de accesos:** pestaña *Accesos* (registros, inicios de sesión, intentos fallidos, salidas).
- **Seguridad incluida:** contraseñas cifradas, bloqueo de 15 min tras 5 intentos fallidos, sesiones de 12 horas, códigos de 15 minutos.
- **Límite de correos:** Google permite unos 100 correos al día con cuenta personal y unos 1,500 con Google Workspace.
