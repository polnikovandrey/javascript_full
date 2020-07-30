'use strict';           // jshint ignore: line

// Proxy object wraps another object and intercepts/handles actions on that object. Basic syntax:
const target = {};      // Any object to wrap, including functions.
const handler = {};     // Proxy-configuration - an object with traps, i.e. methods to intercept operations on target.
const proxy = new Proxy(target, handler);
// If there is a trap for an action on a target object - the trap is being executed, otherwise - the action on the target object is being performed directly.
// A proxy behaves as a transparent wrapper is there are no traps inside handler.
proxy.test = 5;
console.log(proxy.test);        // Output: 5
console.log(target.test);       // Output: 5
for (let key in proxy) {        // Output: test                 Iteration works for a proxy
    console.log(key);
}
/*
A trap is a method with a specific name. That name corresponds to the action, which is going to be intercepted:
- get                       property reading
- set                       property writing
- has                       using the 'in' operator
- deleteProperty            using the 'delete' operator (deleting a property)
- apply                     function execution
- construct                 using the 'new' operator
- getPrototypeOf            using the 'Object.getPrototypeOf'
- setPrototypeOf            using the 'Object.setPrototypeOf'
- isExtensible              using the 'Object.isExtensible'
- preventExtensions         using the 'Object.preventExtensions'
- defineProperty            using the 'Object.defineProperty'/'Object.defineProperties'
- getOwnPropertyDescriptor  using the 'Object.getOwnPropertyDescriptor' (for...in, Object.keys/values/entries)
- ownKeys                   using the 'Object.getOwnPropertyNames'/'Object.getOwnPropertySymbols' (for...in, Object.keys/values/entries)
All those traps should follow the spec https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots to be used.
Different traps have different limitations according to the spec:
- set/delete traps should return true if the value was actually written/deleted, false otherwise
- getPrototypeOf trap should return the same value as the Object.getPrototypeOf method, called on the wrapped object.
- ... see the spec
 */

// It's highly recommended to overwrite original (wrapped) object with a Proxy everywhere to avoid confusion while coding.

// A 'get' trap syntax: get(target, property, receiver). Target - wrapped object, property - a property name, receiver - the 'this' value of a getter (if exists) of the property.
// A 'get' trap use case - implementation of the default value of an array.
let numbers = [ 1, 2, 3 ];
numbers = new Proxy(numbers, {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return 0;
        }
    }
});
console.log(numbers[123]);                  // Output: 0

// Another 'get' trap use case - returning the original word from dictionary if there is no corresponding entry.
let dictionary = {
    'Hello': 'Hola',
    'Bye': 'Adios'
};
dictionary = new Proxy(dictionary, {
    get(target, phrase) {
        if (phrase in dictionary) {
            return target[phrase];
        } else {
            return phrase;
        }
    }
});
console.log(dictionary['Proxy']);           // Output: Proxy

// A 'set' trap syntax: set(target, property, value, receiver).
// A 'set' trap use case - validation of values being added to the array - NaNs are being skipped with an error.
// Note that a proxy doesn't change the array's behavior - length is being applied correctly, push()/unshift() methods are being intercepted and work correctly.
let numbersOnly = [];
numbersOnly = new Proxy(numbersOnly, {
    set(target, property, value) {
        if (typeof value === 'number') {
            target[property] = value;
            return true;                    // boolean return value is required by the spec. Absent and falsy return values both lead to the TypeError.
        } else {
            return false;
        }
    }
});
try {
    numbersOnly.push('NaN');
} catch(error) {
    console.log(error);                     // TypeError: 'set' on proxy: trap returned falsish for property '0'
    console.log(numbersOnly);               // Output: []
}

// A 'ownKeys' and 'getOwnPropertyDescriptor' traps...