'use strict';       // jshint ignore: line

/* ----- Via https://learn.javascript.ru/number ----- */

console.log((123).toString());              // Output: 123          Parentheses are used to call a method on a number literal.
// console.log(123..toString());            // Note double dot usage. Bad practice, but could be used instead of parentheses to call a method on a number literal.

/* ----- Exponential numbers ----- */
const billion = 1000000000;
const eBillion = 1e9;                           // NeM means N * (1 with M zeros to the right). In this example: N === 1, M === 9.
console.log(billion === eBillion);              // Output: true

console.log(3.14e3 === 3140);                   // Output: true
const floating = 0.001;
const eFloating = 1e-3;                         // Ne-M means N * (1 with M zeros to the left)
console.log(floating === eFloating);            // Output: true

console.log(3.14e-3 === 0.00314);               // Output: true

/* ----- Numeral systems ----- */
const binary = 0b11111111;
console.log(binary);                            // Output: 255

const octal = 0o377;
console.log(octal);                             // Output: 255

const hexadecimal = 0xff;
console.log(hexadecimal);                       // Output: 255
console.log(0xff === 0xFF);                     // true, hex numbers are case insensitive.

const decimal = 255;
console.log(decimal.toString());              // Output: 255        Default radix is 10. Available range for radix is 2-36.
console.log(decimal.toString(2));       // Output: 11111111
console.log(decimal.toString(8));       // Output: 377
console.log(decimal.toString(16));      // Output: ff


/* ----- Rounding a number ----- */
console.log(Math.floor(3.1));           // Output: 3            Math.floor() rounds a number to a lesser integer number.
console.log(Math.floor(-3.1));          // Output: -4

console.log(Math.ceil(3.1));            // Output: 4            Math.ceil() rounds a number to a greater integer number.
console.log(Math.ceil(-3.1));           // Output: -3

console.log(Math.round(3.4));           // Output: 3            Math.round() rounds a number to a closes integer number.
console.log(Math.round(3.5));           // Output: 4            Half-numbers a rounded to a greater integer number (4 > 3);
console.log(Math.round(3.6));           // Output: 4
console.log(Math.round(-3.4));          // Output: -3
console.log(Math.round(-3.5));          // Output: -3           Half-numbers a rounded to a greater integer number (-3 > -4)
console.log(Math.round(-3.6));          // Output: -4

console.log(Math.trunc(3.4));           // Output: 3            Math.trunc() is not supported in IE. Truncates the floating part of a number.
console.log(Math.trunc(3.6));           // Output: 3
console.log(Math.trunc(-3.4));          // Output: -3
console.log(Math.trunc(-3.6));          // Output: -3

const toTruncate = 1.98765;                                         // 2 methods could be used to truncate a floating part to some number of digits after floating point.
console.log(Math.floor(toTruncate * 100) / 100);                 // Output: 1.98         Math.trunc() analog. 1.98765 => 198.765 => 198 => 1.98
console.log(toTruncate.toFixed(2));                     // Output: 1.99         Truncates by rounding with Math.round() rules. Result is a string!
console.log((1.1).toFixed(5));                          // Output: 1.10000      Appends zeros to the result string to have appropriate fraction digits.
console.log(Number((1.1).toFixed(5)));                  // Output: 1.1          Method 1 to convert '1.10000' string to a 1.1 number.
console.log(+(1.1).toFixed(5));                         // Output: 1.1          Method 2 to convert '1.10000' string to a 1.1 number.


/* ----- Approximate computing (неточные вычисления) ----- */
// Js numbers are double precision floating point numbers. They are stored as 64 bits values. 2^53 - -2^53 range is supported. BigInt should be used outside of this range.
// 52 bits are used to store a cyphers, 11 bits - to store floating point position (0 is stored for an integer number), 1 bit - to store a sign.
// Note: There are two zeros in fact: 0 and -0, because of a sign bit. But JS interpreter handles that, so that this fact is invisible.

// console.log(1e500);              // Output: infinity             64 bits overflow

// Numbers are stored in binary format in js.
// (someDecimal / 10) is precise value in a decimal numeral system. 1/10 = 0.1. So as (someBinary / 2) - precise value.
// But (someDecimal / 3) is a number with the infinite floating part  in a decimal numeral system. 1/3 = 0.333(3). So as (someBinary / 10) - infinite floating number.
// IEEE-754 is a standard, used in JS, PHP, Java, C, Perl, Ruby, ...
// IEEE-754 standard resolves infinity numbers by rounding to the greatest fraction available.
// That is the reason for approximation while calculating expressions, containing numbers with floating point.
console.log(0.1 + 0.2 === 0.3);                     // Output: false                    The reason is below
console.log(0.1 + 0.2);                             // Output: 0.30000000000000004      !== 0.3
console.log((0.1).toFixed(20));         // Output: 0.10000000000000000555

