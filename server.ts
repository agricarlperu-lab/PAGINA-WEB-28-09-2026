import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const MEDIA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'persistedMedia.json');

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  deliveryStatus: 'sent_resend' | 'sent_sendgrid' | 'sent_smtp' | 'received_server_inbox' | 'failed';
  errorDetails?: string;
}

const serverInbox: ContactInquiry[] = [];
const OFFICIAL_EMAIL = process.env.OFFICIAL_CONTACT_EMAIL || 'operaciones@agricarlperu.com';

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(name);
  if (idx !== -1 && idx + 1 < process.argv.length) {
    return process.argv[idx + 1];
  }
  return undefined;
}

async function startServer() {
  const app = express();
  const PORT = Number(getArg('--port')) || Number(process.env.PORT) || 3000;
  const HOST = getArg('--host') || process.env.HOST || '0.0.0.0';

  // Support JSON payloads with images (up to 50mb)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Serve static public assets (including background videos with Range headers)
  app.use('/videos', express.static(path.join(process.cwd(), 'public', 'videos')));
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Media persistence endpoints (ensures uploaded photos/backgrounds are saved permanently to disk and live on the published app)
  app.get('/api/media', (_req, res) => {
    try {
      if (fs.existsSync(MEDIA_FILE_PATH)) {
        const fileContent = fs.readFileSync(MEDIA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent);
        return res.json({ success: true, ...data });
      }
    } catch (e: any) {
      console.warn('Error reading persistedMedia.json:', e?.message);
    }
    return res.json({ success: true, images: {}, backgrounds: {}, fits: {} });
  });

  app.post('/api/media/save', (req, res) => {
    try {
      const { images = {}, backgrounds = {}, fits = {} } = req.body;
      const sanitizedImages = { ...images };

      // Prevent huge base64 videos from bloating persistedMedia.json
      if (sanitizedImages['video-presentacion'] && sanitizedImages['video-presentacion'].startsWith('data:video/')) {
        try {
          const videoDir = path.join(process.cwd(), 'public', 'videos');
          if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });
          const base64Data = sanitizedImages['video-presentacion'].replace(/^data:video\/[a-zA-Z0-9.-]+;base64,/, '');
          const filePath = path.join(videoDir, 'presentacion_agricarl.mp4');
          fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

          const distVideoDir = path.join(process.cwd(), 'dist', 'videos');
          if (fs.existsSync(distVideoDir)) {
            fs.copyFileSync(filePath, path.join(distVideoDir, 'presentacion_agricarl.mp4'));
          }
          sanitizedImages['video-presentacion'] = '/videos/presentacion_agricarl.mp4';
        } catch (vErr) {
          console.error('Error saving base64 video to file in /api/media/save:', vErr);
        }
      }

      const payload = {
        images: sanitizedImages,
        backgrounds: backgrounds || {},
        fits: fits || {},
        lastUpdated: new Date().toISOString()
      };
      
      const dir = path.dirname(MEDIA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(payload, null, 2), 'utf-8');
      return res.json({ success: true, message: 'Medios guardados permanentemente en el servidor' });
    } catch (err: any) {
      console.error('Error saving media to file:', err);
      return res.status(500).json({ success: false, error: err?.message || 'Error guardando medios' });
    }
  });

  // Direct binary video upload endpoint (stream-based, ultra-fast and handles any file size)
  app.post('/api/media/upload-video-raw', (req, res) => {
    try {
      const filename = (req.query.filename as string) || 'presentacion_agricarl.mp4';
      const videoDir = path.join(process.cwd(), 'public', 'videos');
      if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });
      const distVideoDir = path.join(process.cwd(), 'dist', 'videos');
      if (!fs.existsSync(distVideoDir)) fs.mkdirSync(distVideoDir, { recursive: true });

      const filePath = path.join(videoDir, filename);
      const fileStream = fs.createWriteStream(filePath);

      req.pipe(fileStream);

      fileStream.on('finish', () => {
        try {
          if (fs.existsSync(distVideoDir)) {
            fs.copyFileSync(filePath, path.join(distVideoDir, filename));
          }

          if (fs.existsSync(MEDIA_FILE_PATH)) {
            const fileContent = fs.readFileSync(MEDIA_FILE_PATH, 'utf-8');
            const data = JSON.parse(fileContent);
            data.images = data.images || {};
            data.images['video-presentacion'] = `/videos/${filename}`;
            data.lastUpdated = new Date().toISOString();
            fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
          }

          return res.json({
            success: true,
            videoUrl: `/videos/${filename}`,
            message: 'Video institucional guardado exitosamente en el servidor'
          });
        } catch (copyErr: any) {
          console.error('Error post-saving video file:', copyErr);
          return res.status(500).json({ success: false, error: copyErr.message });
        }
      });

      fileStream.on('error', (streamErr) => {
        console.error('Error in video stream write:', streamErr);
        return res.status(500).json({ success: false, error: streamErr.message });
      });
    } catch (err: any) {
      console.error('Error in upload-video-raw:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Direct video upload endpoint for institutional presentation video (base64 JSON fallback)
  app.post('/api/media/upload-video', (req, res) => {
    try {
      const { videoData, filename = 'presentacion_agricarl.mp4' } = req.body;
      if (!videoData) {
        return res.status(400).json({ success: false, error: 'No se recibieron datos de video' });
      }

      const videoDir = path.join(process.cwd(), 'public', 'videos');
      if (!fs.existsSync(videoDir)) {
        fs.mkdirSync(videoDir, { recursive: true });
      }

      // Strip potential base64 prefix
      const base64Data = videoData.replace(/^data:video\/[a-zA-Z0-9.-]+;base64,/, '');
      const filePath = path.join(videoDir, filename);
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      // Also copy to dist/videos if dist exists
      const distVideoDir = path.join(process.cwd(), 'dist', 'videos');
      if (fs.existsSync(distVideoDir)) {
        fs.copyFileSync(filePath, path.join(distVideoDir, filename));
      }

      // Update persistedMedia.json
      if (fs.existsSync(MEDIA_FILE_PATH)) {
        const fileContent = fs.readFileSync(MEDIA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent);
        data.images = data.images || {};
        data.images['video-presentacion'] = `/videos/${filename}`;
        data.lastUpdated = new Date().toISOString();
        fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
      }

      return res.json({ 
        success: true, 
        videoUrl: `/videos/${filename}`,
        message: 'Video institucional guardado exitosamente en el código' 
      });
    } catch (err: any) {
      console.error('Error saving video to disk:', err);
      return res.status(500).json({ success: false, error: err?.message || 'Error guardando video' });
    }
  });

  // Check if institutional video file is present
  app.get('/api/media/check-video', (_req, res) => {
    const defaultFilename = 'presentacion_agricarl.mp4';
    const filePath = path.join(process.cwd(), 'public', 'videos', defaultFilename);
    const exists = fs.existsSync(filePath);
    return res.json({ 
      exists, 
      url: exists ? `/videos/${defaultFilename}` : null 
    });
  });

  // Dedicated endpoint to upload and integrate corporate logo without background (PNG/SVG)
  app.post('/api/media/upload-logo', (req, res) => {
    try {
      const { logoData } = req.body;
      if (!logoData || typeof logoData !== 'string') {
        return res.status(400).json({ success: false, error: 'No se recibieron datos de logo' });
      }

      const base64Data = logoData.replace(/^data:image\/[a-zA-Z0-9.+_-]+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // 1. Save to primary asset in src/assets/images
      const primaryAssetPath = path.join(process.cwd(), 'src', 'assets', 'images', 'regenerated_image_1790275312406.png');
      const assetDir = path.dirname(primaryAssetPath);
      if (!fs.existsSync(assetDir)) fs.mkdirSync(assetDir, { recursive: true });
      fs.writeFileSync(primaryAssetPath, buffer);

      // 2. Save to public directory
      const publicLogoPath = path.join(process.cwd(), 'public', 'logo_agricarl.png');
      const publicDir = path.dirname(publicLogoPath);
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      fs.writeFileSync(publicLogoPath, buffer);

      // 3. Save to dist directory if already built
      const distDir = path.join(process.cwd(), 'dist');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'logo_agricarl.png'), buffer);
      }

      // 4. Update persistedMedia.json
      const cacheBustUrl = `/logo_agricarl.png?v=${Date.now()}`;
      if (fs.existsSync(MEDIA_FILE_PATH)) {
        const fileContent = fs.readFileSync(MEDIA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent);
        data.images = data.images || {};
        data.images['logo'] = cacheBustUrl;
        data.lastUpdated = new Date().toISOString();
        fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
      }

      return res.json({
        success: true,
        logoUrl: cacheBustUrl,
        message: '¡Logo sin fondo integrado y guardado exitosamente en el código!'
      });
    } catch (err: any) {
      console.error('Error in /api/media/upload-logo:', err);
      return res.status(500).json({ success: false, error: err?.message || 'Error guardando logo' });
    }
  });

  // Generic endpoint to upload and persist any custom image directly into the codebase
  app.post('/api/media/upload-custom-image', (req, res) => {
    try {
      const { imageData, key, fileName } = req.body;
      if (!imageData || typeof imageData !== 'string') {
        return res.status(400).json({ success: false, error: 'No se recibieron datos de imagen' });
      }

      const safeKey = (key || 'custom-image').replace(/[^a-zA-Z0-9_-]/g, '_');
      const extMatch = imageData.match(/^data:image\/([a-zA-Z0-9+_-]+);base64,/);
      let ext = 'jpg';
      if (extMatch && extMatch[1]) {
        ext = extMatch[1].toLowerCase().replace('jpeg', 'jpg');
        if (ext === 'svg+xml') ext = 'svg';
      }

      const resolvedFileName = fileName 
        ? fileName.replace(/[^a-zA-Z0-9._-]/g, '_') 
        : `${safeKey}.${ext}`;

      const base64Data = imageData.replace(/^data:image\/[a-zA-Z0-9.+_-]+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // 1. Save in public/images/
      const publicDir = path.join(process.cwd(), 'public', 'images');
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      const publicFilePath = path.join(publicDir, resolvedFileName);
      fs.writeFileSync(publicFilePath, buffer);

      // 2. Save in src/assets/images/
      const srcDir = path.join(process.cwd(), 'src', 'assets', 'images');
      if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
      fs.writeFileSync(path.join(srcDir, resolvedFileName), buffer);

      // 3. Save in dist/images/ if dist exists
      const distDir = path.join(process.cwd(), 'dist', 'images');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, resolvedFileName), buffer);
      }

      // 4. Update persistedMedia.json
      const publicUrl = `/images/${resolvedFileName}`;
      if (fs.existsSync(MEDIA_FILE_PATH)) {
        const fileContent = fs.readFileSync(MEDIA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent);
        data.images = data.images || {};
        data.images[key || safeKey] = publicUrl;
        data.lastUpdated = new Date().toISOString();
        fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
      }

      console.log(`[MediaUpload] Image saved: ${publicUrl} for key ${key}`);
      return res.json({
        success: true,
        imageUrl: `${publicUrl}?v=${Date.now()}`,
        message: '¡Imagen guardada permanentemente en el proyecto!'
      });
    } catch (err: any) {
      console.error('Error in /api/media/upload-custom-image:', err);
      return res.status(500).json({ success: false, error: err?.message || 'Error guardando imagen' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ 
      status: 'ok', 
      company: 'AGRICARL PERÚ S.A.C.', 
      ruc: '20611291001',
      officialEmail: OFFICIAL_EMAIL,
      timestamp: new Date().toISOString()
    });
  });

  // Diagnostic status endpoint to check which email provider is active
  app.get('/api/contact/status', (_req, res) => {
    let provider = 'server_inbox';
    if (process.env.RESEND_API_KEY) {
      provider = 'resend';
    } else if (process.env.SENDGRID_API_KEY) {
      provider = 'sendgrid';
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      provider = 'smtp';
    }

    res.json({
      targetEmail: OFFICIAL_EMAIL,
      provider,
      configured: provider !== 'server_inbox',
      totalReceived: serverInbox.length,
      supportedProviders: ['resend', 'sendgrid', 'smtp', 'server_inbox']
    });
  });

  // Inbox inspection endpoint (view leads registered in server)
  app.get('/api/contact/messages', (_req, res) => {
    res.json({
      targetEmail: OFFICIAL_EMAIL,
      count: serverInbox.length,
      messages: serverInbox.slice(0, 50)
    });
  });

  // Direct Contact Dispatch Endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Campos requeridos faltantes: nombre, correo y mensaje son obligatorios.'
        });
      }

      const inquiryId = `INQ-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const timestamp = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

      // Build structured HTML email
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #064e3b 0%, #047857 100%); padding: 28px 24px; text-align: center; color: #ffffff; }
            .badge { display: inline-block; background: rgba(255,255,255,0.15); padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-family: monospace; letter-spacing: 1px; margin-bottom: 8px; }
            .title { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
            .subtitle { margin: 6px 0 0; font-size: 13px; color: #a7f3d0; }
            .body { padding: 32px 28px; }
            .field-group { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .field-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #0f172a; font-weight: 500; }
            .message-box { background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 8px; padding: 18px; margin-top: 24px; }
            .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">CONSULTA WEB DIRECTA</span>
              <h1 class="title">AGRICARL PERÚ S.A.C.</h1>
              <p class="subtitle">RUC: 20611291001 · Portal Oficial www.agricarlperu.com</p>
            </div>
            <div class="body">
              <h2 style="font-size: 16px; color: #047857; margin-top: 0; margin-bottom: 20px;">Nueva Consulta Recibida</h2>
              
              <div class="field-group">
                <div class="field-label">Remitente:</div>
                <div class="field-value">${name}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Correo Electrónico:</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #047857; text-decoration: none; font-weight: 600;">${email}</a></div>
              </div>

              <div class="field-group">
                <div class="field-label">Teléfono / WhatsApp:</div>
                <div class="field-value">${phone || 'No especificado'}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Asunto:</div>
                <div class="field-value">${subject || 'Consulta General / Comercial'}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Fecha y Hora de Recepción:</div>
                <div class="field-value" style="font-family: monospace; font-size: 13px;">${timestamp} (PET)</div>
              </div>

              <div class="message-box">
                <div class="field-label" style="color: #047857;">Mensaje del Cliente:</div>
                <div style="font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; margin-top: 6px;">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0 0 4px;">Este correo fue generado automáticamente para la bandeja de operaciones.</p>
              <p style="margin: 0; font-family: monospace; color: #047857;">Destino: ${OFFICIAL_EMAIL}</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const textContent = `
