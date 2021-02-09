'use strict';       // jshint ignore: line

// https://learn.javascript.ru/fetch-api
/* The list of all possible fetch() method options:
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "text/plain;charset=UTF-8" // The value usually is supported automatically according to the body of a request.
  },
  body: undefined, // string, FormData, Blob, BufferSource или URLSearchParams
  referrer: "about:client", // or some url of the current origin, or an empty string "" to prevent sending the Referer header
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache или only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // checksum, e.g. "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController to abort the request
  window: window // null
});
*/