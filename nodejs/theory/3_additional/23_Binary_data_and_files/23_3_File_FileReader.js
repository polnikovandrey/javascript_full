'use strict';           // jshint ignore: line

// A File object extends a Blob object. It has 2 additional properties:
//  * name - holds a filename.
//  * lastModified - a timestamp (unsigned number, e.q. 1552830408824).

// There are 2 ways of obtaining a File object:
//  1. Using a constructor (similar to a Blob's constructor):
//      new File(fileParts, fileName, [options]);
//          * fileParts - an array of String/Blob/BufferSource values
//          * fileName - String
//          * options - an object with a [lastModified] property (timestamp)
//  2. Obtain from a browser element or event (<input type="file">, drop event, paste event, ...).

//  <input type="file" onchange="showFile(this)">
//  <script>
//      function showFile(input) {
//          const file = input.files[0];
//          console.log(`${file.name} ${file.lastModified}`);
//      }
//  </script>


// A FileReader is intended to read a Blob (so as File) data.
/* Commented out since NodeJS doesn't support the File class.
    const file = new File(['data'], 'file.txt');
    const reader = new FileReader();
    const arrayBuffer = reader.readAsArrayBuffer(file);
    const text = reader.readAsText(file, 'uft-8');      // encoding is optional and is the 'uft-8' by default.
    const base64URL = reader.readAsDataURL(file);
    reader.abort();                                             // abort a read operation
 */
// Note: in many cases there is no need to read a file. It's sometimes sufficient to create a short url with the URL.createObjectURL(file) method and use the result
// to fill an <a> or <img> tag's attribute. That method is suitable to make a file downloadable to a user, to show a file as an image, to fill the canvas and so on.
// The same is actual for uploading a file - networking classes and methods support the File object. E.g. both XMLHttpRequest and fetch() support File objects.

// Since reading from a filesystem is a continuous process - the process of obtaining the data is event-based. There is a number of according events:
// * loadstart
// * progress
// * load - reading was finished successfully (without any error)
// * abort - the abort() method was called
// * error
// * loadend - reading was finished (with/without an error)
// After the loadend event the data could be obtained in two ways:
// * reader.result - in case of success
// * reader.error - in case of error

/*
    <input type="file" onchange="readFile(this)">
    <script>
        function readFile(input) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function() {
                console.log(reader.result);
            };
            reader.onerror = function() {
                console.log(reader.error);
            };
        }
    </script>
 */

// Since FileReader is compatible not only with File objects, but with Blob objects too - it can be used to convert a Blob to the number of other formats:
// * readAsArrayBuffer(blob) - the result is ab ArrayBuffer object
// * readAsText(blob, [encoding]) - the result is a String
// * readAsDataURL(blob) - the result is a base64-encoded URL

// There is a worker-compatible variant of a FileReader - FileReaderSync. The set of methods is the same, but it's methods return results (since the delays
// during the read process are much less important for a background worker comparing with a normal script).