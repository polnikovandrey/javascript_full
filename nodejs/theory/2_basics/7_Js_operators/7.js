'use strict';   // jshint ignore:line
// 'use strict' means that code uses ES6 standard.

// Next line of code is valid out of strict mode, but is forbidden in ES6 (not valid declaration without var, let or const).
// a = 5;       // Uncaught ReferenceError: a is not defined

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

// + - * / are basic arithmetic operators.
// + is also used for concatenation.
console.log('1' + 2);           // Output: 12
console.log(2 + '1');           // Output: 21


// + operator could be used to convert a variable value to the number type.
console.log(+'');               // Output: 0.
console.log(+'asd');            // Output: NaN
console.log(+'123');            // Output: 123
console.log(+false);            // Output: 0
console.log(+true);             // Output: 1


// ++ increment, -- decrement. Two forms - prefix and postfix.
let aOne1 = 1,
    aOne2 = 1,
    aOne3 = 1,
    aOne4 = 1;
console.log(++aOne1);       // Output: 2
console.log(aOne2++);       // Output: 1
console.log(--aOne3);       // Output: 0
console.log(aOne4--);       // Output: 1


// > gt, < lt, % reminder
console.log(1 < 2);         // Output: true
console.log(1 > 2);         // Output: false
console.log(5%2);           // Output: 1

// When comparing operands of different types (with comparison or equality operators) Js casts those types to numbers. No cast when strict equality operator is used.
console.log('2' > 1);       // Output: true     '2' is cast to the number 2
console.log('01' == 1);     // Output: true     '01' is cast to the number 1
console.log(true > 0);      // Output: true     true is cast to the number 1


// = declaration, == equality, === strict equality.
console.log('2' == 2);              // Output: true     Types do not matter, values are equal after casting to a number.
console.log(0 == false);            // Output: true
console.log('' == false);           // Output: true
console.log('2' === 2);             // Output: false    Different types are not strict equal.

// There is special js rule for null/undefined comparison. Undefined is equal to null, and equal only to null. Null is equal to undefined, and only to undefined.
console.log(null == undefined);     // Output: true
console.log(null === undefined);    // Output: false    Different types.


console.log(undefined > 0);         // Output: false    Comparison operator casts undefined to a number NaN. Comparing NaN with a number is always false.
console.log(undefined == 0);        // Output: false    Equality operator treats undefined and zero as values of different types. Undefined is equal only to null.
console.log(undefined <= 0);        // Output: false    Comparison operator casts undefined to a number NaN.

console.log(null > 0);              // Output: false    Comparison operator casts different types to a number, null becomes 0.
console.log(null == 0);             // Output: false    Equality operator is non-strict, different types mean not equal.
console.log(null <= 0);             // Output: true     Comparison operator casts null to a number 0.


// &&, || and ! negate operator
console.log(true || false);         // Output: true
console.log(true && !false);        // Output: true
console.log(true && false);         // Output: false

// Negate operator has the greatest weight among logical operators.
// Negate operator casts operands to booleans and then negates the result.
console.log(!true);                 // Output: false
console.log(!0);                    // Output: true
// Double negate operator could be used to convert a value to boolean. First converts and negates, second - negates again. The better way is to use Boolean(value).
console.log(!!'non empty string');  // Output: true
console.log(!!null);                // Output: false


// Js behavior with || operator differs from the common boolean logic operator OR:
// if there are multiple operands used with || - the result returned is the first true operand or the last operand if all operands are false.
console.log(1 || 0);                    // Output: 1
console.log(true || 'some string');     // Output: true
console.log(null || 1);                 // Output: 1
console.log(null || 0 || 1);            // Output: 1
console.log(undefined || null || 0);    // Output: 0

// This js specific could be used to find first non-null and non-undefined value.
const nullValue = null, undefinedValue = undefined, nonNullValue = 'non-null-non-undefined';
const firstNonNullNonUndefined = nullValue || undefinedValue || nonNullValue;
console.log(firstNonNullNonUndefined);                                                              // Output: 'non-null-non-undefined'

// Shortcut calculation is another usage of || operator. If an operand results true - the rest operands are ignored.
let initOrNotInit;
if (true || (initOrNotInit = 1)) {
    // some logic
}
console.log(initOrNotInit);             // Output: undefined        initOrNotInit was not initialized.

// && operand's result is the first false operand or the last operand if all operands are true.
console.log(1 && 0);                    // Output: 0
console.log(1 && 5);                    // Output: 5
console.log(null && 5);                 // Output: null
console.log(0 && 'some string');        // Output: 0
console.log(1 && 2 && null && 3);       // Output: null
console.log(1 && 2 && 3);               // Output: 3

// && operator weight is greater then || operator. So:      a && b || c && d === (a && b) || (c && d)

// && operator could also be used for shortcut calculations. If operand is false the rest operands are ignored.
(1 < 0) && console.log('No output');    // No output.






// ** operator
// console.log(2 ** 3);             // Output: 8                    >ES7. Math.pow() analog - n**m means n^m.