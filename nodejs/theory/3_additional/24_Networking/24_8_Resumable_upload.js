'use strict';       // jshint ignore: line

// Resumable upload.
// The 'progress' event could be used to resume the upload, because it indicates the sent data, which possibly wasn't acquired by the server.
// So to resume the upload a special request must be performed to get the actual number of bytes acquired by the server.
// The server must support that type of request of course.

async function resumableUpload(file, fileName, fileSize) {
    const uniqueFileId = fileName + '_' + fileSize + '_' + file.lastModifiedDate;
    const response = await fetch('status', {
        headers: {
            'X-File-Id': uniqueFileId
        }
    });
    const startByte = +await response.text();       // The server must implement 'X-File-Id' header processing and return the byte to start upload from.
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload', true);
    xhr.setRequestHeader('X-File-Id', uniqueFileId);
    xhr.setRequestHeader('X-Start-Byte', startByte);
    xhr.upload.onprogress = e => {
        console.log(`Uploaded ${startByte - e.loaded} of ${startByte + e.total}`);
    };
    xhr.send(file.slice(startByte));
}