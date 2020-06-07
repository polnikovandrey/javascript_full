'use strict';           // jshint ignore: line

// Built-in classes like Array, Map and others could be extended.
class ExtendedArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
}
const extendedArray = new ExtendedArray(1, 2, 3);
console.log(extendedArray.isEmpty());                                   // Output: false
console.log(extendedArray.constructor === ExtendedArray);               // Output: true
// As soon as object's constructor is ExtendedArray, extendedArray's methods which produce new objects using constructor return objects of type ExtendedArray.
const filteredExtendedArray = extendedArray.filter(item => item < 3);
console.log(filteredExtendedArray.__proto__);                           // Output: ExtendedArray {}
// Symbol.species could be used to customize this behavior - custom type could be specified to be used as a constructor in those methods.
class CustomSpeciesExtendedArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
    static get [Symbol.species]() {
        return Array;                           // Built-in Array type will be used by CustomSpeciesExtendedArray's methods to produce new array objects.
    }
}
const customSpeciesExtendedArray = new CustomSpeciesExtendedArray(1, 2, 3);
const filteredCustomSpeciesExtendedArray = customSpeciesExtendedArray.filter(item => item < 3);
console.log(filteredCustomSpeciesExtendedArray.__proto__.constructor);                              // Output: [Function: Array]
// Other collection types as Map, Set and others have the same behavior and Symbol.species could be used to customize that.

// It's known that both static and non-static methods are being inherited when extending a custom type.
// This rule is not applicable to the built-in classes - only non-static methods are being inherited, static methods are not.
// For example, Array and Date both extend Object and have Object's non-static methods. But Array's and Date's [[Prototype]] do not reference Object,
// but Object.prototype instead. So, Object's static methods are not accessible through object of the Array or Date types. Array.keys() or Date.keys() couldn't be used.
