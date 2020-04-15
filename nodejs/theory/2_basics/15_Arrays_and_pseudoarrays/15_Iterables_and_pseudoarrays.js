'use strict';           // jshint ignore: line

// Every object could be transformed to support iteration. Such object is called iterable. String is an example of built-in iterable object type.
// To make object iterable one should provide Symbol.iterator method. for..of throws an error if this method is absent, if exists - for..of works only with this method.
// To get to the next iteration for..of calls next() method of object, returned by Symbol.iterator. This iterator object should contain two properties:
// 1. done property with a boolean value (true means the end of iteration, no value)
// 2. value property with the next iteration value (if done === false, no value property otherwise).
const range = {
    from: 1,
    to: 3
};
// for (let next of range) { }              // TypeError: range is not iterable
range[Symbol.iterator] = function() {       // Note: next() method is not a part of range object, distinct iterator object is created for every for..of cycle.
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};
let rangeValues = '';
for (let next of range) {
    rangeValues += next;
}
console.log(rangeValues);           // Output: 123

// If next() method is contained inside range object - all parallel for..of cycle will work with the same iterator object, collisions are inevitable.
const rangeWithNextInside = {
    from: 1,
    to: 3,
    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },
    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ };
        } else {
            return { done: true };
        }
    }
};
let collisionRangeValues = '';
for (let next1 of rangeWithNextInside) {
    collisionRangeValues += next1;
    for (let next2 of rangeWithNextInside) {
        collisionRangeValues += next2;
    }
}
console.log(collisionRangeValues);              // Output: 1123            enclosed for..of cycles use the same object, collision is obvious

// Symbol.iterator implementation could provide infinite number of iterations, for example to generate infinite set of random numbers.

// String iterator implementation works correctly even with surrogate pairs.
const surrogatesString = '𝒳😂';
for (let surrogate of surrogatesString) {       // Output: 𝒳 😂
    console.log(surrogate);
}

// Symbol.iterator could be used directly to iterate over iterable. This mode is used for multistep iteration (iterate part of collection, perform operation, continue iteration).
const iterator = surrogatesString[Symbol.iterator]();
while(true) {                                   // Output: 𝒳 😂
    let next = iterator.next();
    if (next.done) {
        break;
    } else {
        console.log(next.value);
    }
}

// Pseudo-array is an object with indexed properties and length property. An object could be iterable, pseudo-array or both.
// For example, String is both iterable and pseudo-array.
// Array is iterable, could also be used with for..of.
// Non-iterable pseudo-array could not be cycled by for..of (Symbol.iterator is not implemented).

// To use pseudo-array or iterable object as the real array (to use array methods) Array.from() method could be used. It creates new array from pseudo-array or iterable object.
const pseudoArray = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
const array = Array.from(pseudoArray);  // Arrays.from()
console.log(array.pop());               // Output: c
console.log(Array.from({}));    // Output: []       Empty array is returned for non-iterable and non-pseudo-array object.
// Second Array.from() 'mapfn' argument is a mapping function (transforms value of each element).
console.log(Array.from(pseudoArray, (value, index) => value + index));      // Output: [ 'a0', 'b1', 'c2' ]
// The third Array.from() argument 'thisArg' could be used to provide this context to 'mapfn' function.
// Array.from() could be used to transform a String to the array of characters.
console.log(Array.from('abc')); // Output: [ 'a', 'b', 'c' ]
// This fact could support the slice() method to work correctly with surrogate pairs string.
console.log(surrogatesString.slice(1, 2));                      // Output: �        slice() works incorrectly with surrogate pairs
function correctSlice(aString, start, end) {
    return Array.from(aString).slice(start, end).join('');
}
console.log(correctSlice(surrogatesString, 1, 2));   // Outpur: 😂


