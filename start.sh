#!/bin/bash
# Kill any existing server
pkill -9 -f "node server.js" 2>/dev/null
sleep 1

# Start fresh
cd /home/matheus/whatsapp-api
echo "Iniciando WhatsApp API..."
node server.js
