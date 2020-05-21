'use strict';       // jshint ignore: line

/*
// A __proto__ property is deprecated nowadays. There is a number of special methods to work with prototypes:
    * Object.create(proto, [descriptors)
    * Object.getPrototypeOf(obj)
    * Object.setPrototype(obj, proto)
*/
const a = {
    aKey: 'aValue'
};
const b = Object.create(a);
console.log(Object.getPrototypeOf(b));          // Output: { aKey: 'aValue' }
Object.setPrototypeOf(b, {});
console.log(Object.getPrototypeOf(b));          // Output: {}
const c = Object.create(a, { aKey1: { value: 'aValue1', enumerable: true }});
console.log(c.aKey1);                           // Output: aValue1

// Object.create() could be used for cloning - not deep, but a clone will contain all properties (both enumerable and non-enumerable), getters/setters and correct [[prototype]].
const cClone = Object.create(Object.getPrototypeOf(c), Object.getOwnPropertyDescriptors(c));

const withProto = {};
const withProto1 = new Object();
console.log(withProto.__proto__);       // Output: {}
console.log(withProto1.__proto__);      // Output: {}
withProto.__proto__ = {};                       // __proto__ could be changed, possibly by user input, possibly with some unwilling code (vulnerability exploit)
console.log(withProto.__proto__);       // Output: {}
withProto.__proto__ = 1;                        // __proto__ could be set with a non-object and non-null value, ignored by __proto__ setter - the reason of code logic errors.
console.log(withProto.__proto__);       // Output: {}
// To prevent __proto__ modification one should use an Object.create(null) method - the object's prototype won't have a [[Prototype]] and __proto__ getter/setter.
// This method is often used to implement collision-safe dictionaries (associative arrays) - objects to store key-value pairs only, possibly by user input.
// The alternative is to use a Map to store key-value pairs.
const woProto = Object.create(null);
woProto.__proto__ = 1;                                  // __proto__ is a common property in this case
console.log(woProto.__proto__);                 // Output: 1
console.log(Object.getPrototypeOf(woProto));    // Output: null
// console.log(woProto.toString());             // TypeError: woProto.toString is not a function        Object without prototype won't have built-in Object prototype methods.
console.log(Object.keys(woProto));              // Output: [ '__proto__' ]      Object.aMethod(obj) methods work fine, because the don't belong to the Object prototype.
Object.setPrototypeOf(woProto, {});
console.log(woProto.__proto__);                 // Output: 1        __proto__ remains a common property
console.log(Object.getPrototypeOf(woProto));    // Output: {}       [[Prototype]] was changed

/*
Related methods:
    * Object.keys(obj)                      returns an array of own enumerable keys
    * Object.values(obj)                    returns an array of own enumerable values
    * Object.entries(obj)                   returns an array of own enumerable key/value pairs
    * Object.getOwnPropertySymbols(obj)     returns an array of own Symbol keys
    * Object.getOwnPropertyNames(obj)       returns an array of own keys string values
    * Reflect.ownKeys(obj)                  returns an array of own keys (both enumerable and non-enumerable)
    * obj.hasOwnProperty(key)               returns a boolean indicating whether an obj has own key of name provided
All those methods work only with own keys/values, to get also inherited properties - for .. in cycle could be used.
 */
