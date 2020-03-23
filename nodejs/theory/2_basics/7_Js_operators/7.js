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
console.log(true && !false);         // Output: true
console.log(true && false);         // Output: false


// ** operator
// console.log(2 ** 3);             // Output: 8                    >ES7. Math.pow() analog - n**m means n^m.