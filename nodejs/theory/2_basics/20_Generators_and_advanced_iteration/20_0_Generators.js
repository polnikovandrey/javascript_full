'use strict';           // jshint ignore: line

// A common function returns a single value. Generator-function (generator) yields a set of values, one per a request.
// Generators are convenient to be used in conjunction with iterable objects and to produce streams of data easily.
// Unlike a common function, a generator-function do not returns a result upon being called.
// It returns a special iterable generator-object, used to control a generator's execution.
// A generator-object has a next() method. Upon being called that method executes a generator-function until the next 'yield' line
// and returns an object { value: [yield value], done: [true/false] }.
function* generateSequence() {          // A generator-function declaration. A [function *name()] declaration is allowed, but is rarely used.
    yield 1;
    yield;              // value === undefined
    return 3;
}

const generator = generateSequence();
console.log(generator);                     // Output: {}
console.log(generator.next());              // Output: { value: 1, done: false }
console.log(generator.next());              // Output: { value: undefined, done: false }
console.log(generator.next());              // Output: { value: 3, done: true }
console.log(generator.next());              // Output: { value: 3, done: true }             If generator is done - subsequent next() calls return the same last value.

// As soon as a generator-object is iterable - it could be cycled with for..of syntax.
function* generateIterable() {
    yield 1;
    yield 2;
    return  3;       // Is ignored by for..of cycle. 'yield' should be used to cycle that value, but the object returned will become undone { value: 3, done: false }.
}
let accumulator = '';
for (let generatorObject of generateIterable()) {       // Cycling the generator-object.
    accumulator += generatorObject;
}
console.log(accumulator);                       // Output: 12       Note that iteration excluded the 'return 3' value, it ignores objects with [done: true].

// As soon as a generator-object is iterable - it could be spread ('...' spread-operator).
function* generateSpreadable() {
    yield 1;
    yield 2;
    return  3;
}
const spread = [0, ...generateSpreadable()];          // Spreading the generator-object.
console.log(spread);                          // Output: [ 0, 1, 2 ]

// A soon as a generator-object has a next() method, which returns and object { value: ..., done: ...} - a generator could be used
// to implement a [Symbol.iterator]() of an iterable object.
const range = {
    from: 1,
    to: 5,
    *[Symbol.iterator]() {              // A shortcut of a '[Symbol.iterator]: function*()' syntax.
        for (let value = this.from; value <= this.to; value++) {
            yield value;
        }
    }
};
console.log([...range]);                // [ 1, 2, 3, 4, 5 ]

// Generators could be composed (enclosed in each other) using a yield* syntax.
// [yield* someGenerator] delegates execution to the [someGenerator] - iterates [someGenerator] and returns it's output.
// yield* syntax is quite effective - it doesn't use additional memory to store intermediate results.
function* generateFromTo(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
function* generateCodes() {
    yield* generateFromTo(48, 57);      // Chars 0..9               Same as:     'for (let i = 48; i <= 57; i++) yield i;'
    yield* generateFromTo(65, 90);      // Chars A..Z
    yield* generateFromTo(97, 122);     // Chars a..z
}
let codes = '';
for (let code of generateCodes()) {
    codes += String.fromCharCode(code);         // Output: 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
}
console.log(codes);

// A generator's yield operator could be assigned to a value. The value will be supported by the outside code by calling a .next(value) method.
// A generator stops the execution until that value is supplied (maybe async or after a timeout).
function* waitForAValue() {
    const result = yield 1;
    console.log(result);
    yield 3;
}
const aWaitForAValue = waitForAValue();
console.log(aWaitForAValue.next().value);                   // Output: 1
console.log(aWaitForAValue.next(2).value);             // Output: 2 3

// A generator's user could supply an exception instead of a value to that generator. A generator-object has a special .throw(err) method for that.
// The exception could be caught by a try..catch syntax both inside a generator and by wrapping a .throw(err) method.
function* generatorWithError() {
    try {
        const result = yield 1;
    } catch (err) {
        console.log('Error was caught inside a generator.');
        throw err;
    }
}
const aGeneratorWithError = generatorWithError();
console.log(aGeneratorWithError.next().value);              // Output: 1
try {
    aGeneratorWithError.throw(new Error());                 // Output: Error was caught inside a generator.
} catch (err) {
    console.log('Error was caught outside a generator.');   // Output: Error was caught outside a generator.
}

// Note: a generator function could possible yield values in a cycle and that cycle could possibly be eternal, 'while(true)' for example.