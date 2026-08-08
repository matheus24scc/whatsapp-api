#!/bin/bash
echo "=== Enviando WhatsApp API para GitHub ==="
echo ""

# Check if gh is authenticated
if ! gh auth status &>/dev/null; then
    echo "Precisamos autenticar com GitHub primeiro."
    echo "Abra https://github.com/login/device no navegador"
    echo ""
    gh auth login -h github.com -p https -w
fi

echo ""
echo "Criando repositorio no GitHub..."
gh repo create whatsapp-api \
  --public \
  --description "WhatsApp API completa com dashboard futurista, multi-sessao e envio de mensagens" \
  --source=. \
  --remote=origin \
  --push

echo ""
echo "Pronto! Acesse: https://github.com/matheus24scc/whatsapp-api"
