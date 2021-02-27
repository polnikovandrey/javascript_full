'use strict';           // jshint ignore: line

// https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events

// Built-in EventSource class allows maintaining connection with a server and receiving events. As like as WebSocket, EventSource maintains a constant connection.
// There are some major differences between Server Sent Events and WebSocket mechanisms:
// * WebSocket allows sending messages to both client and server, SSE allows sending messages only to a server.
// * WebSocket supports both textual and binary data, SSE supports only a textual data.
// * WebSocket uses a special WebSocket protocol, SSE uses a common http protocol.

// So, the SSE is a quite simple mechanism comparing with WebSocket. SSE is often used because of it's simplicity when there is no obvious reason to use the WebSocket protocol.
// Another plus of SSE is a built-in mechanism of reconnection with a server in case when the connection was lost. WebSocket doesn't have that one, it must be implemented
// explicitly.

// To create a connection with a server:
const EventSource = require('eventsource');                         // NodeJS implementation.
const eventSource = new EventSource('/events/subscribe');       // Establish and maintain a connection.
// The server must reply with the 200 status and a 'Content-Type: text/event-stream' header.
// The server could then send events of form:
/*
    data: Message 1

    data: Message 2

    data: Message3
    data: two lines message
 */
// * the text of a message comes after 'data:' prefix. Space after colon and before a message is optional.
// * messages are delimited with a double newline '\n\n'.
// * to send a multiline message - any number of 'data:' lines with a single new line delimiter could be used. In practice the JSON format is usually used to
// send complex messages, so there is no need to control line splitting (JSON uses '\n' delimiter for new lines, so a long message is being sent as a single line). E.g.:
// data: {"user":"John","message":"First line\n Second line"}

// To accept messages:
eventSource.onmessage = function(event) {
    console.log(`New message ${event.data}`);
};
// Or:
eventSource.addEventListener('message', function(event) {
    console.log(`New message ${event.data}`);
});

// As like as fetch(), SSE supports cross-domain requests. In case of a cross-domain request a server will receive the 'Origin' header and must answer with the
// 'Access-Control-Allow-Origin' header. To send authorization data:
const crossDomainEventSourceWithAuthorization = new EventSource('https://another-site.com/events', { withCredentials: true });

// Reconnection with a server is being handled automatically. There is a few seconds delay between reconnection attempts by default. A server could set a minimum ms delay
// with a 'retry: 100500' string (alongside the 'data: ...' line in a message of inside a distinct message with a single 'retry' string line).
// To stop reconnection attempts a server must respond with a 204 status.
// The reconnection will also fail if the 'Content-Type' header value is not valid or if the response status differs from 301, 307, 200 and 204. In that case a client
// generates the 'error' event and stops reconnection attempts.

// To close a connection:
eventSource.close();

// EventSource object is not reusable. It couldn't be reused to reconnect or to establish another connection. One should create a new EventSource object to do so.

// To control the communication (ensure all messages where send/received) both client and server use message ids mechanism. Each message must have a distinct id
// field (notice - the 'id:' field comes after the 'data:' field - that is needed to ensure that id was set after the message itself was received).
/*
    data: Message 1
    id: 1

    data: Message 2
    data: another line
    id: 2
 */
// Upon receiving the 'id' field a browser sets it's value to the eventSource.lastEventId property.
// A browser supply the reconnection request with a 'Last-Event-Id' header with the value of eventSource.lastEventId property.

// EventSource object has the 'readyState' property, which could have any of 3 values:
// * EventSource.CONNECTING == 0
// * EventSource.OPEN == 1
// * EventSource.CLOSED == 2
// When establishing a connection or when a connection was lost that property is automatically updated with a CONNECTING state value.

// EventSource generates 3 types of events:
// * message
// * open
// * error
// A server could send another custom-defined messages. To make so it must prepend the 'event: ...' string before the 'data:...' line in a message:
/*
    event: join
    data: Bob
 */
// To handle those events a client must use the addEventListener() method with the according event name:
eventSource.addEventListener('join', function(event) {
    console.log(`${event.data} joined`);
});