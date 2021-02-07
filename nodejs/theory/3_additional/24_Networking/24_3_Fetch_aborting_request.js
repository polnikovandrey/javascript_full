'use strict';           // jshint ignore: line

// Javascript has no a method to abort a promise. There is a built-in object AbortController, which could be used to cancel asynchronous tasks including fetch.
// Fetch supports aborting a request using an AbortController object.
// AbortController has a single method - [AbortController.abort()], and a single property - [AbortController.signal]. When abort() method is called - the event
// with the name 'abort' is fired on the AbortController.signal object. And the property AbortController.signal.aborted value becomes true. Anyone interested could
// add a listener to the AbortController.signal object, so does the Fetch API.
/*
    const abortController = new AbortController();
    const signal = abortController.signal;
    signal.addEventListener('abort', () => console.log('Aborted'));
    abortController.abort();
    console.log(signal.aborted);            // Output: true
*/

// Using the AbortController object alongside Fetch API. AbortController.signal should be passed to a fetch() method. When a fetchRequest becomes aborted - the promise
// finishes with an AbortError.
/*
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);
    try {
        const response = await fetch('/some/url', {
            signal: controller.signal
        });
    } catch(err) {
        if (err.name = 'AbortError') {
            console.log('Aborted');
        } else {
            throw err;
        }
    }
*/

// A single AbortController object could be used to control any number of asynchronous tasks.