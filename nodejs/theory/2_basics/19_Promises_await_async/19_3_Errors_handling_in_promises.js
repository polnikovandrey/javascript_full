'use strict';           // jshint ignore: line

// .catch() catches all errors, that took place before the .catch() block and were not caught already.
// Sometimes it's convenient to put a .catch() block as a last block in chain of numerous .then() blocks - any error in any .then() block will end up in a .catch() block.
new Promise((resolve, reject) => reject(new Error('1')))
    .then(value => { })
    .catch(error => console.log(error.message));            // Output: 1
new Promise((resolve => resolve()))
    .then(value => {
        throw new Error(2);
    })
    .then(value => { })
    .catch(error => console.log(error.message));            // Output: 2

// There is implicit try..catch block around Promise's function and handlers. Any exception inside those blocks is treated as a rejected promise.
new Promise(() => { throw new Error(3); }).catch(error => { });
new Promise(((resolve, reject) => reject(new Error(3)))).catch(error => { });       // This is the total equivalent of a previous line.
new Promise(resolve => resolve()).then(value => { throw new Error(); }).catch(error => { });        // Promise will become rejected by throw and caught in a .catch().

// As like as a try..catch block, a .catch() method could rethrow an error to be handled by the following .catch() blocks.
// If catch handles an error "normally" (without rethrowing) - execution continues with the next successful .then() block.
new Promise((resolve, reject) => reject(new Error('3')))
    .catch(error => console.log('Error was handled'))           // Output: Error was handled
    .catch(error => console.log('This will be skipped'))        // This will be skipped - error was handled on the previous line.
    .then(value => console.log('Continuing execution'));        // Output: Continuing execution
new Promise((resolve, reject) => reject(new Error('4')))
    .catch(error => { throw error; })
    .then(value => console.log('Skipped because of an error'))  // Skipped, because an error was rethrown.
    .catch((error => console.log('Caught rethrown error')))     // Output: Caught rethrown error
    .then(value => console.log('Continuing execution'));        // Output: Continuing execution

// If there is no catch() block, which handles an error inside a .then() block - the error becomes uncaught.
// Those errors could be handled by the 'unhandledrejection' event listener on window element in a browser or 'uncaughtException' in a NodeJs.
// 'unhandledrejection' event contains event.promise and event.reason properties.
// It's strongly advised to register an unhandledrejection/uncaughtException mechanism to not let an application to die silently.

new Promise(resolve => {
    setTimeout(() => {
        // throw new Error('5');                                // Commented out to prevent console output of an error.
    }, 100);
}).catch(error => console.log('Error 5 will not be caught'));   // Error will not be caught, because seTimeout() throws the error after the .catch() execution.

