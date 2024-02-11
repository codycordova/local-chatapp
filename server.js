const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

// File to store messages
const messagesFile = path.join(__dirname, 'messages.json');

// Read stored messages from the file
let storedMessages = [];
try {
  const messagesData = fs.readFileSync(messagesFile, 'utf8');
  storedMessages = JSON.parse(messagesData);
} catch (err) {
  console.error('Error reading messages file:', err);
}

wss.on('connection', (ws) => {
  console.log('WebSocket connection opened');

  // Send stored messages to the newly connected client
  storedMessages.forEach((message) => {
    ws.send(message);
  });

  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the received message to all connected clients except the sender
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

    // Store the message in the array
    storedMessages.push(message);

    // Write the updated messages array to the file
    fs.writeFile(messagesFile, JSON.stringify(storedMessages), (err) => {
      if (err) {
        console.error('Error writing messages file:', err);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
