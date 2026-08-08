# Changelog

Todas as mudancas notaveis neste projeto serao documentadas neste arquivo.

O formato e baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [2.0.0] - 2024-01-15

### Adicionado
- Dashboard futurista com glassmorphism e neon
- Multi-sessao com gerenciamento via dashboard
- Envio de mensagens: texto, imagem, video, audio, localizacao, enquete
- Lista de contatos via API
- Socket.IO para atualizacoes em tempo real
- Resolucao de numeros LID
- Auto-reconeccao em caso de desconexao
- Toast notifications no frontend
- Stats em tempo real no dashboard
- Design responsivo para mobile

### Corrigido
- Sessao trocando sozinha no dropdown
- QR Code continuava polar apos conexao
- Erro "No LID for user" na resolucao de numeros

### Removido
- Endpoints expostos no dashboard (por seguranca)

## [1.0.0] - 2024-01-10

### Adicionado
- Versao inicial do projeto
- Servidor Express com Socket.IO
- Integracao com whatsapp-web.js
- Envio de texto e imagem
- QR Code para conexao