NUEVA CONSULTA DESDE EL PORTAL AGRICARL PERÚ S.A.C.
------------------------------------------------------------
Remitente: ${name}
Correo: ${email}
Teléfono / WhatsApp: ${phone || 'No especificado'}
Asunto: ${subject || 'Consulta Comercial'}
Fecha: ${timestamp}
ID: ${inquiryId}

MENSAJE:
------------------------------------------------------------
${message}
------------------------------------------------------------
Destinatario: ${OFFICIAL_EMAIL}
RUC: 20611291001
      `.trim();

      // OPTION 1: Resend API (https://resend.com)
      if (process.env.RESEND_API_KEY) {
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'AGRICARL Web <onboarding@resend.dev>';
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [OFFICIAL_EMAIL],
            reply_to: email,
            subject: `[Consulta Web] ${subject || 'Nuevo Mensaje'} - ${name}`,
            html: htmlContent,
            text: textContent
          })
        });

        const resendData = await resendResponse.json();

        if (resendResponse.ok) {
          const inquiry: ContactInquiry = {
            id: inquiryId,
            name,
            email,
            phone,
            subject,
            message,
            createdAt: timestamp,
            deliveryStatus: 'sent_resend'
          };
          serverInbox.unshift(inquiry);

          return res.json({
            success: true,
            delivery: 'resend',
            message: `¡Correo enviado directamente a ${OFFICIAL_EMAIL} exitosamente!`,
            id: resendData.id,
            targetEmail: OFFICIAL_EMAIL
          });
        } else {
          console.error('Error enviando con Resend:', resendData);
        }
      }

      // OPTION 2: SendGrid API
      if (process.env.SENDGRID_API_KEY) {
        const fromEmail = process.env.SENDGRID_FROM_EMAIL || OFFICIAL_EMAIL;
        const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: OFFICIAL_EMAIL }],
              subject: `[Consulta Web] ${subject || 'Nuevo Mensaje'} - ${name}`
            }],
            from: { email: fromEmail, name: 'Portal AGRICARL' },
            reply_to: { email: email, name: name },
            content: [
              { type: 'text/plain', value: textContent },
              { type: 'text/html', value: htmlContent }
            ]
          })
        });

        if (sendgridResponse.ok) {
          const inquiry: ContactInquiry = {
            id: inquiryId,
            name,
            email,
            phone,
            subject,
            message,
            createdAt: timestamp,
            deliveryStatus: 'sent_sendgrid'
          };
          serverInbox.unshift(inquiry);

          return res.json({
            success: true,
            delivery: 'sendgrid',
            message: `¡Correo enviado directamente a ${OFFICIAL_EMAIL} vía SendGrid!`,
            targetEmail: OFFICIAL_EMAIL
          });
        }
      }

      // OPTION 3: SMTP (Direct mail server / Gmail / cPanel)
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const port = parseInt(process.env.SMTP_PORT || '587', 10);
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port,
          secure: port === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;
        await transporter.sendMail({
          from: `"AGRICARL Portal Web" <${fromAddress}>`,
          to: OFFICIAL_EMAIL,
          replyTo: email,
          subject: `[Consulta Web] ${subject || 'Nuevo Mensaje'} - ${name}`,
          text: textContent,
          html: htmlContent
        });

        const inquiry: ContactInquiry = {
          id: inquiryId,
          name,
          email,
          phone,
          subject,
          message,
          createdAt: timestamp,
          deliveryStatus: 'sent_smtp'
        };
        serverInbox.unshift(inquiry);

        return res.json({
          success: true,
          delivery: 'smtp',
          message: `¡Correo despachado directamente a ${OFFICIAL_EMAIL} vía servidor SMTP!`,
          targetEmail: OFFICIAL_EMAIL
        });
      }

      // OPTION 4: Server Inbox (Safe queue when API key hasn't been set yet)
      const inquiry: ContactInquiry = {
        id: inquiryId,
        name,
        email,
        phone,
        subject,
        message,
        createdAt: timestamp,
        deliveryStatus: 'received_server_inbox'
      };
      serverInbox.unshift(inquiry);

      return res.json({
        success: true,
        delivery: 'server_inbox',
        message: `Su mensaje ha sido registrado exitosamente en el servidor corporativo para ${OFFICIAL_EMAIL}.`,
        targetEmail: OFFICIAL_EMAIL,
        note: 'Para despacho automático a su bandeja externa, configure RESEND_API_KEY o credenciales SMTP en los Ajustes del proyecto.',
        inquiryId
      });

    } catch (error: any) {
      console.error('Error al procesar el mensaje de contacto:', error);
      return res.status(500).json({
        success: false,
        error: 'Ocurrió un inconveniente al despachar su mensaje.',
        details: error?.message || 'Error interno'
      });
    }
  });

  // Health check endpoint for Cloud Run and container orchestrators
  app.get('/healthz', (_req, res) => {
    res.status(200).send('OK');
  });

  // Serve static distribution or Vite dev middleware with safe fallback
  const distPath = path.join(process.cwd(), 'dist');
  const distIndexHtml = path.join(distPath, 'index.html');

  if (process.env.NODE_ENV === 'production' && fs.existsSync(distIndexHtml)) {
    console.log(`Serving production build from ${distPath}`);
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(distIndexHtml, (err) => {
        if (err && !res.headersSent) {
          res.status(500).send('Production asset loading error');
        }
      });
    });
  } else {
    // In development mode, mount Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    // If a pre-built dist/ exists, serve static assets for maximum reliability
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
    }

    // SPA catch-all handler for HTML routes in development
    app.use(async (req, res, next) => {
      if (req.method !== 'GET') return next();
      if (req.path.startsWith('/api') || req.path === '/healthz') return next();

      // If dist/index.html is readily available, attempt to serve it safely
      if (fs.existsSync(distIndexHtml)) {
        res.sendFile(distIndexHtml, async (err) => {
          if (err && !res.headersSent) {
            try {
              const rootIndex = path.resolve(process.cwd(), 'index.html');
              let template = fs.readFileSync(rootIndex, 'utf-8');
              template = await vite.transformIndexHtml(req.originalUrl, template);
              res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
            } catch (fallbackErr) {
              next(fallbackErr);
            }
          }
        });
        return;
      }

      // Otherwise transform root index.html via Vite
      try {
        const rootIndex = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(rootIndex, 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server AGRICARL PERU S.A.C. running on http://${HOST}:${PORT} (NODE_ENV: ${process.env.NODE_ENV || 'development'})`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://${HOST}:${PORT}/`);
  });
}

startServer();
