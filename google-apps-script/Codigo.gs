/**
 * ===============================================================================
 * AGRICARL PERÚ S.A.C. - GOOGLE APPS SCRIPT BACKEND PARA FORMULARIO DE CONTACTO
 * ===============================================================================
 * Archivo: Código.gs
 * Descripción: Recibe las consultas del formulario web de www.agricarlperu.com
 *              y las reenvía directamente a tu Gmail oficial de forma 100% gratuita.
 * ===============================================================================
 */

// 1. CONFIGURACIÓN DEL DESTINATARIO
// Coloca aquí tu correo Gmail donde deseas recibir todas las consultas.
var DESTINATARIO_GMAIL = "agricarlperu@gmail.com"; 

/**
 * Manejador de solicitudes POST (recibe los datos enviados con fetch desde la página web)
 */
function doPost(e) {
  try {
    var data = {};
    
    // Extraer los datos enviados en formato JSON o FormData/URL Encoded
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (errJson) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Mapeo seguro de los campos del formulario
    var nombre = (data.name || data.nombre || "").trim();
    var correo = (data.email || data.correo || "").trim();
    var telefono = (data.phone || data.telefono || "").trim() || "No especificado";
    var asunto = (data.subject || data.asunto || "").trim() || "Consulta Comercial / Servicios";
    var mensaje = (data.message || data.mensaje || "").trim();
    
    // Obtener la fecha y hora local de Perú (UTC-5)
    var fechaHora = Utilities.formatDate(new Date(), "America/Lima", "dd/MM/yyyy HH:mm:ss") + " (Hora Perú)";

    // Validación básica
    if (!nombre || !correo || !mensaje) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Faltan campos obligatorios: nombre, correo y mensaje son requeridos."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Asunto del correo que verás en tu bandeja de entrada de Gmail
    var emailSubject = "[AGRICARL WEB] " + asunto + " - " + nombre;

    // Versión en Texto Plano (para clientes de correo antiguos)
    var plainTextBody = 
      "===============================================\n" +
      "NUEVA CONSULTA DESDE EL PORTAL WEB DE AGRICARL\n" +
      "===============================================\n\n" +
      "• Remitente: " + nombre + "\n" +
      "• Correo Electrónico: " + correo + "\n" +
      "• Teléfono / WhatsApp: " + telefono + "\n" +
      "• Asunto: " + asunto + "\n" +
      "• Fecha y Hora: " + fechaHora + "\n\n" +
      "-----------------------------------------------\n" +
      "MENSAJE:\n" +
      mensaje + "\n" +
      "-----------------------------------------------\n\n" +
      "Nota: Puedes responder directamente a este correo haciendo clic en 'Responder' en Gmail.\n" +
      "AGRICARL PERÚ S.A.C. · RUC: 20611291001";

    // Plantilla HTML profesional y estética con la identidad de AGRICARL
    var htmlBody = 
      '<!DOCTYPE html>' +
      '<html>' +
      '<head>' +
      '  <meta charset="utf-8">' +
      '  <style>' +
      '    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }' +
      '    .email-wrapper { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }' +
      '    .header { background: linear-gradient(135deg, #14231b 0%, #064e3b 50%, #059669 100%); padding: 32px 28px; text-align: center; color: #ffffff; }' +
      '    .badge { display: inline-block; background: rgba(255,255,255,0.18); color: #a7f3d0; padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; font-family: monospace; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; }' +
      '    .title { margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.5px; color: #ffffff; text-transform: uppercase; }' +
      '    .subtitle { margin: 6px 0 0; font-size: 13px; color: #d1fae5; }' +
      '    .content { padding: 32px 28px; }' +
      '    .alert-banner { background: #ecfdf5; border-left: 4px solid #059669; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px; font-size: 13px; color: #065f46; font-weight: 500; }' +
      '    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }' +
      '    .data-table td { padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }' +
      '    .data-label { width: 35%; color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }' +
      '    .data-value { width: 65%; color: #0f172a; font-weight: 600; }' +
      '    .message-container { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-top: 10px; }' +
      '    .message-title { font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }' +
      '    .message-text { font-size: 14px; line-height: 1.65; color: #334155; white-space: pre-wrap; word-break: break-word; }' +
      '    .reply-action { margin-top: 28px; text-align: center; }' +
      '    .reply-button { display: inline-block; background: #059669; color: #ffffff !important; padding: 14px 28px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; letter-spacing: 0.5px; box-shadow: 0 4px 10px rgba(5,150,105,0.3); }' +
      '    .footer { background: #14231b; padding: 22px; text-align: center; font-size: 12px; color: #94a3b8; }' +
      '    .footer p { margin: 4px 0; }' +
      '    .footer a { color: #34d399; text-decoration: none; }' +
      '  </style>' +
      '</head>' +
      '<body>' +
      '  <div class="email-wrapper">' +
      '    <div class="header">' +
      '      <span class="badge">NUEVO MENSAJE WEB</span>' +
      '      <h1 class="title">AGRICARL PERÚ S.A.C.</h1>' +
      '      <p class="subtitle">RUC: 20611291001 · Portal Oficial www.agricarlperu.com</p>' +
      '    </div>' +
      '    <div class="content">' +
      '      <div class="alert-banner">' +
      '        Has recibido una nueva consulta de un cliente potencial a través del sitio web.' +
      '      </div>' +
      '      <table class="data-table">' +
      '        <tr>' +
      '          <td class="data-label">Remitente:</td>' +
      '          <td class="data-value">' + nombre + '</td>' +
      '        </tr>' +
      '        <tr>' +
      '          <td class="data-label">Correo Electrónico:</td>' +
      '          <td class="data-value"><a href="mailto:' + correo + '" style="color: #059669; text-decoration: none;">' + correo + '</a></td>' +
      '        </tr>' +
      '        <tr>' +
      '          <td class="data-label">Teléfono / WhatsApp:</td>' +
      '          <td class="data-value">' + telefono + '</td>' +
      '        </tr>' +
      '        <tr>' +
      '          <td class="data-label">Asunto:</td>' +
      '          <td class="data-value">' + asunto + '</td>' +
      '        </tr>' +
      '        <tr>' +
      '          <td class="data-label">Fecha y Hora:</td>' +
      '          <td class="data-value" style="font-family: monospace; font-size: 12px; color: #64748b;">' + fechaHora + '</td>' +
      '        </tr>' +
      '      </table>' +
      '      <div class="message-container">' +
      '        <div class="message-title">Mensaje del Interesado:</div>' +
      '        <div class="message-text">' + mensaje + '</div>' +
      '      </div>' +
      '      <div class="reply-action">' +
      '        <a href="mailto:' + correo + '?subject=' + encodeURIComponent('Re: ' + asunto + ' - AGRICARL PERÚ') + '" class="reply-button">' +
      '          Responder Directamente a ' + nombre +
      '        </a>' +
      '      </div>' +
      '    </div>' +
      '    <div class="footer">' +
      '      <p><strong>AGRICARL PERÚ S.A.C.</strong> · Amazonía Peruana</p>' +
      '      <p>Al hacer clic en "Responder" en tu Gmail, le escribirás directamente a <em>' + correo + '</em>.</p>' +
      '    </div>' +
      '  </div>' +
      '</body>' +
      '</html>';

    // Envío del correo usando el servicio nativo MailApp de Google Apps Script
    // El parámetro "replyTo" permite responderle directamente al visitante
    MailApp.sendEmail({
      to: DESTINATARIO_GMAIL,
      subject: emailSubject,
      replyTo: correo,
      htmlBody: htmlBody,
      body: plainTextBody
    });

    // Retornar respuesta exitosa en JSON
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "¡Mensaje recibido y enviado con éxito a tu bandeja de Gmail!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Manejo de errores en caso de fallo
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Manejador GET opcional para verificar rápidamente que el script está publicado y activo
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    service: "AGRICARL Webhook Google Apps Script",
    recipient: DESTINATARIO_GMAIL,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
