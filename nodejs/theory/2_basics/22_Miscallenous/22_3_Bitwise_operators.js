'use strict';           // jshint ignore: line

// Bitwise operators treat operands as a sequence of 32 bits (0 and 1). They perform operations, using a number's binary representation, and return a result
// as a 32 bits number. That particular representation is being called:
// 'a 32-bit signed integer with most significant bit first and two’s complement'.
// '32-битное целое со знаком, старшим битом слева и дополнением до двойки'.
// 'Most significant bit first' means the natural order of digits significance, from the most significant to the least significant. In case of absence of
// more significant digit - according bit is implied 0.
// 'Two's complement' is one of the methods to support signed numbers: negative number is a positive number, whose bits are reverted with addition of 1. I.e.
// every 0 is being replaced with 1, every 1 is being replaced with 0, and 1 is being applied to the result:
// 00000000000000000000000100111010         314
// 11111111111111111111111011000101                     every bit was reverted
// 11111111111111111111111011000110         -314        + 1
// 'Two's complement' method means that every 32 bit number starting with 0 is positive, with 1 - is negative. That is why the most significant bit is being
// called also a 'sign bit'.

// Here is the list of bitwise operators:
// a & b        AND                                 a == 1 && b == 1                                =>      1
// a | b        OR                                  a == 1 || b == 1                                =>      1
// a ^ b        XOR                                 (a == 1 && b == 0) || (a == 0 && b == 1)        =>      1
// ~a           NOT                                 1 => -1     -1 => 1
// a << b       LEFT SHIFT                          moves a's bits b digits left, applying zeros to the right
// a >> b       RIGHT SHIFT                         moves a's bits b digits right, discarding the bits being moved
// a >>> b      UNSIGNED RIGHT SHIFT                moves a's bits b digits right, discarding the bits being moved and applying zeros to the left
// Before operation every bitwise operand:
// * transforms a number operand to a 32 bit integer and discards a floating part.
// * every a's bit is being compared with according b's bit using the particular bitwise operand.
// * the resulting 32 bit sequence is being interpreted as a regular number.

// Two methods are useful to log bitwise operations:
// * parseInt(String, Number) accepts a string with a binary number in it and a numeral system number. Returns a number in the according numeral system.
// * aNumber.toString(Number) transforms a number to a string representation in the numeral system, passed as an argument.
const aNumber = parseInt("11000", 2);
console.log(aNumber);                                 // Output: 24
console.log(aNumber.toString(2));               // Output: 11000

// & AND
const aNine = 9;
const aFourteen = 14;
console.log(aNine.toString(2));                 // Output: 1001                     00000000000000000000000000001001
console.log(aFourteen.toString(2));             // Output: 1110                     00000000000000000000000000001110
console.log((aNine & aFourteen).toString(2));   // Output: 1000                     00000000000000000000000000001000
console.log(aNine & aFourteen);                      // Output: 8

// | OR
console.log(aNine.toString(2));                 // Output: 1001
console.log(aFourteen.toString(2));             // Output: 1110
console.log((aNine | aFourteen).toString(2));   // Output: 1111
console.log(aNine | aFourteen);                      // Output: 15

// ^ XOR
console.log(aNine.toString(2));                 // Output: 1001
console.log(aFourteen.toString(2));             // Output: 1110
console.log((aNine ^ aFourteen).toString(2));   // Output: 0111
console.log(aNine ^ aFourteen);                      // Output: 7
// XOR bitwise operation is widely used in cryptography because it is a completely reversible operation, i.e. returns a source number if the operation is applied twice with
// the same operand: a ^ b ^ b == a
const dataToCrypt = 9;                              // 00000000000000000000000000001001
const cryptKey = 1220461917;                        // 01001000101111101100010101011101
const cryptData = dataToCrypt ^ cryptKey;           // 01001000101111101100010101010100
console.log(cryptData.toString(10));           // Output: 1220461908        Crypt data
const deCryptData = cryptData ^ cryptKey;           // 00000000000000000000000000001001
console.log(deCryptData.toString(10));         // Output: 9
// More complex example could contain the logic of splitting the dataToCrypt into chunks matching cryptKey by number of digits (to be able to XOR with a cryptKey).

// ~ NOT
console.log(aNine.toString(2));                 // Output: 1001
const notANine = ~aNine;
console.log(notANine.toString(2));              // Output: -1010
console.log(notANine);                                 // Output: -10
// Because of the inner binary numbers representation the formula is actual: ~n == -(n + 1)
console.log(~3);                                    // Output: -4
console.log(~-1);                                   // Output: 0

// << LEFT SHIFT
const aTwo = 2;
console.log(aNine.toString(2));                 // Output: 1001
console.log(aTwo.toString(2));                  // Output:   10