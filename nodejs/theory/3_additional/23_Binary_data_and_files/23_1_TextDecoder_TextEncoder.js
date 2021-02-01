// jshint ignore: line

// TextDecoder is intended to decode a binary data into a string.

// const decoder = new TextDecoder([label], [options]);
//  * [label] - 'utf-8' default / 'big5' / 'windows-1251' / ...
//  * [options] - an object with possible properties:
//      ** [fatal]: true - generates an error for invalid (couldn't be decoded) symbols, false - replaces invalid symbols with \uFFFD.
//      ** [ignoreBOM]: true - additional bytes order sign will be ignored (rarely used)
// const decoded = decoder.decode([input], [options]);
//  * [input] - binary BufferSource for decoding
//  * [options] - an object with additional property:
//      ** [stream]: true - activate stream decoding mode (decoder is being called multiple times for each data chunk of a stream). That option handles the case
//                          when an multi-bytes symbol could be divided between two neighboring data chunks).

const uint8array = new Uint8Array([ 72, 101, 108, 108, 111 ]);
console.log(new TextDecoder().decode(uint8array));                  // Output: Hello
const chineseUint8Array = new Uint8Array([ 228, 189, 160, 229, 165, 189 ]);
console.log(new TextDecoder().decode(chineseUint8Array));           // Output: 你好
// A part of an array could be decoded. Note - the subarray() method creates a view of an array (data is backed by the original array).
const someBigUint8Array = new Uint8Array([ 0, 72, 101, 108, 108, 111, 0 ]);
const someBigUint8Subarray = someBigUint8Array.subarray(1, -1);
console.log(new TextDecoder().decode(someBigUint8Subarray));        // Output: Hello

// On the contrary TextEncoder encodes a string into a binary array. Utf-8 is the only one supported by the TextEncoder.
// TextEncoder.encode(str) - returns a Uint8Array, containing the encoded [str] string.
// TextEncoder.encodeInto(str, destination) - the same as encode(), but puts the result into the [destination] Uint8Array object.

const encoder = new TextEncoder();
const encodedUint8Array = encoder.encode('Hello');
console.log(encodedUint8Array);         // Output: Uint8Array(5) [ 72, 101, 108, 108, 111 ]