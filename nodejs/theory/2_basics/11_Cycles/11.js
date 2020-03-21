'use strict';       // jshint ignore: line
console.log('--- while ---');
let num = 1;
while (num < 5) {
    console.log(num++);
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