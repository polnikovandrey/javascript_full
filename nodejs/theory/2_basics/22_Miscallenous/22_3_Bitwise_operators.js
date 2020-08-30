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
// As soon as aNumber.toString(Number) represents numbers as signed binaries - another method could be used to represent numbers always unsigned:
function dec2bin(dec) {
    return (dec >>> 0).toString(2);                  // >>> 0 doesn't shift bits, but represents a number as an unsigned integer.
}
console.log((-2).toString(2));                  // Output: -10                                          signed
console.log(dec2bin(-2));                        // Output: 11111111111111111111111111111110            unsigned

// & AND
const aNine = 9;
const aFourteen = 14;
console.log(dec2bin(aNine));                         // Output: 1001                     00000000000000000000000000001001
console.log(dec2bin(aFourteen));                     // Output: 1110                     00000000000000000000000000001110
console.log(dec2bin(aNine & aFourteen));        // Output: 1000                     00000000000000000000000000001000
console.log(aNine & aFourteen);                      // Output: 8

// | OR
console.log(dec2bin(aNine));                        // Output: 1001
console.log(dec2bin(aFourteen));                    // Output: 1110
console.log(dec2bin(aNine | aFourteen));        // Output: 1111
console.log(aNine | aFourteen);                      // Output: 15

// ^ XOR
console.log(dec2bin(aNine));                        // Output: 1001
console.log(dec2bin(aFourteen));                    // Output: 1110
console.log(dec2bin(aNine ^ aFourteen));       // Output:  111
console.log(aNine ^ aFourteen);                     // Output: 7
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
console.log(dec2bin(aNine));                 // Output:                             1001
const notANine = ~aNine;
console.log(dec2bin(notANine));              // Output: 11111111111111111111111111110110
console.log(notANine);                       // Output: -10
// Because of the inner binary numbers representation the formula is actual: ~n == -(n + 1)
console.log(~3);                             // Output: -4
console.log(~-1);                            // Output: 0

// << LEFT SHIFT
// SHIFT operator is used with two operands - the first is a number to shift, the second is a number of bits to shift the first operand.
// LEFT SHIFT moves bits to the left. Excess bits at the left are being discarded, zero bits are being applied to the right.
const aTwo = 2;
console.log(dec2bin(aNine));                        // Output: 1001
console.log(dec2bin(aTwo));                         // Output:   10
const aNineLeftShiftByTwo = aNine << aTwo;
console.log(dec2bin(aNineLeftShiftByTwo));          // Output: 100100
console.log(aNineLeftShiftByTwo);                   // Output: 36
// LEFT SHIFT (<< N) is almost equivalent to the multiplying by two N times.
console.log(3 << 1);                                // Output: 6
console.log(3 << 2);                                // Output: 12
console.log(3 << 3);                                // Output: 24
// The only difference (limitation) is the fact that LEFT SHIFT is only applicable to the 32-bit number, so there is the upper bound for such "multiplication":
console.log(10000000000 << 1);                      // Output: -1474836480          32-bit overflow, excess left bit was discarded.
console.log(10000000000 * 2);                       // Output: 20000000000          Regular multiplication by 2 works as expected.

// >> RIGHT SHIFT (sign-propagating, "переносящий знак")
// RIGHT SHIFT moves bits to the right, discarding excess bits. The copy of the leftmost bits are appended to the left, so the sign of a number stays the same.
// That is why the RIGHT SHIFT is being called a "sign-propagating".
console.log(dec2bin(aNine));                            // Output: 1001
console.log(dec2bin(aTwo));                             // Output:   10
const aNineRightShiftByTwo = aNine >> aTwo;             // Two rightmost bits were discarded, two copies of the leftmost bits (zeros) were applied to the left.
console.log(dec2bin(aNineRightShiftByTwo));             // Output:   10
console.log(aNineRightShiftByTwo);                      // Output: 2
const aMinusNine = -9;
console.log(dec2bin(aMinusNine));                       // Output: 11111111111111111111111111110111         (signed -1001)
console.log(dec2bin(aTwo));                             // Output:                               10
const aMinusNineRightShiftByTwo = aMinusNine >> aTwo;
console.log(dec2bin(aMinusNineRightShiftByTwo));        // Output: 11111111111111111111111111111101         (signed -11)
console.log(aMinusNineRightShiftByTwo);                 // Output: -3
// RIGHT SHIFT (>> N) has the same effect as an INTEGER division by two N times.
console.log(100 >> 1);          // Output: 50
console.log(100 >> 2);          // Output: 25
console.log(100 >> 3);          // Output: 12           The integer part only.

