'use strict';               // jshint ignore: line

/*
An object's property consists of a key and a value. Besides that an object's property has 3 special attributes (aka flags):
1. writable         true - could be changed, false - read only.
2. enumerable       true - used by cycles, false - ignored by cycles.
3. configurable     true - property is deletable and flags are changeable, false - property is not deletable and flags are read only.
When common object with properties is defined - all those flags have default true value.
*/

// Object.getOwnPropertyDescriptor() method could be used to get all property's flags.
// const descriptor = Object.getOwnPropertyDescriptor(object, propertyName);
let user = {
    name: 'John',
    toString() {                // Note: default toString() is not enumerable, custom - becomes enumerable by default.
        return this.name;
    }
};
console.log(Object.getOwnPropertyDescriptor(user, 'name'));     // Output: { value: 'John', writable: true, enumerable: true, configurable: true }

// Object.defineProperty() method could be used to change an object property's flag.
// Object.defineProperty(object, propertyName, descriptor);
// If the property exists - it's value and flags arg changed if supported, if doesn't exist - new property is created using the descriptor argument.
// descriptor argument is required, value is considered undefined by default, flags values are considered false by default.
Object.defineProperty(user, 'age', { });
console.log(Object.getOwnPropertyDescriptor(user, 'age'));      // Output: { value: undefined, writable: false, enumerable: false, configurable: false }
Object.defineProperty(user, 'sex', { value: 'Male', writable: true, enumerable: true, configurable: true});
console.log(Object.getOwnPropertyDescriptor(user, 'sex'));      // Output: { value: 'Male', writable: true, enumerable: true, configurable: true }
Object.defineProperty(user, 'sex', { value: 'Female', writable: false, enumerable: false, configurable: false });
console.log(Object.getOwnPropertyDescriptor(user, 'sex'));      // Output: { value: 'Female', writable: false, enumerable: false, configurable: false }

// user.sex = 'Male again';                                         // TypeError: Cannot assign to read only property 'sex' of object '#<Object>'

function printUserKeys() {
    let userKeys = '';
    for (let key in user) {
        userKeys += `${key} `;
    }
    console.log(userKeys);
}
printUserKeys();                        // Output: name toString        Custom toString() is enumerable by default.
console.log(Object.keys(user));         // Output: [ 'name', 'toString' ]
Object.defineProperty(user, 'toString', { enumerable: false });
printUserKeys();                        // Output: name                 Now toString() is non-enumerable (like default toString() implementation).
console.log(Object.keys(user));         // Output: [ 'name' ]           Object.keys() ignores non-enumerable properties also.

// Some built-in objects and properties have configurable flag set to false. Non-configurable property couldn't be deleted nor modified by Object.defineProperty().
// Once defined non-configurable property couldn't become configurable again.
console.log(Object.getOwnPropertyDescriptor(Math, 'PI'));                // Output: { value: 3.141592653589793, writable: false, enumerable: false, configurable: false }
// Math.PI = 1;                                                             // TypeError: Cannot assign to read only property 'PI' of object '#<Object>'
// delete Math.PI;                                                          // TypeError: Cannot delete property 'PI' of #<Object>
// Object.defineProperty(Math, 'PI', { value: 1 });                         // TypeError: Cannot redefine property: PI
// Object.defineProperty(Math, 'PI', { writable: true });                   // TypeError: Cannot redefine property: PI
// Object.defineProperty(Math, 'PI', { configurable: true });               // TypeError: Cannot redefine property: PI

// Property's flags restriction errors (write non-writable, configure non-configurable) are respected in strict mode only and are ignored otherwise.

// Object.defineProperties(obj, descriptors) could be used to modify/append multiple properties with one pass.
Object.defineProperties(user, {
    name: { value: 'Mary', enumerable: true },
    mood: { value: 'Calm', writable: false, enumerable: true }
});
console.log(user);              // Output: { name: 'Mary', mood: 'Calm' }

// Object.getOwnPropertyDescriptors(obj) could be used to get all object's properties at once.
console.log(Object.getOwnPropertyDescriptors(user));
/*
Output:
{ name:
   { value: 'Mary',
     writable: true,
     enumerable: true,
     configurable: true },
  toString:
   { value: [Function: toString],
     writable: true,
     enumerable: false,
     configurable: true },
  age:
   { value: undefined,
     writable: false,
     enumerable: false,
     configurable: false },
  sex:
   { value: 'Female',
     writable: false,
     enumerable: false,
     configurable: false },
  mood:
   { value: 'Calm',
     writable: false,
     enumerable: true,
     configurable: false } }
 */

/*
Object.getOwnPropertyDescriptors() could be used in conjunction with Object.defineProperties() to clone an object with all it's properties and flags.
The simple cloning method [[[ for (let key in obj) { clone[key] = obj[key] } ]]] do not copy properties's flags nor respect Symbol properties.
Object.getOwnPropertyDescriptors() - Object.defineProperties() copy both flags and Symbol properties.
 */


// There are methods to control all object properties at once. Those methods a rarely used in practice.
// Object.preventExtensions(obj)        prevents appending properties to an object
// Object.isExtensible(obj)             checks if appending properties is allowed
// Object.seal(obj)                     prevents appending/deletion of properties, changes configurable flag value to false for all properties
// Object.isSealed(obj)                 checks if appending/deletion of properties is restricted
// Object.freeze(obj)                   prevents appending/deletion/modification of properties, changes both configurable and writable flags to false for all properties
// Object.isFrozen(obj)                 checks if appending/deletion/modification of properties is restricted