console.log((0.1 + 0.2).toFixed(2));    // Output: 0.30         To operate and compare floating point numbers toFixed() method could be used.
console.log(+(0.1 + 0.2).toFixed(2));   // Output: 0.3          Or +N.toFixed() if number result is needed instead of a string.

console.log(((0.1 * 10 + 0.2 * 10) / 10));          // Output: 0.3                      Multiply/divide method could be used also.
console.log(((0.28 * 100 + 0.14 * 100) / 100));     // Output: 0.4200000000000001       But approximation applies when dividing is performed... toFixed() method is preferred.

console.log(9999999999999999);              // Output: 10000000000000000        Reason: 52 bits overflow


/* ----- isFinite(), isNan(), Object.is() ----- */
// Infinity, -Infinity and NaN are number values. Infinity and -Infinity are special infinity values. NaN is interpreted as an error.
console.log(isNaN(NaN));                    // Output: true
// console.log(isNaN('some string'));       // Output: true
// console.log(NaN === NaN);                // Output: false            NaN is not equal to anything, even to itself.

// console.log(isFinite('123'));            // Output: true    isFinite() converts argument to a number, and returns true if result is a number and not NaN, Infinity and -Infinity.
// console.log(isFinite('abc'));            // Output: false   NaN
console.log(isFinite(Infinity));            // Output: false   Infinity
// isFinite() could be used to check if a string value contains a number (besides NaN, Infinity and -Infinity). But:
console.log(isFinite(''));          // Output: true    Empty string is interpreted as 0.

// Object.is() could be used to compare numbers. Advantages:
console.log(Object.is(NaN, NaN));                // Output: true        Instead of NaN === NaN false result.
console.log(0 === -0);                           // Output: true        But:
console.log(Object.is(0, -0));     // Output: false       Technically, 0 and -0 are different numbers.
console.log(Object.is('a', 'a'));  // Output: true        The rest logic is analogous to the === comparison.


/* ----- parseInt(), parseFloat() ----- */
console.log(+'1000');                       // Output: 1000         Converting a string to a number.
console.log(+' 1000 ');                     // Output: 1000         Spaces are ignored.
console.log(+'1000px');                     // Output: NaN          Other string values with non-numeric symbols are treated as NaNs.
console.log(parseInt('1000px'));         // Output: 1000        Parses a string until part of a string is parsable to a number, 'px' part is ignored.
console.log(parseInt('1000.11px'));      // Output: 1000        Part after floating point is ignored.
console.log(parseFloat('3.14em'));    // Output: 3.14
console.log(parseFloat('3.14.14'));   // Output: 3.14       Part after second dot, including second dot, is ignored.
console.log(parseInt('a1000'));          // Output: NaN         The first symbol is NaN.
console.log(parseFloat('a3.14'));     // Output: NaN
console.log(parseInt('0xff', 16));  // Output: 255       Second argument is a radix (numeral system).
console.log(parseInt('ff', 16));    // Output: 255       Works even without 0x notation.
console.log(parseInt('2n9c', 36));  // Output: 123456    36-radix numeral system range is 0-9a-z.


/* ----- Math.random(), Math.min(), Math.max(), Math.pow() ----- */
console.log(Math.random());                    // Returns pseudo-random numbers [0..1). Possible result includes 0, doesn't includes 1.
console.log(Math.min(-1, 0, 1, 2));     // Output: -1          Result is the lesser argument, number of arguments is arbitrary.
console.log(Math.max(-1, 0, 1, 2));     // Output: 2           Result is the greatest argument, number of arguments is arbitrary.
console.log(Math.pow(2, 10));           // Output: 1024         2^10


/* ----- Miscellaneous ----- */
console.log('1' + '2');                             // Output: 12
console.log(+'1' + (+'2'));                         // Output: 3        +'some string' converts string to a number.

console.log((1.35).toFixed(1));         // Output: 1.4      Is rounded to a greater number because of approximation, 1.35 === 1.3500000..08882 in fact.
console.log((6.35).toFixed(1));         // Output: 6.3      Is rounded to a lesser number because of approximation, 6.35 === 6.3499999..964473 in fact.
console.log(Math.round(6.35 * 10) / 10);         // Output: 6.4      * 10 / 10 method is used for the correct rounding.