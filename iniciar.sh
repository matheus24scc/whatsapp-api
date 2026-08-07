#!/bin/bash
echo "=== WhatsApp API ==="
echo ""

# Kill old processes
pkill -9 -f "node server.js" 2>/dev/null
sleep 1

# Go to project
cd /home/matheus/whatsapp-api

# Install deps if needed
if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias..."
  npm install
fi

# Start server
echo "Iniciando servidor..."
echo "Acesse: http://localhost:3000"
echo ""
node server.js
