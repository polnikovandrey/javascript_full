// see 2.html

/* ----- There are 6 basic data types in js. ----- */
var number = 5;                 // Number
var string = 'Hello!';          // String
var symbol = Symbol();          // Symbol, rarely used.
var boolean = true;             // boolean - true/false.
var aNull = null;
var anUndefined = undefined;

/* ----- There are 6 object data types. ----- */
var object = {};    // Simple object.
var array = [];     // Array.
var aFunction = function() {};
var date = new Date();
var regexp = new RegExp('');
var error = new Error();


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