// >>> UNSIGNED RIGHT SHIFT (zero-fill right shift) (сдвиг вправо с заполнением нулями)
// First operand's bits are shifted to the right. Excess bits at the right part are being discarded. New left bits are filled with zeros.
// Signed bit always become a zero, so the result is always positive.
// >> and >>> has the same effect on the positive operands because left supplied are always zeros.
console.log(dec2bin(aNine));                                        // Output: 1001
console.log(dec2bin(aTwo));                                         // Output:   10
const aNineUnsignedRightShiftByTwo = aNine >>> aTwo;
console.log(dec2bin(aNineUnsignedRightShiftByTwo));                 // Output:   10
console.log(aNineUnsignedRightShiftByTwo);                          // Output: 2
console.log(dec2bin(aMinusNine));                                   // Output: 11111111111111111111111111110111
console.log(dec2bin(aTwo));                                         // Output:                               10
const aMinusNineUnsignedRightShiftByTwo = aMinusNine >>> aTwo;
console.log(dec2bin(aMinusNineUnsignedRightShiftByTwo));            // Output:   111111111111111111111111111101
console.log(aMinusNineUnsignedRightShiftByTwo);                     // Output: 1073741821

// Bitwise operators are being used seldom. But one should be very careful when using bitwise operators - they have a low priority (even lower than equality == operator).
// a == b ^ 0;      means the same as: (a == b) ^ 0;
// To cope with bitwise operators priority parentheses should be used: a == (b ^ 0);

// MASKS
// Bitwise operators are used sometimes to implement MASKS (a pattern to store boolean properties - each bit represents a boolean property):
//          Read    Write   Manage              Binary      Decimal
// Guest    1       0       0                   100         4
// Editor   1       1       0                   110         6
// Admin    1       1       1                   111         7
const READ_MASK = 4;        // 100
const WRITE_MASK = 2;       // 010
const MANAGE_MASK = 1;      // 001
const GUEST = READ_MASK;
const EDITOR = GUEST | WRITE_MASK;      // after applying | logic EDITOR has every 1 from both GUEST and WRITE_MASK
const ADMIN = EDITOR | MANAGE_MASK;
// If masks have no any coincidence - the result will contain only zero bits (a zero).
const canGuestWrite = (GUEST & WRITE_MASK) > 0;                 console.log(canGuestWrite);         // Output: false
const canAdminManage = (ADMIN & MANAGE_MASK) > 0;               console.log(canAdminManage);        // Output: true
const canEditorWrite = (EDITOR & WRITE_MASK) > 0;               console.log(canEditorWrite);        // Output: true
const canEditorManage = (EDITOR & MANAGE_MASK) > 0;             console.log(canEditorManage);       // Output: false
const WRITE_MANAGE_MASK = WRITE_MASK | MANAGE_MASK;
const canGuestWriteOrManage = (GUEST & WRITE_MANAGE_MASK) > 0;           console.log(canGuestWriteOrManage);    // Output: false
const canEditorWriteOrManage = (EDITOR & WRITE_MANAGE_MASK) > 0;         console.log(canEditorWriteOrManage);   // Output: true
// MASKS are limited to usage the maximum of 32 boolean properties.
// Working with regular booleans is more convenient, so masks are being used only for quick calculations, memory optimization, low-level drawing (3d graphics) and such.

// ROUNDING
// As soon as bitwise operators discard a floating part of a number - they could be used for rounding.
console.log(~~12.123);          // Output: 12           ~~ (double NOT)
console.log(12.123 ^ 0);        // Output: 12           ^ 0 (XOR 0)4
console.log(1.1 + 1.9 ^ 0);     // Output: 3            Priority should be minded, + priority is greater than ^.
console.log(1.1 + (1.9 ^ 0));   // Output: 2.1          Priority should be minded, + priority is greater than ^.

// - 1 CHECK
// As soon as ~ operator reverts every bit and applies 1 the formula below is true.
// -n = ~n + 1
// ~n = -(n + 1)
// So [~n == 0] only for n == -1.
const aFive = 5;
if (~aFive) {               // true
    console.log('true');    // Output: true
}
const aMinusOne = -1;
if (~aMinusOne) {           // false
    console.log(false);
}
// ~ operator could be used to check a substring existence.
if (~'A minus one check'.indexOf('check')) {        // true
    console.log('true');                            // Output: true
}

// MULTIPLYING AND DIVISION BY THE POWER OF 2
// a << b   by the fact multiplies 'a' by 2 raised to the power of 'b'. The upper limit of such multiplication is a 32 bit number.
console.log(1 << 2);        // Output: 4        1*2*2
console.log(1 << 3);        // Output: 8        1*2*2*2
console.log(3 << 3);        // Output: 24       3*2*2*2
// a >> b   by the fact applies an integer division of 'a' by 2 raised to the power of 'b'.
console.log(8 >> 2);        // Output: 2        8 / (2 * 2)
console.log(11 >> 2);       // Output: 2        (int) 11 / (2 * 2)