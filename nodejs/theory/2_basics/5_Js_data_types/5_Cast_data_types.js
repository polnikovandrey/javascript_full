'use strict';       // jshint ignore: line

/* ----- Cast to a string ----- */
// Some functions interpret arguments as strings.
// alert(1);        // alert() casts number 1 to a string.
// Explicit cast String() could be used when needed.
let value = true;
console.log(typeof value);                // Output: boolean
value = String(value);                    // Explicit cast to a string.
console.log(typeof value);                // Output: string
console.log(String(false));         // Output: false            Cast to 'false' string.
console.log(String(null));          // Output: null             Cast to 'null' string.


/* ----- Cast to a number ----- */
console.log('6' / '2');                 // Output: 3                Strings are automatically casted to numbers.
let aString = '123';
console.log(typeof aString);            // Output: string
aString = Number(aString);              // Explicit cast to a number.
console.log(typeof aString);            // Output: number
console.log(Number('qwe'));       // Output: NaN
console.log(Number(undefined));   // Ouptut: NaN
console.log(Number(null));        // Output: 0
console.log(Number(true));        // Output: 1
console.log(Number(false));       // Output: 0
console.log(Number('   123   ')); // Output: 123
console.log(Number(''));          // Output: 0
console.log(Number('123px'));     // Output: NaN

console.log('1' + 2);                   // Output: 12           // If at least one operand is a string - the rest operands are also converted to strings.
console.log(1 + '2');                   // Output: 12
console.log(1 + 2 + '3');               // Output: 33           // Numbers to the left of a string operand are first applied, the result is concatenated with a string operand.
console.log('2' - 1);                   // Output: 2            // Only + converts values to strings. Other operators on the contrary cast operands to numbers.
console.log('6' / '2');                 // Output: 3

let x = 1;
console.log(+x);                        // Output:1             // +numberInsideNaN is same as Number(numberInsideNaN). There is no influence on numbers.
let y = -2;
console.log(+y);                        // Output: -2
console.log(+true);                     // Output: 1            // Boolean argument is converted to a number 1.
console.log(+'');                       // Output: 0            // Empty string argument is converted to a number 0.


/* ----- Logical cast (booleans) ----- */
// Below are values, converted to false. All other values are interpreted as true;
console.log(Boolean(NaN));                // Output: false
console.log(Boolean(null));         // Output: false
console.log(Boolean(undefined));    // Output: false
console.log(Boolean(''));           // Output: false
console.log(Boolean(0));            // Output: false
console.log(Boolean('0'));          // Output: true         Non empty string is converted to true.



