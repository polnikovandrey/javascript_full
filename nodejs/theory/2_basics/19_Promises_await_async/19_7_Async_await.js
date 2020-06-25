'use strict';       // jshint ignore: line

// There is an ES8 special syntax for working with promises, which is being called "async/await".

// 'async' keyword could be placed immediately before the function declaration.
// async function could return only a Promise (implicitly or explicitly). If a non-promise value is returned - engine wraps that value in a Promise.
async function explicitPromise() {
    return Promise.resolve(1);
}
async function implicitPromise() {
    return 2;                               // The same as 'return Promise.resolve(2);'
}
explicitPromise().then(value => console.log(value));        // Output: 1
implicitPromise().then(value => console.log(value));        // Output: 2

// 'await' keyword is usable only inside async functions. The syntax is:
// const value = await promise;
// That line stops execution of that async function, waits for a promise to complete and assigns the result to the variable.
// Important note - await doesn't stops the whole script execution: events continue being handled, other scripts continue execution, etc.
// 'await' is actually a syntax sugar of the promise.then() method.
async function withAwaits() {
    const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 100));
    const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 200));
    const value1 = await promise1;          // Here the withAwait() execution stops for approximately 100ms.
    const value2 = await promise2;          // Here the withAwait() execution stops for approximately 200ms.
    console.log(value1 + value2);
}
/*
    Output:
        Now withAwaits() waits for promises to complete...
        3
 */
Promise.resolve()
    .then(() => {
        withAwaits();
        console.log("Now withAwaits() waits for promises to complete...");
    });

// 'await' couldn't be used outside an async function, so it's convenient sometimes to use an anonymous async function and use 'await' inside of it.
(async () => {
    const value = await Promise.resolve();
})();

// As like as promise.then(), 'await' could be used with thenable objects.
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        setTimeout(() => resolve(this.num), 300);
    }
    async someAsyncMethod() {                           // async could be used with a method
        const someValue = await Promise.resolve();      // so as 'await' inside such method
    }
}
Promise.resolve()
    .then(async () => {
        const value = await new Thenable(4);
        console.log(value);                             // Output: 4
    });

// When awaited Promise was rejected - await throws an error with the according reason (the same as 'throw ...;').
// Two functions below are logically identical, they differ only by the fact that a promise could throw an error after some delay.
async function rejectedAwait() {
    await Promise.reject(new Error());
}
async function throwError() {
    throw new Error();
}
// There are two methods to catch errors of awaited promises: try..catch and .catch().
// If any awaited promise was rejected and there is no according try..catch or .catch() - 'Uncaught promise error' will be thrown.
async function catchError() {
    try {
        await Promise.resolve();
        await Promise.reject(new Error(5));
    } catch (error) {
        console.log(error.message);             // Output: 5
    }
    await Promise.reject(new Error(6));
}
catchError().catch(reason => console.log(reason.message));      // Output: 6

// It's convenient sometimes to await Promise.all.
(async () => {
    const value = await Promise.all([
        Promise.resolve('7'),
        Promise.resolve('8')
    ]);
    console.log(value);                                         // Output: [ '7', '8' ]
})();

