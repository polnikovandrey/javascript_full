// jshint ignore: line

// ArrayBuffer and binary arrays are parts of the ECMA-standard. They both are intended to store a 'binary-data'. Blob is a part of browser's FileAPI specification.
// A Blob object contains an optional [type] property of a string type (usually with a MIME-type value) and a [blobParts] array, which contains a sequence
// of other Strings, BufferSource and other Blob objects. The [type] property makes it possible to upload/download Blob object with the Content-Type of a request
// equal to the [type]'s value. So a Blob is a 'binary-data' with a 'type';

// new Blob([blobParts], [options]);
//  * [blobParts]: an array of String/Blob/BufferSource objects
//  * [options]: an object with optional settings:
//      ** [type]: usually a MIME-type, e.g. 'image/png'
//      ** [endings]: 'transparent' by default - noop, 'native' - line breaks will be transformed according to the current OS ('\r\n' or '\n').

const blob = new Blob(["<html lang='ru'>...</html>"], { type: 'text/html' });
const hello = new Uint8Array([ 72, 101, 108, 108, 111 ]);
const anotherBlob = new Blob([hello, ' ', 'world!'], { type: 'text/plain' });

// One could acquire a blob's slice with the Blob.slice() method. Blobs are immutable objects, so a new Blob object will be returned by slice().
// blob.slice([byteStart], [byteEnd], [contentType]);
//  * [byteStart]: starting byte position, 0 by default. Negative value is allowed (like the array.slice() method).
//  * [byteEnd]: last byte position, the very last byte by default. Negative value is allowed (like the array.slice() method).
//  * [contentType]: a new Blob object's [type] value, original Blob's type by default.

/* A Blob object could be used as an URL for an <a>, <img> and other tags, containing the URL.
<a id="link" download="hello.txt" href="#">Download</a>
<script>
    const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
    link.href = URL.createObjectURL(blob);
</script>
 */

/* A little bit more complicated example of dynamic link creation and loading on the fly.
    const link = document.createElement('a');
    link.download = 'hello.txt';
    const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
 */

// URL.createObjectURL() creates a unique URL of the following type: 'blob:<origin>/<uuid>'. E.g.: blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273.
// A browser under the hood creates a link between such URL and a Blob object, so such a short URL could be used to access a big Blob object. The generated URL is
// valid until the corresponding document is open. URL.revokeObjectURL() method could be used to make document forget the link and free the memory range,
// containing the Blob object (if there are no more links to that object), at any time.

// The alternative to the URL.createObjectURL() is the method for creation a base64 string, which could also be used as an URL (data-url).
// Data-url has the following format: 'data:[<mediaType>][;base64],<data>'. E.g.:
// <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
// A browser has a class FileReader, which could be used to transform a Blob objet to a base64 url.
/*
    const link = document.createElement('a');
    link.download = 'hello.txt';
    const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function() {
        link.href = reader.result;
        link.click();
    };
 */

// URL.createObjectURL() method is more quick and safe comparing to the data-url variant.
// URL.createObjectURL() features (pluses/minuses): a special method should be called to free up memory, direct access to a Blob object without encoding/decoding.
// Data-url features: no need to free up memory manually, low performance and high memory load in the process of decoding large Blob objects.

/* A Canvas.toBlob(callback, format, quality) method could be used to store a document image, a part of an image or a screenshot into a Blob object.
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    canvas.toBlob(function(blob) {
        const link = document.createElement('a');
        link.download = 'example.png';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    }, 'image/png');
        // Alternatively 'await' could be used instead of a callback function.
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
*/

// The Blob class has a number of constructors to create a Blob representation of the different data types, including the BufferSource.
/* To convert a Blob to the ArrayBuffer object - a FileReader class could be used.
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(blob);
    fileReader.onload = function(event) {
        const arrayBuffer = fileReader.result;
    };
 */
