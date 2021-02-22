'use strict';           // jshint ignore: line

// To handle client-server interactions a number of methods-technologies could be used:
// 1. Repeating requests with a timer - the simplest and obviously the worst method.
// 2. WebSocket
// 3. Server Sent Events
// 4. Long Poll pattern

// The Long Poll is a technic which makes possible to get the server response when there is a new data.
// Client sends a request and server accepts it and holds a connection until there is no new data to respond with.
// Client recursively calls a request method on each request resolving - whether it's a response, an error or a timeout.

async function subscribe() {
    const response = await fetch('/subscribe');
    if (response.status === 502) {          // A server or a proxy timeout.
        await subscribe();
    } else if (response.status !== 200) {   // Some error.
        console.log(response.statusText);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await subscribe();
    } else {
        const message = await response.text();
        console.log(message);
        await subscribe();
    }
}

// A server must support such requests and it's architecture must meet the pattern requirements. Each client instantiates a connection and the
// server must store and maintain it. So, some server architectures lack the ability to effectively maintain such connections. Sometimes the problem
// becomes actual for PHP and Ruby servers. NodeJs is convenient for that pattern application.
// The minus of the pattern - each response is a distinct request/response pair with headers, authorization and so on. So it's not efficient enough
// to handle huge number of requests. It that case the WebSocket or Server Sent Events methods could be used.