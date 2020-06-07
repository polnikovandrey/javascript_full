'use strict';           // jshint ignore: line

// instanceof syntax:   obj instanceof Class
// Returns true if an object is of type Class or extends Class. Also works for built-in classes and constructor-functions.
class MyClass { }
function MyConstructedClass() { }
console.log(new MyClass() instanceof MyClass);                                  // Output: true
console.log(new MyClass() instanceof Object);                                   // Output: true
console.log(new MyConstructedClass() instanceof MyConstructedClass);            // Output: true

/*
instanceof uses prototypes chain under the hood By default. This behavior could be customized with the help of the static method Symbol.hasInstance.
So exact 'obj instanceof Class' algorithm is as follows:
1. If Class has Symbol.hasInstance method - instanceof returns the boolean result of a 'Class[Symbol.hasInstance](obj)' call.
2. Otherwise check if Class.prototype belongs to obj's prototypes chain and return the result:
    obj.__proto__ === Class.prototype || obj.__proto__.__proto__ === Class.prototype || obj.__proto__.__proto__.__proto__ === Class.prototype || ...

 */
class WithHasInstance {
    static [Symbol.hasInstance](obj) {
        return obj.isWithHasInstance;
    }
}
console.log({ isWithHasInstance: true } instanceof WithHasInstance);                        // Output: true
class ExtendsMyClass extends MyClass { }
console.log(new ExtendsMyClass() instanceof ExtendsMyClass);                                // Output: true
console.log(new ExtendsMyClass() instanceof MyClass);                                       // Output: true
console.log(new ExtendsMyClass() instanceof Object);                                        // Output: true
console.log(new ExtendsMyClass().__proto__ === ExtendsMyClass.prototype);                   // Output: true
console.log(new ExtendsMyClass().__proto__.__proto__ === MyClass.prototype);                // Output: true
console.log(new ExtendsMyClass().__proto__.__proto__.__proto__ === Object.prototype);       // Output: true

// There is a method to check if an object belongs to other object's prototype chain:       objA.isPrototypeOf(objB)
// It could be used as an alternative for instanceof like so:                               Class.prototype.isPrototypeOf(obj)
console.log(MyClass.prototype.isPrototypeOf(new ExtendsMyClass()));
// It should be noted than constructor itself is not used by both instanceof and isPrototypeOf. Prototypes chain is used for that only.
function ToLooseAPrototype() { }
const toLooseAPrototype = new ToLooseAPrototype();
ToLooseAPrototype.prototype = { };
console.log(toLooseAPrototype instanceof ToLooseAPrototype);                                // Output: false    Existing object lost it's prototype.
console.log(new ToLooseAPrototype() instanceof ToLooseAPrototype);                          // Output: true     Newly created object was recognized.
// Another example of a 'strange' behavior of instanceof.
function A() { }
function B() { }
A.prototype = B.prototype = { };
console.log(new A() instanceof B);                 // Output: true     The reason is a line below. Constructor means nothing for instanceof, prototypes chain matters only.
console.log(new A().__proto__ === B.prototype);    // Output: true

/*
obj.toString returns [object Object] by default. This method could also be borrowed to output a type of an arbitrary object, including primitive types:
- [object Number] for a number
- [object Boolean] for a boolean
- [object Null] for a null
- [object Undefined] for an undefined
- [object Array] for an array
- ...
*/
const object = { };
console.log(object);                            // Output: {}
console.log(object.toString());                 // Output: [object Object]
const objToString = Object.prototype.toString;
const array = [ ];
console.log(objToString.call(array));           // Output: [object Array]           // Execute Object.toString in the context of this=array.
console.log(objToString.call(123));     // Output: [object Number]
console.log(objToString.call(null));    // Output: [object Null]
console.log(objToString.call(console.log));    // Output: [object Function]

// obj.toString behavior could by customized with the help of the Symbol.toStringTag property. It' value is used inside [object ...] output.
const withToStringTag = {
    [Symbol.toStringTag]: 'Howdy'
};
console.log(withToStringTag.toString());                                // Output: [object Howdy]
console.log(objToString.call(withToStringTag));                         // Output: [object Howdy]
// A number of environment-specific objects built-in objects have that property defined.
// console.log(window[Symbol.toStringTag]);                             // Output: window               Browser only.
// console.log(XMLHttpRequest.prototype[Symbol.toStringTag]);           // Output: XMLHttpRequest       Browser only.
// console.log({}.toString.call(window));                               // Output: [object window]
// console.log({}.toString.call(new XMLHttpRequest()));                 // Output: [object XMLHttpRequest]

