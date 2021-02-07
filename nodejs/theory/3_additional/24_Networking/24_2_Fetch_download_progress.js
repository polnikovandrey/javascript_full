'use strict';           // jshint ignore: line

// The fetch() method could be used to monitor a download progress. The fetch() method has no ability to monitor the upload progress, use XMLHttpRequest for that.
// To monitor a download progress the response.body property could be used, which is a ReadableStream object.
// Unlike response.text() and response.json(), response.body gives full control over the download process.
// Note: example doesn't work in NodeJS due to the different NodeJs fetch() implementation (response has no body.getReader() method).
import fetch from 'node-fetch';
(async function() {
    const response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    let receivedLength = 0;
    let chunks = [];
    while(true) {
        const {done, value} = await reader.read();      // [done] - true for the last chunk of data, [value] - Uint8Array data chunk
        if (done) {
            break;
        }
        chunks.push(value);
        receivedLength += value.length;
        console.log(`Acquired ${value.length} of ${contentLength} bytes.`);
    }
    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
    }
    const result = new TextDecoder('utf-8').decode(chunksAll);
    const commits = JSON.parse(result);
    console.log(commits[0].author.login);
})();