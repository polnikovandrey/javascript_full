'use strict';           // jshint ignore: line

// Prototype-based inheritance allows to create objects, based on other object (inherit is's properties and methods).
// In javascript all objects have a special property [[Prototype]] with a null value or a link to a prototype-object.
// When a property or a method is requested on an object and there is no such property/method - prototype-object is used to look for this property too.
// This mechanism is being called a 'prototype-based inheritance'. [[Prototype]] property is built-in and hidden, but there is a number of methods to modify it's value.

// __proto__ getter/setter could be used to modify a [[Prototype]] value.
// __proto__ is deprecated, there are it's modern analogs - Object.getPrototypeOf() and Object.setPrototypeOf().
const animal = {
    petName: 'animal',
    eats: true,
    walk() {
        return 'Walking...';
    },
    get name() {
        return this.petName;
    },
    set name(petName) {
        this.petName = petName;
    }
};
const rabbit = {
    jumps: true
};
rabbit.__proto__ = animal;              // Now 'animal' is a prototype object of a rabbit. Animal's properties/methods are inherited by a rabbit.
console.log(rabbit.jumps);              // Output: true
console.log(rabbit.eats);               // Output: true
console.log(rabbit.walk());             // Output: Walking...
/*
Prototypes chain could be of an arbitrary length. There are only 3 limitations:
1. prototypes chain must not loop (there should be no cycling).
2. [[Prototype]] value could be a null or an object, other types are denied.
3. There could be only one prototype per object.
 */
const longEar = {
    earLength: 10
};
longEar.__proto__ = rabbit;             // 'longEar' inherits both rabbit's and animal's properties and methods.
console.log(longEar.walk());            // Output: Walking...

// Prototype object is used only when reading a property/method. Prototype is not used when writing or deleting a property/method.
rabbit.walk = function() {              // Now rabbit has it's own walk() method. Animal's walk() method stays intact.
    return 'Rabbit walking...';
};
console.log(rabbit.walk());             // Output: Rabbit walking...
rabbit.eats = false;                    // Rabbit now has it's own 'eats' property.
console.log(rabbit.eats);               // Output: false
console.log(animal.eats);               // Output: true

// There is an exception - prototype's accessor methods are used when writing a value.
rabbit.name = 'snowflake';              // Prototype's setter is used to create and write rabbit's own 'petName' property value.
// Note: prototypes don't influence on 'this' value in any way. 'this' value is always the object before a dot ('rabbit' for 'rabbit.name = ...').
console.log(rabbit.name);               // Output: snowflake
console.log(rabbit.petName);            // Output: snowflake
console.log(animal.name);               // Output: animal
// Setting a prototype's properties/methods through inheriting object influences only inheriting object's properties/methods.
// Methods are common for both prototype and inheriting object, but state is different (own) for both prototype and inheriting object.
const base = {
    baseOnlyProperty: true,
    active: false,
    activate() {
        this.active = true;
    }
};
const inheriting = {
    __proto__: base
};
inheriting.activate();
console.log(inheriting.active);                 // Output: true
console.log(base.active);                       // Output: false

// for..in cycles through both own and prototype keys. Own properties could be filtered by using obj.hasOwnProperty(key) method.
let output = '';
for (let key in inheriting) {
    output += `[${key}] key is own = ${inheriting.hasOwnProperty(key)}; `;
}
console.log(output);                            // Output: [active] key is own = true; [baseOnlyProperty] key is own = false; [activate] key is own = false;
// Note: literal objects (declared with {} notation like 'base' or 'inheriting') include Object.prototype in inheritance chain by default. That is why
// 'inheriting.hasOwnProperty(key);' could be used - it's an Object.prototype's method. for..in cycle doesn't cycle through Object.prototype's properties/methods
// because all of them have false 'enumerable' flag value.

// Object.keys(), Object.values() and alike methods return object's own keys/values only (including own keys/values, already created by using a prototype methods).
console.log(Object.keys(inheriting));           // Output: [ 'active' ]

// Note: method writeToArray doesn't rewrite arr property, it uses it to push a value inside. So arr is the same both for withArray, withArray1 and withArray2.
const withArray = {
    arr: [],
    writeToArray(value) {
        this.arr.push(value);
    }
};
const withArray1 = {
    __proto__: withArray
};
const withArray2 = {
    __proto__: withArray
};
withArray1.writeToArray(1);
console.log(withArray2.arr);                    // Output: [ 1 ]
// It's recommended for inheriting object to have it's own prototype's properties analogs to prevent such unintuitive behavior (both withArray1 and withArray2 have own 'arr' key).
