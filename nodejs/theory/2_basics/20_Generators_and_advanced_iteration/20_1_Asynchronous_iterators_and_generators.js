'use strict';               // jshint ignore: line

// Asynchronous iterators are useful in case when iterable data chunks are being acquired asynchronously.
// To create asynchronously-iterable object:
// * [Symbol.asyncIterator] property must be implemented (as like as [Symbol.iterator] for a common iterable object).
// * next() method must be implemented and return a Promise. next() could be a common method (not async), but it's convenient to use 'async' in conjunction with 'await'.
// To iterate asynchronously-iterable object a 'for await (let item of iterable)' construction is used.
let asyncRange = {
    from: 1,
    to: 5,
    [Symbol.asyncIterator]() {
        return {
            current: this.from,
            last: this.to,
            async next() {
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }
};
(async () => {
    for await (let value of asyncRange) {
        console.log(value);
    }
})();                   // Output: 1 2 3 4 5

// Expand operator (...) and 'for..of' can't be used with async-iterable objects - they both expect [Symbol.iterator] implementation, not [Symbol.asyncIterator].


// Common generators can't use 'await' construction inside - all values must be acquired synchronously. To use 'await' - a generator-function must be declared as 'async'.
// Async-generators are often used in web-development to handle an asynchronous stream of data (download/upload a huge file, for example).
// Alternatively a browser's built-in Streams-api could be used to handle asynchronous streams of data.
async function* generateAsyncSequence(start, end) {
    for (let i = start; i <= end; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}
(async () => {
    let asyncGenerator = generateAsyncSequence(1, 5);
    for await (let value of asyncGenerator) {
        console.log(value);
    }
})();                   // Output: 1 2 3 4 5
// Technically async-generator differs from the common generator by these facts:
// * 'await', Promises and async functions could be used inside async generator
// * generator.next() returns an object-value { done: ..., value: ... }, but asyncGenerator.next() method returns a Promise of that object.
// 'await' could be used to get a value of asyncGenerator.next() Promise: ' result = await asyncGenerator.next()); '

// Generators are often used to implement an iterable object's [Symbol.iterator].
// Async-generator could be used to implement asynchronously-iterable object's [Symbol.asyncIterator]:
const asyncRange1 = {
    from: 1,
    to: 5,
    async *[Symbol.asyncIterator]() {
        for (let value = this.from; value <= this.to; value++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield value;
        }
    }
};
(async () => {
    for await (let value of asyncRange1) {
        console.log(value);
    }
})();                   // Output: 1 2 3 4 5