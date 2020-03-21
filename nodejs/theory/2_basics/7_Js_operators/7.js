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

// = declaration, == equality, === strict equality.
console.log('2' == 2);      // Output: true
console.log('2' === 2);     // Output: false

// &&, || and ! negate operator
console.log(true || false);         // Output: true
console.log(true && !false);         // Output: true
console.log(true && false);         // Output: false

// ** operator
// console.log(2 ** 3);             // Output: 8                    >ES7. Math.pow() analog - n**m means n^m.