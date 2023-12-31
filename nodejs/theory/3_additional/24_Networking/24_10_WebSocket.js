'use strict';       // jshint ignore: line

// http://tools.ietf.org/html/rfc6455 WebSocket specification
// WebSocket is intended to support client-server data exchange through a constant connection.
// A data is being transferred back and forth as data-packets (frames) without breaking a connection and without additional headers.
// The common use cases - online games, real-time trading platforms, etc.

// To make a new WebSocket connection:
const socket = new WebSocket('wss://javascript.info/chat');   // Or ws://. The wss one (WebSocket over TLS) is more reliable and supports encryption - should be preferred.
// wss protocol guarantees that data will be decrypted only by the receiving end, so proxies always allows such packets (ws protocol could be denied).
// Upon new WebSocket creation the client actually starts the connection process (sends the connection request):
/*
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
 */
// Note: WebSocket request couldn't be emulated with XMLHttpRequest nor with fetch() - according headers are denied to be used.

// If the server supports WebSocket and the connection is allowed - it responds:
/*
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=      // Generated by the server out of the Sec-Websocket-Key, browser checks the correctness of that header value.
 */

// Additional headers could be used:
// * Sec-WebSocket-Extensions: deflate-frame            // Browser fills this header with supported extensions of the WebSocket protocol (data compression in this case)
// * Sec-WebSocket-Protocol: soap, wamp                 // The list of additionally supported protocols, could be passed via constructor (Web Socket Application Messaging)
const socketWithAdditionalProtocols = new WebSocket('wss://some.url', '[soap, wamp]');

// The server could also respond with those headers, notifying about additional extensions and protocols supported.




// The WebSocket supports 4 event types:
// * open
// * message
// * error
// * close
socket.onopen = function(event) {
    console.log('WebSocket connection was acquired.');
    socket.send('Greetings!');              // Sending a packet. String/ArrayBufferLike/Blob/ArrayBufferView types are supported.
};
socket.onmessage = function(event) {
    console.log(`Message: ${event.data}`);
};
socket.onclose = function(event) {
    if (event.wasClean) {           // True if the socket was closed normally (with the socket.close() method).
        console.log(`Connection was closed cleanly, code=${event.code}, reason=${event.reason}`);       // The server closed the connection normally.
    } else {
        console.log(`Connection terminated abnormally, code=${event.code}`);        // The server terminated the process or the network is unavailable (code = 1006 usually).
    }
};
socket.onerror = function(event) {
    console.error(`Error: ${event.message}`);
};

// There is a number of frame (data-packet) types:
// * textual frames
// * binary frames
// * ping-pong frames
// * connection close frame
// * some other service-frames

// Only textual and binary frames are being operated directly.
// Textual frames are always received as a String data.
// Binary frames could be received as a Blob object (by default) or an ArrayBuffer object. There is the socket.bufferType property, which could change the default behavior:
socket.bufferType = 'arraybuffer';      // 'blob' by default and more convenient. ArrayBuffer could be used to access particular bytes of data.

// To handle low-speed connections the socket.bufferedAmount property could be used. It stores the number of bytes of buffered data (which is scheduled to be sent).
function sendAfterBufferEmpty(socket) {
    setInterval(() => {
        if (socket.bufferedAmount === 0) {
            socket.send('More data');
        }
    }, 100);
}

// Both client and server has same rights to close the connection. The close-connection-frame could be used to do so:
// socket.close([code], [reason]);
// Where:
// * code - a special WebSocket code for the reason why the connection was closed. Codes lesser than 1000 are reserved and couldn't be set. Some of most popular codes:
//      - 1000 (by default) normal close
//      - 1006 connection lost (that code couldn't be set manually)
//      - 1001 another side disconnected (client left the page, server went off)
//      - 1009 the message is too large to be handled
//      - 1001 unexpected server error
// * reason - a string describing the reason why the connection was closed.

// There is the special socket.readyState property, which could be used to get the connection status. Possible values:
// * 0 - "CONNECTING"
// * 1 - "OPEN"
// * 2 - "CLOSING"
// * 3 - "CLOSED"




// Chat example:

    // Client html.
/*
    <form name="publish">
        <input type="text" name="message">
        <input type="submit" value="Send">
    </form>
    <div id="messages"/>
*/

    // Client js.
const chatSocket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");
document.forms.publish.onsubmit = function() {
    const outMessage = this.message.value;
    chatSocket.send(outMessage);
    return false;
};
chatSocket.onmessage = function(event) {
    const message = event.data;
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    document.getElementById('messages').prepend(messageElement);
};

    // Server js (NodeJS).
const ws = new require('ws');
const wss = new ws.Server({ noServer: true });
const clients = new Set();
http.createServer(((req, res) => {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
}));
function onSocketConnect(ws) {
    clients.add(ws);
    ws.on('message', function(message) {
        message = message.slice(0, 50);
        for (let client of clients) {
            client.send(message);
        }
    });
    ws.on('close', function() {
        clients.delete(ws);
    });
}