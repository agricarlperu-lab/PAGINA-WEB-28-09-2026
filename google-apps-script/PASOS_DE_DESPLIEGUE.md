# Guía Paso a Paso: Desplegar Google Apps Script como Backend Gratuito para Gmail

Esta guía te explica cómo publicar tu script en Google Apps Script en menos de 3 minutos para recibir todas las consultas de la página web de **AGRICARL PERÚ S.A.C.** directamente en tu correo de Gmail, sin costo alguno y sin pagar servidores de correo.

---

### Paso 1: Crear el proyecto en Google Apps Script
1. Abre tu navegador e inicia sesión con tu cuenta de Gmail (ej. `agricarlperu@gmail.com`).
2. Ingresa a: **[https://script.google.com](https://script.google.com)**.
3. Haz clic en el botón superior izquierdo: **"+ Nuevo proyecto"**.
4. En la parte superior, cámbiale el nombre de "Proyecto sin título" a: **"AGRICARL - Formulario Web"**.

---

### Paso 2: Pegar el código
1. En el editor de código, borra cualquier contenido que aparezca en `Código.gs`.
2. Abre el archivo `google-apps-script/Codigo.gs` de este proyecto, copia todo su contenido y pégalo en el editor de Google Apps Script.
3. Verifica la línea 13:
   ```javascript
   var DESTINATARIO_GMAIL = "agricarlperu@gmail.com";
   ```
   *(Si deseas que los correos lleguen a otra cuenta, solo cambia esa dirección)*.
4. Haz clic en el ícono de **Guardar** (ícono de disquete 💾 o presiona `Ctrl + S` / `Cmd + S`).

---

### Paso 3: Desplegar como Aplicación Web (¡Muy Importante!)
1. En la esquina superior derecha, haz clic en el botón azul **"Implementar"** (o *"Deploy"*).
2. Selecciona **"Nueva implementación"** (o *"New deployment"*).
3. Haz clic en el ícono de engranaje ⚙️ al lado izquierdo de "Seleccionar tipo" y elige **"Aplicación web"** (o *"Web app"*).
4. Configura los siguientes campos de forma exacta:
   - **Descripción:** `Formulario Web AGRICARL v1`
   - **Ejecutar como:** Selecciona **"Yo (tu correo de Gmail)"** *(Me)*.
   - **Quién tiene acceso:** Selecciona **"Cualquier usuario"** *(Anyone)*. *(Esto es crucial para que cualquier visitante de tu página pueda enviar mensajes sin necesidad de iniciar sesión en Google)*.
5. Haz clic en el botón azul **"Implementar"**.

---

### Paso 4: Autorizar los permisos (Solo la primera vez)
1. Google te mostrará una ventana emergente que dice *"Se requiere autorización"*. Haz clic en **"Revisar permisos"**.
2. Elige tu cuenta de Gmail.
3. Google mostrará un aviso de advertencia: *"Google no ha verificado esta app"*. **Esto es completamente normal** porque el script fue creado por ti mismo.
4. Haz clic en **"Avanzado"** (o *"Advanced"*) en la parte inferior izquierda.
5. Luego haz clic en el enlace inferior: **"Ir a AGRICARL - Formulario Web (no seguro)"**.
6. En la siguiente pantalla, haz clic en **"Permitir"** (para autorizar que `MailApp` envíe los correos en tu nombre).

---

### Paso 5: Copiar la URL generada
1. Una vez completado, Google te mostrará una ventana con la **URL de la aplicación web**.
2. Tendrá un formato similar a:
   `https://script.google.com/macros/s/AKfycbxAbCdEf123456789.../exec`
3. Haz clic en **"Copiar"**.

---

### Paso 6: URL Integrada en la Aplicación
La URL proporcionada ya ha sido integrada directamente en `src/App.tsx`:
```javascript
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfS1YcGG65LQ1oBVHG5jz9GkCRapyTeI_Uxozu9j1F9ZaV5Y3SsnKmcogWXh06TYomjg/exec";
```

### Comportamiento en producción:
- El formulario envía los datos de forma inmediata y directa a tu Google Apps Script con `mode: "no-cors"`.
- Se genera un respaldo simultáneo en el servidor de AGRICARL.
- El usuario observa la animación **"Enviando..."** con el spinner activado.
- Los campos se limpian inmediatamente y se muestra la pantalla de confirmación.
- Recibes el correo con la plantilla corporativa de AGRICARL y el botón para responder directamente al remitente con un solo clic.
