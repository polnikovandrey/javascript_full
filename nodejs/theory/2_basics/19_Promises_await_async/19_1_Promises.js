'use strict';           // jshint ignore: line

// Base Promise syntax:
const promise = new Promise(function(resolve, reject) {     // 'resolve' and 'reject' arguments are provided by javascript engine.
    // Executor function (performs asynchronous actions). It's automatically being executed on Promise creation.
    const value = 1;
    const success = true;
    if (success) {
        resolve(value);
    } else {
        reject(new Error("Failed"));
    }
});

/*
Promise object has inner properties:
    * state - begins with "pending", changes to "fulfilled" after resolve() call or to "rejected" after reject() call.
    * result - begins with [undefined] value, changes to [value] after resolve(value) call or to [error] after reject(error) call.
Both [state] and [result] are inner properties and couldn't be accessed directly. .then .catch .finally methods should be used to interact with those properties.
Promise's executor function must call resolve or reject once. The rest calls of resolve/reject will be ignored.
Both resolve and reject expect exactly one argument, rest arguments will be ignored.
Both resolve and reject could take any type of argument, but it's highly recommended to pass an object of Error type to a reject function.
Both resolve and reject could be called deferred or instantly.
 */

// Consumers of the result of executor call could be registered with .then .catch .finally methods.
promise.then(                           // .then() is used to handle both a result and an error, or a result only.
    function(result) {
        // result handling
    },
    function(error) {                   // This argument could be omitted in case only successful result matters.
        // error handling
    }
);
promise.catch(function(error) {         // .catch() is used to handle an error only. It's the same as '.then(null, function() { ... });'
    // error handling
});
promise.finally(function() {    // .finally() has no arguments in a callback-function. Unlike then/catch it forwards the result to following then/catch.
    // execute logic in any case
});

/*
The Promise's advantages over callbacks are:
    * promises are defined in a natural order, one after another. Callback-function must be defined before executor-function definition.
    * there could be any number of consumers of a Promise. There could be only one callback-function.
 */

// setTimeout() could be rewritten to be used in a Promise-style way.
function promiseTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));     // Note: resolve is being called without any value argument - it's normal.
}
promiseTimeout(100).then(value => {
    // Do something
});

