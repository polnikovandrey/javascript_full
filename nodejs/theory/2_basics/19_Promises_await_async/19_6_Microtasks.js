'use strict';           // jshint ignore: line

// Promise handlers (code inside .then, .catch, .finally) is being executed after the main script code and after all preceding handlers finished execution.
// There is a built-in implicit "microtask queue" in javascript, which is implemented by the PromiseJobs class. As like as every queue PromiseJobs is a FIFO structure.
// Promise's handlers are being added to that queue only after the Promise itself finish execution. Handlers are not executed on addition to the queue,
// javascript engine executes them after all current code finishes execution.

/*
 * Output:
 * Code1 completed!
 * Promise1 completed!
 */
const promise1 = Promise.resolve();
promise1.then(() => console.log('Promise1 completed!'));    // Promise handler starts execution after current script, regardless being resolved already.
console.log('Code1 completed!');    // To guarantee the "correct" sequence - console.log should also be placed inside a .then handler, following the first one.


/**
 * Promise error below wouldn't be caught correctly. Promise is extracted out of the microtask queue after the main script finishes execution and is being rejected.
 * Then javascript engine immediately checks if there is an according .catch for that particular promise in the microtask queue. As soon as there is no such handler
 * (it will be added later, after timeout) - javascript supposes that there is no handler and outputs a warning.
 * Note that .catch() will actually handle the Promise's reject, but javascript engine don't see that delayed handler due to the fact, that that handler
 * will be added to the microtask queue after the check of .catch existance.
 */
const promise2 = Promise.reject();      // Output: UnhandledPromiseRejectionWarning: undefined
setTimeout(() => promise2.catch(error => console.log('Catch!')), 100);      // Output: Catch!
