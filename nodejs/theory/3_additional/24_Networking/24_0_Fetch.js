'use strict';       // jshint ignore: line

// AJAX - Asynchronous Javascript and XML
// Method fetch() is a modern progressive method to communicate a server. There is a polyfill for older browsers.

// const responsePromise = fetch(url, [options]);       // a promise contains an object op the Response class
// Without options it's a simple GET request.
// In case when server responded with a 4xx or 5xx status - promise will not resolve to an error, the Response object will be the result with the according status code.

// A Response object has properties:
//  * status, a 3-digit code number
//  * ok - a boolean value, true if the status is in range 200-299
//  * body - a ReadableStream object

// A Response object has methods to read a body more conveniently:
//  * response.text()
//  * response.json()
//  * response.formData() - returns a FormData object
//  * response.blob()
//  * response.arrayBuffer()
// Note: a single Response object could use only one of those methods and only once. Next calls will produce an error.

// Response headers are under the response.headers Map-like object.

import fetch from 'node-fetch';

(async function fetchExample1() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (response.ok) {
        const json = await response.json();
        console.log(json);                                      // Output: { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
        console.log(json.userId);                               // Output: 1
        console.log(response.headers.get('Content-Type'));      // Output: application/json; charset=utf-8
    } else {
        console.error(`Http error: ${response.status}`);
    }
})();

// Of course there is no need to use async/await - regular promises could be used to handle a fetch() call.
(function fetchPromiseExample1(){
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json));           // Output: { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
})();

// To set a request header fetch()'s [headers] argument could be used.
(async function fetchExample2() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', { headers: { Authentication: 'secret' }});
    console.log(`GET response status ${response.status}`);      // Output: GET response status 200
})();
// There is a list of restricted headers, which couldn't be set manually:
// * Accept-Charset, Accept-Encoding
// * Access-Control-Request-Headers
// * Access-Control-Request-Method
// * Connection
// * Content-Length
// * Cookie, Cookie2
// * Date
// * DNT
// * Expect
// * Host
// * Keep-Alive
// * Origin
// * Referer
// * TE
// * Trailer
// * Transfer-Encoding
// * Upgrade
// * Via
// * Proxy-*
// * Sec-*
// Those headers are provided by a browser only.

// To send a POST request additional parameters should be provided:
// * method - HTTP-method string value, e.g. 'POST'
// * body - one of:
//      ** String - e.g. json
//      ** FormData - to send data as form/multipart)
//      ** Blob/BufferSource - to send a binary data
//      ** URLSearchParams - to send data as x-www-form-urlencoded, rarely used
(async function fetchPostExample1() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            // Note: since body value is a string - the default Content-Type is a 'text/plain;charset=UTF-8'. So a correct Content-Type is needed to pass a json data.
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
    console.log(`POST response status ${response.status}`);     // Output: POST response status 201
})();

// To send a binary data (e.g. image) - the same procedure should be used. In that case the [body] value takes a Blob object. And since a blob contains a type property,
// which automatically becomes a Content-Type of the request - there is no need to override that header.