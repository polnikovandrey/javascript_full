// jshint ignore: line

// ArrayBuffer is a link to the fixed size solid memory area.
const byteLength = 16;
const buffer = new ArrayBuffer(byteLength);     // The length is equal to size in memory, is fixed and couldn't be changed.
console.log(buffer.byteLength);                 //  Output: 16

// ArrayBuffer data could be accessed only with the help of special view objects (various TypedArray implementations), which interpret ArrayBuffer object's raw data:
// * Uint8Array - 8-bit unsigned integer. Interprets each ArrayBuffer's byte as a distinct number (0-255 range because each byte has only 8 bits).
// * Int8Array - 8-bit signed integer.
// * Uint16Array - 16-bit unsigned integer. Interprets every 2 bytes as a number (0-65535 range).
// * Int16Array - 16-bit signed integer.
// * Uint32Array - 32-bit unsigned integer. Interprets every 4 bytes as a number (0-4294967295 range).
// * Int32Array - 32-bit signed integer.
// * Uint8ClampedArray - 8-bit unsigned integer. Values are being trimmed by maximum and minimum available range upon being set.
// * Float32Array - Interprets every 4 bytes as a floating-point number.
// * Float64Array - Interprets every 8 bytes as a floating-point number (5*10^-324 - 1.8*10^308 range).
const view = new Uint32Array(buffer);
console.log(Uint32Array.BYTES_PER_ELEMENT);     // Output: 4
console.log(view.length);                       // Output: 4        Number of 32-bit unsigned integers, stored in the ArrayBuffer object.
console.log(view.byteLength);                   // Output: 16       Number of bytes.
view[0] = 123456;
console.log(view.join('; '));                   // Output: 123456; 0; 0; 0

// There are 5 common constructors for TypedArray implementations:
// * new TypedArray(buffer, [byteOffset], [length])
// * new TypedArray(object);                // object is an Array type or an array-like type.
// * new TypedArray(typedArray);
// * new TypedArray(length);
// * new TypedArray();
const uint8Array = new Uint8Array([0, 1, 2, 3]);        // Note convenient constructor usage.
console.log(uint8Array.length);                                 // Output: 4
console.log(uint8Array[1]);                                     // Output: 1
const uint16Array = new Uint16Array([1, 1000]);
const toUint8Array = new Uint8Array(uint16Array);               // uint16Array buffer will be copied into the new buffer.
console.log(uint16Array.buffer === toUint8Array.buffer);        // Output: false
console.log(toUint8Array[1]);                                   // Output: 232              // Not 1000, because it doesn't feet in 8 bits.

const uint16Array1 = new Uint16Array(4);
console.log(Uint16Array.BYTES_PER_ELEMENT);                     // Output: 2
console.log(uint16Array1.byteLength);                           // Output: 8                // = length * bytes per element.

const uint16Array2 = new Uint16Array();                         // Empty ArrayBuffer was created under the hood.
console.log(uint16Array2.buffer);                               // Output: ArrayBuffer { [Uint8Contents]: <>, byteLength: 0 }
console.log(uint16Array2.byteLength);                           // Output: 0

const uint8Array1 = new Uint8Array(uint16Array2.buffer);        // Another view for the same buffer (buffer won't be copied).
console.log(uint16Array2.buffer === uint8Array1.buffer);        // Output: true

// In the case a TypedArray value available range is exceeded - the senior bits are being discarded.
const uint8Array2 = new Uint8Array(16);
const num = 256;
console.log(num.toString(2));                             // Output: 100000000
uint8Array2[0] = num;
uint8Array2[1] = num + 1;
console.log(uint8Array2[0]);                                    // Output: 0                        00000000
console.log(uint8Array2[1]);                                    // Output: 1                        00000001
// On the contrary Uint8ClampedArray truncates values to the range 0-255 (0 for any negative value).
const uint8ClampedArray = new Uint8ClampedArray(32);
uint8ClampedArray[0] = num;         // 256
uint8ClampedArray[1] = num + 1;     // 257
uint8ClampedArray[2] = -1;          // -1
uint8ClampedArray[3] = num - 1;     // 255
uint8ClampedArray[4] = 0;           // 0
console.log(uint8ClampedArray[0]);              // Output: 255
console.log(uint8ClampedArray[1]);              // Output: 255
console.log(uint8ClampedArray[2]);              // Output: 0
console.log(uint8ClampedArray[3]);              // Output: 255
console.log(uint8ClampedArray[4]);              // Output: 0

// TypedArray objects have methods almost common to the Array object (map, slice, find, reduce, ...).
// But TypedArray objects have no Array's methods splice (ArrayBuffer's length couldn't be changed) and concat.
// But TypedArray has 2 additional methods:
// * arr.set(fromArr, [offset])     // copies all elements starting from offset (0 by default).
// * arr.subarray([begin, end])     // creates new view of the same ArrayBuffer range. Common to slice, but doesn't copy ArrayBuffer.

// DataView is a special super-agile non-typed view of ArrayBuffer. It makes possible to operate data at any position and of any type.
// ArrayBuffer's data could be accessed by the set of methods like getUint8(i), getUint16(i), ....
// DataView is very convenient in case of different data types stored within a single ArrayBuffer.
// Constructor: new DataView(buffer, [byteOffset], [byteLength])
const aBuffer = new Uint8Array([255, 255, 255, 255]).buffer;
const dataView = new DataView(aBuffer);
console.log(dataView.getUint8(0));                              // Output: 255
console.log(dataView.getUint16(0));                             // Output: 65535
console.log(dataView.getUint32(0));                             // Output: 4294967295
dataView.setUint32(0, 0);                                 // Every byte is filled with zeros.
console.log(dataView.getUint8(0));                              // Output: 0
console.log(dataView.getUint16(0));                             // Output: 0
console.log(dataView.getUint32(0).toString(2));            // Output: 0

// There are 2 commonly used definitions:
// * ArrayBufferView means any view of some ArrayBuffer
// * BufferSource means any ArrayBuffer or any ArrayBufferView