'use strict';       // jshint ignore: line

/* ----- If, else if, else, ternary operator, switch ----- */
if (true) {
} else if (false) {
} else {
}

// 0, '', null, undefined, NaN - are treated as false in condition
if (1 / 'a') { }      // NaN = false

if (1) {    // Always true
}

(true) ? console.log(true) : console.log(false);

let aNumber = 1;
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

