<div align="center">

  <img src="https://img.shields.io/badge/WHATSAPP_API-v2.0.0-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp API">
  <br><br>

  <h1>WhatsApp API</h1>

  <p>
    <strong>API completa e production-ready para integracao com WhatsApp</strong><br>
    Multi-sessao · Dashboard futurista · Todos os tipos de mensagem · Tempo real
  </p>

  <p>
    <a href="#instalacao">Instalacao</a> ·
    <a href="#documentacao-da-api">API</a> ·
    <a href="#exemplos">Exemplos</a> ·
    <a href="#deploy">Deploy</a> ·
    <a href="#roadmap">Roadmap</a>
  </p>

  [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-00a884?style=flat-square)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
  [![Issues](https://img.shields.io/github/issues/matheus24scc/whatsapp-api?style=flat-square)](https://github.com/matheus24scc/whatsapp-api/issues)
  [![Stars](https://img.shields.io/github/stars/matheus24scc/whatsapp-api?style=flat-square&color=yellow)](https://github.com/matheus24scc/whatsapp-api/stargazers)

</div>

---

## Visao Geral

O WhatsApp API e uma solucao completa para quem precisa integrar WhatsApp em seus sistemas. Diferente de outras bibliotecas que quebram a cada atualizacao, este projeto foi construido pensando em **estabilidade** e **facilidade de uso**.

### Por que usar este projeto?

| Feature | Este Projeto | Outros |
|---------|:------------:|:------:|
| Multi-sessao | ✅ | ❌ |
| Dashboard visual | ✅ | ❌ |
| Envio de midia | ✅ | ⚠️ |
| Localizacao | ✅ | ❌ |
| Enquetes | ✅ | ❌ |
| Tempo real | ✅ | ❌ |
| Auto-reconnect | ✅ | ⚠️ |
| LID compat | ✅ | ❌ |
| Design futurista | ✅ | ❌ |

### Stack Tecnico

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│  HTML5 · CSS3 (Glassmorphism) · JavaScript ES6+     │
│  Socket.IO Client · Orbitron Font · Neon Effects    │
└──────────────────────┬──────────────────────────────┘
                       │ WebSocket
┌──────────────────────┴──────────────────────────────┐
│                    BACKEND                           │
│  Node.js 18+ · Express 4 · Socket.IO 4              │
│  whatsapp-web.js 1.34.7 · QRCode · Puppeteer        │
└──────────────────────┬──────────────────────────────┘
                       │ WhatsApp Web Protocol
┌──────────────────────┴──────────────────────────────┐
│                  WHATSAPP                            │
│  Chrome Headless · WebSocket · LID Resolution        │
└─────────────────────────────────────────────────────┘
```

---

## Instalacao

### Requisitos

- **Node.js** 18 ou superior
- **npm** 9 ou superior
- **Chrome/Chromium** (para Puppeteer)
- **~500MB** de espaco em disco

### Quick Start

```bash
# 1. Clone o repositorio
git clone https://github.com/matheus24scc/whatsapp-api.git

# 2. Entre na pasta
cd whatsapp-api

# 3. Instale as dependencias
npm install

# 4. Inicie o servidor
node server.js

# 5. Abra o dashboard
# http://localhost:3000
```

### Instalacao avancada

<details>
<summary><b>Configuracao via variavel de ambiente</b></summary>

```bash
# Porta do servidor (default: 3000)
PORT=3000

# Caminho do Chrome (auto-detect)
CHROME_PATH=/usr/bin/google-chrome

# Modo debug
DEBUG=whatsapp-api:*
```

</details>

<details>
<summary><b>Docker</b></summary>

```bash
# Build
docker build -t whatsapp-api .

# Run
docker run -d \
  --name whatsapp-api \
  -p 3000:3000 \
  -v ./data:/app/data \
  whatsapp-api
```

</details>

<details>
<summary><b>PM2 (Producao)</b></summary>

```bash
# Instale o PM2
npm install -g pm2

# Inicie o servidor
pm2 start server.js --name whatsapp-api

# Salve a config
pm2 save

# Configure para iniciar com o sistema
pm2 startup
```

</details>

---

## Dashboard

O dashboard foi projetado com uma estetica **futurista/glassmorphism** incluindo:

- Grid animado no background
- Particulas flutuantes com cores neon
- Scanline animada
- Cards com efeito glass (backdrop-filter blur)
- Status dots com animacao de pulso
- Toast notifications
- Stats em tempo real
- Design responsivo

```
┌────────────────────────────────────────────┐
│  ⬡ SYSTEM ONLINE                          │
│                                            │
│     W H A T S A P P   A P I               │
│     Nexus Control Dashboard v2.0           │
│  ─────────────────────────────────────     │
│                                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│  │    1    │ │    1    │ │  ONL    │      │
│  │ Sessoes │ │Conecta. │ │ Status  │      │
│  └─────────┘ └─────────┘ └─────────┘      │
│                                            │
│  ┌─ SESSOES ──────────────────────────┐   │
│  │  🟢 medico        CONECTADA  [X]  │   │
│  └────────────────────────────────────┘   │
│                                            │
│  ┌─ ENVIAR MENSAGEM ──────────────────┐   │
│  │  Sessao: [medico          ▼]       │   │
│  │  Tipo: [Texto][Imagem][Video]...   │   │
│  │  Numero: [5511999999999      ]     │   │
│  │  Mensagem: [                    ]  │   │
│  │  [═══════ TRANSMITIR ═══════]      │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

---

## Documentacao da API

### Base URL

```
http://localhost:3000
```

### Endpoints

#### Sessoes

| Metodo | Rota | Body | Descricao |
|--------|------|------|-----------|
| `GET` | `/api/sessions` | - | Lista todas as sessoes |
| `POST` | `/api/sessions` | `{"sessionId": "nome"}` | Cria uma sessao |
| `DELETE` | `/api/sessions/:id` | - | Deleta uma sessao |

#### QR Code

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/api/qrcode/:id` | Retorna o QR Code em base64 |

#### Contatos

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/api/contacts/:sessionId` | Lista contatos (max 200) |

#### Envio de Mensagens

| Metodo | Rota | Body |
|--------|------|------|
| `POST` | `/api/send/text` | `{"sessionId", "to", "text"}` |
| `POST` | `/api/send/image` | `{"sessionId", "to", "imageUrl", "caption"}` |
| `POST` | `/api/send/video` | `{"sessionId", "to", "videoUrl", "caption"}` |
| `POST` | `/api/send/audio` | `{"sessionId", "to", "audioUrl"}` |
| `POST` | `/api/send/location` | `{"sessionId", "to", "latitude", "longitude"}` |
| `POST` | `/api/send/poll` | `{"sessionId", "to", "name", "values"}` |

### Formato do Numero

O numero deve estar no formato internacional sem `+`:

```
5511999999999    ← Brasil (55 + DDD + numero)
12025551234      ← EUA (1 + area code + number)
447911123456     ← UK (44 + number)
```

---

## Exemplos

### cURL

```bash
# Criar sessao
curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"vendas"}'

# Enviar texto
curl -X POST http://localhost:3000/api/send/text \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "vendas",
    "to": "5511999999999",
    "text": "Ola! Sua compra foi confirmada."
  }'

# Enviar imagem
curl -X POST http://localhost:3000/api/send/image \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "vendas",
    "to": "5511999999999",
    "imageUrl": "https://exemplo.com/produto.jpg",
    "caption": "Confira nosso novo produto!"
  }'
```

### JavaScript (fetch)

```javascript
const API = 'http://localhost:3000';

// Criar sessao
const createSession = async (name) => {
  const res = await fetch(`${API}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId: name })
  });
  return res.json();
};

