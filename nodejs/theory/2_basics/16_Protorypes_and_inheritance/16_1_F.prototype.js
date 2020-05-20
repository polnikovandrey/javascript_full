'use strict';           // jshint ignore: line

/*
An object could be created with a 'new F()' constructor-function call.
If a constructor-function contains a property 'prototype' (F.prototype) - an object, created by 'new F()' call,
would have a [[Prototype]] property set to F.prototype value.
Note: F.prototype is not a prototype of F, it's just a common property. But F.prototype value will become a prototype of an object, created by a 'new F()' call.
F.prototype is used to set a prototype only at the moment of a 'new F()' execution, after that F.prototype and object's prototype are not connected in any way.
F.prototype value could be changed, new objects created by a 'new F()' calls will have a new prototype value.
An object, created before F.prototype change, will keep it's value intact.
*/
let aObject = {
    isA: true
};
function B() { }
B.prototype = aObject;
const bObject = new B();
console.log(bObject.__proto__ === aObject);         // Output: true                 // bObject.__proto__ === aObject
console.log(bObject.isA);                           // Output: true                 // aObject is a prototype of bObject.

// F.prototype default value is an object with a single 'constructor' property with a value of F constructor-function.
// So all objects, created with a constructor-function having a default 'prototype' property, will have a 'constructor' property with a value of F constructor-function.
// A 'constructor' property is not enumerable both in a constructor-function and object, created by a constructor-function.
function C() { }
console.log(C.prototype);                           // Output: C { }                // 'constructor' property exists, but is not enumerable
console.log(C.prototype.constructor);               // Output: [Function: C]
console.log(C.prototype.constructor === C);         // Output: true
const cObject = new C();
console.log(cObject);                               // Output: C { }                // 'constructor' property exists, but is not enumerable
console.log(cObject.constructor);                   // Output: [Function: C]

// A 'constructor' property could be used to create another object of the same type.
const dObject = new cObject.constructor();
console.log(dObject.constructor);                   // Output: [Function: C]

/*
Javascript doesn't control a 'constructor' property's value in any way.
For example, a constructor-function's 'prototype' property could possibly be deleted, replaced with an object without a 'constructor' property
or a 'constructor' value could be set 'undefined'.
Objects, created with such constructor-function, will have a 'constructor' property of '[Function: Object]' or 'undefined' value.
So, the best practice is to retain the 'constructor' property in all cases:
    * to modify existing 'prototype', leaving a 'constructor' property intact;
    * to replace a 'prototype' property value with an object, having a correct 'constructor' property value).
 */
function E() { }
E.prototype = { };
console.log(new E().constructor);                   // Output: [Function: Object]
E.prototype = { constructor: undefined };
console.log(new E().constructor);                   // Output: undefined
E.prototype = undefined;
console.log(new E().constructor);                   // Output: [Function: Object]
E.prototype = { constructor: E, someProperty: 'someValue' };            // Overwriting a 'prototype' property, retaining a 'constructor' property.
console.log(new E().constructor);                   // Output: [Function: E]
E.prototype.anotherProperty = 'anotherValue';                           // Modifying a 'prototype' value, retaining a 'constructor' property.
console.log(new E().constructor);                   // Output: [Function: E]


function F(anArg) {
    this.anArg = anArg;
}

F.prototype = { aProperty: 'aValue' };
const fObject = new F('someArg');
delete fObject.aProperty;                           // 'delete' operator deletes only object's own properties, 'aProperty' belongs to F's prototype's object.
console.log(fObject.aProperty);                     // Output: aValue

F.prototype = { };
const fObject1 = new F('aValue');
// When looking for a 'constructor' property through fObject2's prototypes chain js compiler finds it in an Object's prototype.
// Object's constructor ignores all arguments, so fObject2's constructor argument will be ignored also.
const fObject2 = fObject1.constructor('aValue');
console.log(fObject2.anArg);                        // Output: undefined