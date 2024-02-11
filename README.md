# Local Chatapp

## Dependencies

- [http-server](https://www.npmjs.com/package/http-server) - Simple HTTP server for serving static files.
- [ws](https://www.npmjs.com/package/ws) - WS is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation.

## Installation

1. Install dependencies:

   ```bash
   npm install

## Change IP address in index.html
   
On line 78

 Replace 'your-laptop-ip' with your actual local IPv4 address 
 
const socket = new WebSocket('ws://your-laptop-ip:3000');

This will allow different devices on your local network to connect and communicate with each other.

## Start the Server
   In your CLI run:

   ```bash
   node server.js
```
   The selected server port is 3000 feel free to change as you please

   For mobile devices you typically can't access localhost so type in the IP address you used above at port 3000 like 192.168.0.0:3000
