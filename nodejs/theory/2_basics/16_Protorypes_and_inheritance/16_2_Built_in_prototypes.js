'use strict';           // jshint ignore: line

const obj = { };
// '{ ]' has the same effect as 'new Object()', so obj is created using build-in Object constructor-function.
// Object constructor-function has a 'prototype' property, the value is an object with numerous built-in functions, as toString().
// So every object, created by an Object constructor function, has a [[prototype]] property set to that 'prototype' property value.
console.log(obj.toString());                                // Output: [object Object]
console.log(obj.__proto__ === Object.prototype);            // Output: true
console.log(obj.toString === Object.prototype.toString);    // Output: true
console.log(obj.toString === obj.__proto__.toString);       // Output: true
// There is no [[prototype]] property in Object's [[prototype]] value.
// As soon as oll prototype chains end with an Object prototype due to the js specification - an Object prototype is always the last prototype in a prototype chain.
console.log(Object.prototype.__proto__);                    // Output: null

// There are other built-in constructor-functions - Array, Date, Function. All those store their own methods in prototypes.
// Their's prototypes chains also end with the Object prototype.
const arr = [1, 2, 3];                                              // Same as 'new Array(1, 2, 3)'
console.log(arr.__proto__ === Array.prototype);                 // Output: true
console.log(arr.__proto__.__proto__ === Object.prototype);      // Output: true
console.log(arr.toString());                                    // Output: 1, 2, 3      Prototype methods could override base Object's prototype's methods.
const func = function() { };
console.log(func.__proto__ === Function.prototype);             // Output: true
console.log(func.__proto__.__proto__ === Object.prototype);     // Output: true

console.dir([1, 2, 3]);                                         // console.dir(obj) could be used to output prototypes chain in a browser's console.

const num = 1;                                                      // Primitives (strings, numbers, booleans) are not objects, but...
console.log(num.__proto__ === Number.prototype);                // Output: true     // ...when accessing a method on a primitive - a wrapper object is created under the hood.
console.log(num.toString === Number.prototype.toString);        // Output: true
console.log(num.__proto__.__proto__ === Object.prototype);      // Output: true

// Both 'undefined' and 'null' types have no wrapper objects, so as prototypes/methods.

// Built-in prototypes could be modified, those changes influence all objects having those prototypes in a prototype chain.
String.prototype.logToConsole = function() {
    console.log(this);
};
'aString'.logToConsole();                       // Output: aString
// Built-in prototypes modification is a bad practice, it leads to conflicts when different libraries change the same prototype.
// There is one exclusive case when it's appropriate to modify a built-in prototype - to implement a polyfill.

// Built-in prototype's methods could be borrowed by other object's prototype. A borrowed method must be compatible with the borrowing object implementation.
const arrayLike = {
    0: '0',
    1: '1',
    length: 2
};
arrayLike.join = Array.prototype.join;              // Method Array.keys() demands an object to have indexes and a length property, so arrayLike is compatible.
console.log(arrayLike.join(', '));   // Output: 0, 1

// Alternatively to borrowing a method - an object could borrow the whole prototype to have all prototype's methods.
arrayLike.__proto__ = Array.prototype;

/*
There are rules, common for all built-in objects:
    * methods are stored in prototypes
    * data (properties, dates, array elements) are stored in object itself
 */






