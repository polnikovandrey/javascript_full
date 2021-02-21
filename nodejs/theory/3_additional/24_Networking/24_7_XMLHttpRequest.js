'use strict';       // jshint ignore: line

// XMLHttpRequest is the browser built-in object for performing http requests without page reloading.
// fetch() is a modern method to make such requests, but XMLHttpRequest stays actual for 3 reasons:
// 1. there are many usages of that object by older code, which must be supported.
// 2. it's good at older browsers support if using a polyfill is not an option (e.g. because of code size economy).
// 3. fetch() couldn't be used to monitor upload progress, XMLHttpRequest is able to handle the upload progress.

// There are two modes of XMLHttpRequest usage - synchronous and asynchronous. Asynchronous mode is most popular.

// There is only one constructor of XMLHttpRequest and it's empty.
const xhr = new XMLHttpRequest();

// To initialize the xhr object the open() method must be used:
// xhr.open(method, URL, [async, user, password]);
// Where:
// * [method] - GET, POST, ...
// * [URL] - a string url or an URL object
// * [async] - true/false (true by default)
// * [user][password] - for basic authentication if needed
xhr.open('GET', 'http://www.google.com');

// Method open() doesn't open a connection nor performs a request. The method send() must be used to do so.
// xhr.send([body]);
xhr.send();

xhr.timeout = 10000;        // The request will be aborted and a timeout even will be fired.

// Optional property xhr.responseType could be set to set the expected response type.
xhr.responseType = '';
// Possible values:
// * '' - by default - a string response type is expected
// * 'text' -
// * 'arrayBuffer'
// * blob
// * document - xml-document
// * json



// Event listeners could be used to handle a request lifecycle:
xhr.onload = function() {
    console.log(`Loaded: ${xhr.status} ${xhr.statusText} ${xhr.response}`);         // 200 OK [aResponseBodyContents]
};
xhr.onerror = function() {
    console.log('Fatal request error');
};
xhr.onprogress = function (event) {
    const loaded = event.loaded;                            // bytes loaded.
    const lengthComputable = event.lengthComputable;        // true if the server provides the Content-Length header.
    const total = lengthComputable ? event.total : '?';     // total bytes to load (if lengthComputable === true).
    console.log(`Loaded ${loaded} of ${total}`);
};
xhr.timeout = function() {
    console.log('Timeout');
};
// The list of possible events:
// * loadstart
// * progress - acquired by the time part of a data could be accessed using the xhr.responseText() property.
// * abort - after the xhr.abort() method call.
// * error - non-HTTP error, e.g. incorrect domain name.
// * load
// * timeout
// * loadend - after any of the set load/error/timeout/abort event. Only one event of that set could be fired.

// XMLHttpRequest object has the [readyState] property, which stores the actual state of the request:
// * 0 - UNSENT, initial state.
// * 1 - OPENED, open() method was called.
// * 2 - HEADERS_RECEIVED, request headers where received.
// * 3 - LOADING, request data was partially acquired.
// * 4 - DONE, request was finished.
// On each state change the [readystatechange] event is being fired.
xhr.onreadystatechange = function() {
    console.log(`${xhr.readyState}`);
};
// [readystatechange] event is a legacy method to handle the state of the request. It was used before [load], [error], [progress], ... events where added to the XMLHttpRequest.

// To prevent sending a request - the abort() method could be used. After that the [abort] event is fired and the [status] becomes 0 (UNSENT).
// xhr.abort();

// Synchronous request blocks the script execution on the send() method call and resumes after the response was acquired.
// It's not recommended to use that type of a request because of blocking and because of limitations (synchronous request couldn't be used to contact another domain,
// a timeout couldn't be set, the progress couldn't be handled, ...).
const syncXhr = new XMLHttpRequest();
syncXhr.open('GET', 'http://www.some.url', false);


// XMLHttpRequest object could be used to set the request headers, as like as get the response headers.
// To set a request header the setRequestHeader() method could be used. The header added couldn't be deleted nor overwritten. The value will be added if the same header is
// being set twice.
syncXhr.setRequestHeader('Content-Type', 'application/json');
syncXhr.setRequestHeader('Content-Type', 'text/html');      // Now the [Content-Type] value is 'application/json text/html'.
// To get a response header:
syncXhr.getResponseHeader('Content-Type');
// To get all response headers (excluding 'Set-Cookie' and 'Set-Cookie2'):
const allResponseHeaders = syncXhr.getAllResponseHeaders();
// A string of headers is returned with '\r\n' new lines (regardless OS) and ': ' between headers and values.
/*
Cache-Control: max-age=31536000
Content-Length: 4260
...
 */
// That string could easily be transformed to the object:
const headers = allResponseHeaders
    .split('\r\n')
    .reduce((result, current) => {
        const [name, value] = current.split(': ');
        result[name] = value;
        return result;
    });


// POST request with FormData ('multipart/form-data' encoding):
/*
    <form name="person">
        <input name="name" value="Pete">
        <input name="surname" value="Walsh">
    </form>
    <script>
        const formData = new FormData(document.forms.person);
        formData.append("middle", "Terence");                   // Adding additional property.
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/some/url');
        xhr.send(formData);
        xhr.onload(() => console.log(xhr.response));
    </script>
 */

// To send a json data:
const jsonXhr = new XMLHttpRequest();
const json = JSON.stringify({
    name: "Pete",
    surname: "Walsh",
    middle: "Terence"
});
jsonXhr.open('POST', '/some/url');
jsonXhr.setRequestHeader('Content-Type', 'application/json');
jsonXhr.send(json);

// XMLHttpRequest and upload (request) progress.
// There is a special property xhr.upload to handle the upload progress. It generates events during the upload progress (the same list as for response):
// * loadstart
// * progress
// * abort
// * error
// * load
// * timeout
// * loadend
jsonXhr.upload.onprogress = function(event) {
    console.log(`Sent ${event.loaded} of total ${event.total} bytes.`);
};

// As like as fetch(), XMLHttpRequest could be used to request another origin. Cookies and HTTP authorization headers are skipped by default. To change that behavior:
xhr.withCredentials = true;