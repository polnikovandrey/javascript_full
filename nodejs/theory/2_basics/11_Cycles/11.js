'use strict';       // jshint ignore: line
console.log('--- while ---');
let num = 1;
while (num < 5) {
    console.log(num++);
}
let i = 5;
while (i) {         // Variable values are converted to boolean using common js rules. Cycle stops when i becomes 0.
    i--;
}

console.log('--- do while ---');
num = 1;
do {
    console.log(num++);
} while (num < 5);

console.log('--- for ---');
for (let num = 1; num < 5; num++) {
    if (num === 2) {
        continue;
    } else if (num === 4) {
        break;
    }
    console.log(num);
}

let j = 0;
for (; j < 3; j++) {            // The first part of for expression is skipped (variable is initialized already).
    // Do something
}

for (let k = 0; k < 3;) {       // The third part of for expression is skipped (variable is changed inside).
    k++;
}

// for (;;) {                   // Absolutely legal eternal cycle.
// }

// Label could be used with cycles to break or continue to the cycle, specified by label.
labelName: for (let i = 0; i < 3; i++) {    // Break and continue with label should be inside cycle, the label itself - before some cycle and before the break and continue line.
    for (let j = 0; j < 3; j++) {
        if (true) {
            break labelName;
        } else {
            continue labelName;
        }
    }
}