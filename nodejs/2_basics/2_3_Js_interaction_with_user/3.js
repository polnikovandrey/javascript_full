'use strict';   // jshint ignore:line

console.log('Hello world!');

// Alert dialog is a message popup with single OK button.
alert('Hello world!');

// Confirm dialog is a message popup with OK and Cancel buttons.
let booleanResult = confirm('Are you ok?');
console.log(booleanResult);             // Output: true
console.log(typeof booleanResult);      // Output: boolean

// Prompt dialog contains message, input with or without a default value, Ok and Cancel button.
let stringResult = prompt('Enter your city:', 'Minsk');
console.log(stringResult);              // Ouput: string value if Ok is clicked, may be empty. Null if Cancel is clicked.
console.log(typeof stringResult);       // Output: string if Ok, Object if Cancel.

// While alert, confirm or prompt dialog is displayed, browser stops every script execution until dialog is hidden.


let stringValue = '';
console.log(typeof stringValue);
console.log(typeof(stringValue));       // Note typeof usage - with parentheses and without. Result is the same.
console.log(null);                      // Output: object. It's js bug - null is a distinct data type, not object.

