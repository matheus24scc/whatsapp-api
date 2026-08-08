<div align="center">

# WhatsApp API

**API completa do WhatsApp com dashboard futurista, multi-sessao e envio de mensagens.**
Envie textos, imagens, videos, audios, localizacoes e enquetes pelo WhatsApp usando uma interface moderna com design neon/glassmorphism. Funciona com qualquer cliente HTTP ou integre direto no seu projeto.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![WhatsApp Web.js](https://img.shields.io/badge/WhatsApp%20Web.js-1.34.7-brightgreen.svg)](https://github.com/nicedoc/whatsapp-web.js)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4+-white.svg)](https://socket.io/)

![WhatsApp API Dashboard](docs/assets/demo.png)

</div>

## Why

Integrar com o WhatsApp normalmente requer configuracoes complexas, libraries desatualizadas e dashboards feios. Este projeto resolve isso com:

- **Multi-sessao** — Gerencie varias contas WhatsApp simultaneamente
- **Dashboard futurista** — Interface com glassmorphism, neon e particulas animadas
- **Todos os tipos de mensagem** — Texto, imagem, video, audio, localizacao e enquete
- **Tempo real** — Socket.IO para atualizacoes instantaneas
- **Resolucao LID** — Compativel com o novo protocolo do WhatsApp

## Install

> **Requires:** Node.js 18+ · npm · Chrome/Chromium (para Puppeteer)

### Step 1 — Clone e instale dependencias

```bash
git clone https://github.com/matheus24scc/whatsapp-api.git
cd whatsapp-api
npm install
```

### Step 2 — Inicie o servidor

```bash
node server.js
```

### Step 3 — Acesse o dashboard

Abra **http://localhost:3000** no navegador.

<details><summary><b>Usando PM2 (producao)</b></summary>

```bash
npm install -g pm2
pm2 start server.js --name whatsapp-api
pm2 save
pm2 startup
```

</details>

<details><summary><b>Docker</b></summary>

```bash
docker build -t whatsapp-api .
docker run -p 3000:3000 whatsapp-api
```

</details>

## How to use

### 1. Criar uma sessao

No dashboard, digite um nome e clique em **+ Criar**. Um QR Code aparecera.

### 2. Conectar o WhatsApp

1. Abra o WhatsApp no celular
2. Va em **Mais opcoes** > **Aparelhos conectados**
3. Toque em **Conectar um aparelho**
4. Escaneie o QR Code

### 3. Enviar mensagens

Selecione a sessao conectada, escolha o tipo de mensagem, preencha os campos e clique em **TRANSMITIR**.

## API Endpoints

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/api/sessions` | Listar todas as sessoes |
| `POST` | `/api/sessions` | Criar sessao `{"sessionId"}` |
| `GET` | `/api/qrcode/:id` | Obter QR Code |
| `GET` | `/api/contacts/:sessionId` | Listar contatos |
| `DELETE` | `/api/sessions/:id` | Deletar sessao |
| `POST` | `/api/send/text` | Enviar texto |
| `POST` | `/api/send/image` | Enviar imagem |
| `POST` | `/api/send/video` | Enviar video |
| `POST` | `/api/send/audio` | Enviar audio |
| `POST` | `/api/send/location` | Enviar localizacao |
| `POST` | `/api/send/poll` | Enviar enquete |

### Exemplo com curl

```bash
# Criar sessao
curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"minha-sessao"}'

# Enviar mensagem de texto
curl -X POST http://localhost:3000/api/send/text \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"minha-sessao","to":"5511999999999","text":"Ola!"}'

# Enviar imagem
curl -X POST http://localhost:3000/api/send/image \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"minha-sessao","to":"5511999999999","imageUrl":"https://exemplo.com/foto.jpg","caption":"Legenda"}'
```

### Exemplo com JavaScript

```javascript
const response = await fetch('http://localhost:3000/api/send/text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId: 'minha-sessao',
    to: '5511999999999',
    text: 'Mensagem via API!'
  })
});

const result = await response.json();
console.log(result); // { success: true }
```

## Architecture

```
whatsapp-api/
├── server.js              # Express + Socket.IO + WhatsApp
├── src/public/
│   └── index.html         # Dashboard futurista
├── data/                  # Dados de sessao (gitignored)
├── package.json
└── README.md
```

### Stack

- **Runtime:** Node.js + Express
- **WhatsApp:** whatsapp-web.js (Chrome via Puppeteer)
- **Tempo real:** Socket.IO
- **Frontend:** HTML/CSS/JS puro com glassmorphism

## Features

| Feature | Status |
|---------|--------|
| Multi-sessao | ✅ |
| QR Code connection | ✅ |
| Text messages | ✅ |
| Image messages | ✅ |
| Video messages | ✅ |
| Audio messages | ✅ |
| Location messages | ✅ |
| Poll messages | ✅ |
| Contact listing | ✅ |
| Real-time updates | ✅ |
| Auto-reconnect | ✅ |
| LID resolution | ✅ |
| Futuristic dashboard | ✅ |

## Common issues

<details><summary><b>"No LID for user" error</b></summary>

O numero pode nao existir no WhatsApp ou estar em formato incorreto. Use `getNumberId()` para resolver:

```javascript
const id = await client.getNumberId('5511999999999');
// Retorna: { _serialized: "123456789@lid" }
```

</details>

<details><summary><b>"Browser already running" error</b></summary>

Mate processos Chrome antigos:

```bash
pkill -9 -f "chrome.*headless"
```

</details>

<details><summary><b>Sessao troca sozinha</b></summary>

O problema era no frontend — o `ls()` reconstruia o dropdown e perdia a selecao. Ja corrigido na versao atual.

</details>

<details><summary><b>QR Code nao conecta</b></summary>

Verifique se o endpoint do WhatsApp funciona:

```bash
curl -s https://web.whatsapp.com/ws/chat
# Deve retornar algo, nao 404
```

</details>

## Contributing

Contribuicoes sao bem-vindas! Abra um issue ou envie um PR.

## License

MIT
