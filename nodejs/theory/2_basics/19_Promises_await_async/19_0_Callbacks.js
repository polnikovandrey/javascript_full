'use strict';           // jshint ignore: line

// Asynchronous actions are widely implemented in javascript. Callback is a mean to react when the asynchronous action will finish it's execution.
// A callback could be implemented as a common or an anonymous function. Using a callback is called 'asynchronous programming using callbacks'.
function asynchronousFunction(callback, emulateError) {
    // do some asynchronous calculations
    if (emulateError) {
        callback(new Error('Something went wrong!'));
    } else {
        const result1 = 1;
        const result2 = 1;
        callback(null, result1, result2);
    }
}
// It's common practice to use error parameter first. It's called an 'error-first callback'. The reason: there may be numerous errors, they could be handled
// conveniently by passing an error object only to callback function. Another reason - there could be multiple results, so error parameter should be the first to have
// a definite index.
const callback = function(error, result1, result2) {
    if (error) {
        console.log(`${error.name} ${error.message}`);
    } else {
        console.log(`Results acquired: ${result1} ${result2}`);
    }
};
asynchronousFunction(callback, false);      // Output: Result acquired!
asynchronousFunction(callback, true);       // Output: Error Something went wrong!

// Callbacks could be nested one in another, but it's inconvenient when there is a significant number of nested callbacks. Such situation is called a
// 'callbacks hell' or 'infernal callbacks pyramid'. To avoid a callbacks hell sometimes callbacks are isolated in distinct function declarations, but
// it makes the code to be of a poor quality. The better option is to use promises.