// Enviar mensagem
const sendMessage = async (session, to, text) => {
  const res = await fetch(`${API}/api/send/text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId: session, to, text })
  });
  return res.json();
};

// Uso
await createSession('bot');
await sendMessage('bot', '5511999999999', 'Ola!');
```

### Python (requests)

```python
import requests

API = 'http://localhost:3000'

# Criar sessao
requests.post(f'{API}/api/sessions', json={
    'sessionId': 'bot'
})

# Enviar mensagem
requests.post(f'{API}/api/send/text', json={
    'sessionId': 'bot',
    'to': '5511999999999',
    'text': 'Ola!'
})
```

---

## Arquitetura

```
whatsapp-api/
├── server.js              # Servidor principal (Express + Socket.IO)
├── src/
│   └── public/
│       └── index.html     # Dashboard (Glassmorphism + Neon)
├── data/                  # Dados de sessao (gitignored)
│   └── <session-id>/
│       └── session/       # Dados do Chrome
├── package.json
├── .gitignore
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
└── README.md
```

---

## Configuracao

### Variaveis de Ambiente

| Variavel | Default | Descricao |
|----------|---------|-----------|
| `PORT` | `3000` | Porta do servidor |
| `CHROME_PATH` | auto | Caminho do Chrome |
| `DEBUG` | - | Modo debug |

### Porta personalizada

```bash
PORT=8080 node server.js
```

---

## Contribuicao

Contribuicoes sao muito bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) antes de enviar um PR.

### Development

```bash
# Clone
git clone https://github.com/matheus24scc/whatsapp-api.git
cd whatsapp-api

# Instale
npm install

# Rode em dev
node server.js

# Acesse
http://localhost:3000
```

---

## Roadmap

- [ ] Webhook para mensagens recebidas
- [ ] Suporte a group messages
- [ ] Rate limiting
- [ ] Autenticacao via API key
- [ ] Metricas e monitoring
- [ ] Testes automatizados
- [ ] Interface de administracao
- [ ] Suporte a múltiplos numeros por sessao

---

## Known Issues

| Issue | Status | Solucao |
|-------|--------|---------|
| QR Code expira rapido | ⚠️ | Recriar sessao |
| Chrome crash embaixo de RAM | ⚠️ | Usar SWAP |
| LID resolution falha | ✅ | Atualizado |

---

## Seguranca

Se voce encontrar uma vulnerabilidade, por favor **nao** abra um issue publico. Em vez disso, envie um email para matheus24scc@users.noreply.github.com.

---

## Licenca

Este projeto esta licenciado sob a licenca MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## Agradecimentos

- [whatsapp-web.js](https://github.com/nicedoc/whatsapp-web.js) - Biblioteca principal
- [Socket.IO](https://socket.io/) - Comunicacao em tempo real
- [Express](https://expressjs.com/) - Framework HTTP
- [Puppeteer](https://pptr.dev/) - Automacao do Chrome

---

## Autor

**Matheus Gabriel** - [@matheus24scc](https://github.com/matheus24scc)

Projeto hospedado em [GitHub](https://github.com/matheus24scc/whatsapp-api)

## Status (checkup 2026-08-18)
> Revisado na campanha de repo-checkup. Relatorio completo: `~/repo-checkup/reports/whatsapp-api.md` (local do mantenedor, nao no repo).
- **Build/Install**: PASS — `npm ci` RC=0 (286 pacotes apos limpeza) e `node --check server.js` RC=0 (JS puro, sem transpilacao).
- **Smoke test**: server sobe em :3000; `GET /api/sessions` -> 200 `{"success":true,"sessions":[]}`; `GET /api/qrcode/nope` -> 404; `GET /` -> 200 (index estatico).
- **Para rodar de ponta-a-ponta precisa de**: QR WhatsApp + conta real (acao humana) para sessao conectada; Chrome/puppeteer (`executablePath` hardcoded) para criar sessao.
- **Inconsistencias conhecidas (README vs codigo)**: `package.json` listava `baileys`, `playwright`, `pino`, `puppeteer-core` nao importados (removidos no checkup); memoria do projeto atribuia erro 515 ao Baileys, mas o codigo usa `whatsapp-web.js`; `executablePath` do puppeteer hardcoded (fragil entre maquinas).
- **Seguranca**: 5 high transitivas via `extract-zip` (GHSA-jmr9-qjv8-65gv, cadeia puppeteer/whatsapp-web.js); unico fix e `npm audit fix --force` que faz downgrade BREAKING do `whatsapp-web.js` para 1.34.2 -> NAO aplicado (decisao humana). Sem vulns altas remediadas automaticamente.
- **Estado resumido**: build/install verde + smoke (server sobe, 200/404); conexao WhatsApp real precisa de QR + conta (acao humana); 5 high pendentes.
