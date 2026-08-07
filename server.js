const express = require('express');
const path = require('path');
const QRCode = require('qrcode');
const { Client, LocalAuth, MessageMedia, Location, Poll } = require('whatsapp-web.js');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const sessions = new Map();

app.use(express.json());
app.use((req, res, next) => { res.set('Cache-Control','no-store'); next(); });
app.use(express.static(path.join(__dirname, 'src/public')));

function log(sid, ev, det) { console.log(`[${new Date().toLocaleTimeString()}] [${sid}] ${ev}: ${det || ''}`); }

function cleanNumber(n) {
  if (!n) return '';
  return n.toString().replace(/[^0-9]/g, '');
}

async function resolveNumber(client, to) {
  const num = cleanNumber(to);
  if (!num || num.length < 7) throw new Error('numero invalido (minimo 7 digitos, ex: 5511999999999)');
  const id = await client.getNumberId(num);
  if (id) { log('API', 'RESOLVED', num + ' -> ' + id._serialized); return id._serialized; }
  throw new Error('Numero ' + num + ' nao encontrado no WhatsApp.');
}

function createSession(sessionId) {
  const client = new Client({
    authStrategy: new LocalAuth({ dataPath: path.join(__dirname, 'data', sessionId) }),
    puppeteer: {
      headless: true,
      executablePath: '/home/matheus/.cache/puppeteer/chrome/linux-150.0.7871.24/chrome-linux64/chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--no-first-run', '--no-zygote', '--single-process']
    }
  });

  const sd = { client, isConnected: false, qrCode: null, events: [] };
  sessions.set(sessionId, sd);

  function markConnected() {
    if (!sd.isConnected) {
      sd.isConnected = true;
      sd.qrCode = null;
      log(sessionId, 'CONNECTED', '***');
      io.emit('connected', { sessionId });
    }
  }

  client.on('qr', (qr) => { log(sessionId, 'QR'); sd.qrCode = qr; io.emit('qr', { sessionId }); });
  client.on('ready', () => { markConnected(); });
  client.on('authenticated', () => log(sessionId, 'AUTH', 'OK'));
  client.on('auth_failure', (m) => { log(sessionId, 'AUTH_FAIL', m); sd.isConnected = false; });
  client.on('disconnected', (r) => { log(sessionId, 'DISCONNECT', r); sd.isConnected = false; io.emit('disconnected', { sessionId }); });
  client.on('change_state', (s) => {
    log(sessionId, 'STATE', s);
    if (s === 'CONNECTED') markConnected();
  });
  client.on('message', (msg) => {
    sd.events.unshift({ from: msg.from, text: msg.body || '[media]', ts: Date.now() });
    if (sd.events.length > 50) sd.events.pop();
    io.emit('message', sd.events[0]);
  });
  client.on('loading_screen', (p) => log(sessionId, 'LOAD', p + '%'));

  log(sessionId, 'INIT');
  client.initialize().catch(e => log(sessionId, 'ERR', e.message));
  return sd;
}

app.get('/api/sessions', (req, res) => {
  const list = [];
  sessions.forEach((d, id) => list.push({ sessionId: id, isConnected: d.isConnected }));
  res.json({ success: true, sessions: list });
});

app.post('/api/sessions', async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ error: 'nome obrigatorio' });
  if (sessions.has(sessionId) && sessions.get(sessionId).isConnected) return res.json({ success: true, sessionId });
  if (sessions.has(sessionId)) { try { await sessions.get(sessionId).client.destroy(); } catch(e) {} sessions.delete(sessionId); }
  try { createSession(sessionId); res.json({ success: true, sessionId }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/qrcode/:id', async (req, res) => {
  const s = sessions.get(req.params.id);
  if (!s) return res.status(404).json({ error: 'sessao nao encontrada' });
  if (s.isConnected) return res.json({ connected: true });
  if (!s.qrCode) return res.json({ connected: false, qrCode: null });
  try { res.json({ connected: false, qrCode: await QRCode.toDataURL(s.qrCode, { width: 400, margin: 3, errorCorrectionLevel: 'M', scale: 4 }) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/sessions/:id', async (req, res) => {
  const s = sessions.get(req.params.id);
  if (s) { try { await s.client.destroy(); } catch(e) {} sessions.delete(req.params.id); }
  res.json({ success: true });
});

// --- Contacts ---
app.get('/api/contacts/:sessionId', async (req, res) => {
  const s = sessions.get(req.params.sessionId);
  if (!s?.isConnected) return res.status(400).json({ error: 'sessao nao conectada' });
  try {
    const contacts = await s.client.getContacts();
    const list = contacts
      .filter(c => c.id && c.id.user && c.id.server === 'c.us')
      .map(c => ({ id: c.id._serialized, number: c.id.user, name: c.name || c.pushname || c.id.user, isMyContact: c.isMyContact }))
      .sort((a, b) => (b.isMyContact ? 1 : 0) - (a.isMyContact ? 1 : 0));
    res.json({ success: true, contacts: list.slice(0, 200) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/send/text', async (req, res) => {
  const { sessionId, to, text } = req.body;
  const s = sessions.get(sessionId);
  if (!s?.isConnected) return res.status(400).json({ error: 'sessao nao conectada' });
  try { const id = await resolveNumber(s.client, to); await s.client.sendMessage(id, text); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/send/image', async (req, res) => {
  const { sessionId, to, imageUrl, caption } = req.body;
  const s = sessions.get(sessionId);
  if (!s?.isConnected) return res.status(400).json({ error: 'sessao nao conectada' });
  try { const id = await resolveNumber(s.client, to); const media = await MessageMedia.fromUrl(imageUrl, { unsafeMime: true }); await s.client.sendMessage(id, media, { caption: caption || '' }); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/send/video', async (req, res) => {
  const { sessionId, to, videoUrl, caption } = req.body;
  const s = sessions.get(sessionId);
  if (!s?.isConnected) return res.status(400).json({ error: 'sessao nao conectada' });
  try { const id = await resolveNumber(s.client, to); const media = await MessageMedia.fromUrl(videoUrl, { unsafeMime: true }); await s.client.sendMessage(id, media, { caption: caption || '' }); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/send/audio', async (req, res) => {
  const { sessionId, to, audioUrl } = req.body;
  const s = sessions.get(sessionId);
  if (!s?.isConnected) return res.status(400).json({ error: 'sessao nao conectada' });
  try { const id = await resolveNumber(s.client, to); const media = await MessageMedia.fromUrl(audioUrl, { unsafeMime: true }); await s.client.sendMessage(id, media, { sendAudioAsVoice: true }); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/send/location', async (req, res) => {
  const { sessionId, to, latitude, longitude } = req.body;
  const s = sessions.get(sessionId);
  if (!s?.isConnected) return res.status(400).json({ error: 'sessao nao conectada' });
  try { const id = await resolveNumber(s.client, to); await s.client.sendMessage(id, new Location(latitude, longitude)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/send/poll', async (req, res) => {
  const { sessionId, to, name, values } = req.body;
  const s = sessions.get(sessionId);
  if (!s?.isConnected) return res.status(400).json({ error: 'sessao nao conectada' });
  try { const id = await resolveNumber(s.client, to); await s.client.sendMessage(id, new Poll(name, values)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

io.on('connection', () => {});
server.listen(3000, () => log('SERVER', 'START', 'http://localhost:3000'));
