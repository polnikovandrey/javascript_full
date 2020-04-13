'use strict';   // jshint ignore:line

// see 2.html

/* ----- There are 6 basic data types in js. ----- */
var number = 5;                 // Number
var string = 'Hello!';          // String
var symbol = Symbol();          // Symbol, rarely used.
var boolean = true;             // boolean - true/false.
var aNull = null;
var anUndefined = undefined;    // jshint ignore: line

console.log(typeof number);         // Output: number
console.log(typeof string);         // Output: string
console.log(typeof symbol);         // Output: symbol
console.log(typeof boolean);        // Output: boolean
console.log(typeof aNull);          // Output: object           This is a known js bug, null is an object type.
console.log(typeof anUndefined);    // Output: undefined


/* ----- There are 6 object data types. ----- */
var object = {};    // Plain object - not prototyped Object instance (i.e. NOT array, function, date, ...).
var array = [];     // Array.
var aFunction = function() {};
var date = new Date();
var regexp = new RegExp('');
var error = new Error();

console.log(typeof object);         // Output: object
console.log(typeof array);          // Output: object
console.log(typeof aFunction);      // Output: function         Function is also an object, but typeof returns 'function'.
console.log(typeof date);           // Output: object
console.log(typeof regexp);         // Output: object
console.log(typeof error);          // Output: object

/* ----- bigint ----- */
// There is additional numeric data type bigint - to deal with integer values of arbitrary length.
// const aBigInt1 = BigInt(12312312312);
// const aBigInt2 = 12312123n;              // Note: number ends with 'n' - means bigint;
// console.log(aBigInt);                    // Output: bigint


/* ----- Number type variable could contain: Integer, Float, Infinity and NaN values. ----- */
var integerNumber = 1;
var floatNumber = 1.111;
var infinityNumber = 1/0;
var nanNumber = 1/'aSting';
console.log('Integer number value: ' + integerNumber);          // Output: 1
console.log('Float number value: ' + floatNumber);              // Output: 1.111
console.log('Infinity number value: ' + infinityNumber);        // Output: Infinity
console.log('NaN number value: ' + nanNumber);                  // Output: NaN

/* ----- String type value is quoted with ' (single) " (dobule) ` (back) quotes. Inner quotes other then outer are escaped. ----- */
var singleQuotes = 'abra"ka"dabra';
var doubleQuotes = "abra'ka'dabra";
var backQuotes = `abra"k"'a'dabra`;
console.log('Single quoted: ' + singleQuotes);                  // Output: abra"ka"dabra
console.log('Double quoted: ' + doubleQuotes);                  // Output: abra'ka'dabra
console.log('Back quoted: ' + backQuotes);                      // Output: abra"k"'a'dabra

/* ----- Null vs undefined.  ----- */
// Null is a variable, which doesn'n exist.
// console.log(notExistingVariable);                            // Output: Uncaught ReferenceError: notExistingVariable is not defined
// Undefined is a variable, which exists, but has no value.
var existingVariable;
console.log(existingVariable);                                  // Output: undefined

/* ----- Object is a data structure for storing values of any other types. Object is a collection or map of data. ----- */
// Object consists of any number of property(method) / value pairs.
let person = {
    name: 'John',
    age: 18,
    married: true
};
let personName = person.name;       // Property value could be accessed by object-dot-property.
let personAge = person['age'];      // The other option - square brackets with a property name string inside.
console.log('Person name: ' + personName);
console.log('Person age: ' + personAge);

/* ----- Array is a type of object, which holds values under indexed properties. ----- */
let array1 = ['value0', 'value1', 'value2'];
console.log('Array value at zero index: ' + array1[0]);     // Output: value0


/* ----- Primitive as object ----- */
// There are 4 primitive wrappers (objects) - Boolean, String, Number, Symbol. When a method is called on primitive - actually a wrapper is created and it's method is called.
// There are constructors, which make possible to create wrappers. But it's highly recommended to avoid explicit wrappers creation.
let zero = new Number(0);
if (zero) {                                             // Object is always true in logical context, zero becomes true here.
    console.log(typeof 0);                              // Output: number
    console.log(typeof new Number(0));            // Output: object
}
// Instead of wrapper creation with the new operator - casting to specific primitive type usage is acceptable.
console.log(Number("123"));                       // Output: 123        It's ok to cast to a number.
// Both null and undefined primitive types has no wrappers, so there are no methods for those types.
// console.log(null.test);                              // Error: Cannot read property 'test' of null
// Primitive wrappers could'n be used to store a property/method. Error in strict mode, empty in non-strict mode (because wrapper-object is reconstructed each time).
let primitiveToStoreAProperty = '123';
// primitiveToStoreAProperty.test = 'test';             // Error: cannot create property 'test' on string '123'.        (in strict mode)
// console.log(primitiveToStoreAProperty.test);         // Output: undefined.                                           (in not-strict mode)