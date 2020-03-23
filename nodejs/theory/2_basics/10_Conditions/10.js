'use strict';       // jshint ignore: line

/* ----- If, else if, else, ternary operator, switch ----- */
if (true) {
} else if (false) {
} else {
}

// 0, '', null, undefined, NaN - are treated as false in conditions. The are called 'falsy values', all the rest values are called 'truthy'.
if (1 / 'a') { }      // NaN = false

if (1) {    // Always true
}

const someValue = (4 / 2 == 2) ? 'true' : 'false';
(someValue === 'true') ? console.log(true) : console.log(false);        // No assignment here, bad practice. It's recommended to use if condition here.

// Here comes if condition usage.
const age = 10;
let greeting;
if (age < 10) {
    greeting = 'Hello, child!';
} else if (age < 18) {
    greeting = 'Hello, young man!';
} else {
    greeting = "Good day!";
}
// Here comes ternary operator usage with the same meaning and result
greeting = age < 10 ? 'Hello, child!' : age < 18 ? 'Hello, young man!' : 'Good day!';


const aNumber = 1;
switch (aNumber) {
    case 1:
        break;
    case aNumber > 1:       // Note the possibility to compare a switch value in js.
        break;
    case aNumber < 2:
        break;
    default:
        break;
}