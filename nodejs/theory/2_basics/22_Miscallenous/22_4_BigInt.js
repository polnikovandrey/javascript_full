'use strict';       // jshint ignore: line

// BigInt is used to store an integer number of an arbitrary length. To create a BigInt value a number literal should be supplemented with 'n' at the end or a BigInt
// function should be used with an argument of a number, string, ... type.

// JsHint doesn't recognize BigInt at the moment - ignoring.
// jshint ignore: start

const aBigInt = 598945646546546546546577676373n;
const sameBigIn1t = BigInt("598945646546546546546577676373");
const sameBigInt2 = BigInt(598945646546546546546577676373);

// BigInt is used as a common number. All operations with BigInt operands return a BigInt result. BigInt is an integer, the floating part is being discarded.
console.log(1n + 2n);           // Output: 3n
console.log(5n / 2n);           // Output: 2n

// BigInt operands couldn't be mixed with a regular numbers when performing arithmetic operations.
// console.log(2n + 1);         // TypeError: Cannot mix BigInt and other types, use explicit conversions
// To be used those operands should be cast to the same type with one of BigInt() or Number().
console.log(2n + BigInt(1));        // Output: 3n
console.log(Number(2n) + 1);        // Output: 3
// When converting a BigInt value to a number with Number() - the overflowing part (if any) is discarded silently.

// A unary plus operator couldn't be used to convert a BigInt to a number.
// console.log(+aBigInt);                   // TypeError: Cannot convert a BigInt value to a number

// Comparing operations <, >, <=, >=, == could mix BigInt and regular numbers.
console.log(1n > 2);            // Output: false
console.log(2n == 2);           // Output: true
// But not the strict equals operator === because the type is different.
console.log(2n === 2);          // Output: false

// Logic operations work with BigInt as with regular numbers.
if (0n) {               // 0n == false, the rest BigInt == true
    console.log(0n);
}
console.log(1n || 2);       // Output: 1n
console.log(0n || 2);       // Output: 2

// There is no polyfill for a BigInt - it's too complex to implement. But there is a library JSBI, which could be used to replace all native BigInt usages.
// If JSBI is used - the Babel could be used to transform JSBI to native BigInt where possible.

// jshint ignore: end