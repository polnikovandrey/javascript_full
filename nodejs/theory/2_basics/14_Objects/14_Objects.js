'use strict';           // jshint ignore: line

// There are 2 methods to declare an object: new Object() and curly braces {}.
const rareObject = new Object();        // Legal, but rarely used constructor method.
const computedProperty = '1' + '2';
const commonObject = {                  // Mostly used 'literal object' or 'literal notation' method to declare an object.
    firstProperty: 'Hello ',
    secondProperty: 'world!',
    '4 words legal key': 'some value',  // Multiple words are legal for a key, but should be declared inside quotes.
    [computedProperty]: 'some value',   // Computed property is ok, but should be declared inside square brackets.
    undefinedKey: undefined,                                // undefined value is legal, but null should be used instead.
    aMethod: function() {
        return this.firstProperty + this.secondProperty;
    }
};
console.log(commonObject);                      // Output: { firstProperty: 'Hello ', secondProperty: 'world!', aMethod: [Function: aMethod] }
console.log(commonObject.firstProperty);        // Output: Hello
console.log(commonObject['firstProperty']);     // Output: Hello
console.log(commonObject.aMethod);              // Output: [Function: aMethod]
console.log(commonObject.aMethod());            // Output: Hello world!
console.log(commonObject.computedProperty);     // Output: some value
console.log(commonObject[computedProperty]);    // Output: some value

const newComputedPropertyName = 'newProp' + '1';
commonObject.thirdProperty = 'Hooray!';                     // Writing a new property.
commonObject[newComputedPropertyName + '2'] = 'some value'; // Writing a new computed property.
console.log(commonObject.thirdProperty);                    // Output: Hooray!
console.log(commonObject[newComputedPropertyName + '2']);   // Output: some value
commonObject.propertyObject = {                             // Writing a new property, the value is another object.
    aProperty: 'some value',
    let: 'some value',                                      // Reserved keywords are legal object keys.
    for: 'some value',                                      // Reserved keywords are legal object keys.
    aMethod1: function () {                                 // Property with function value is called a method.
        // some logic
    },
    aMethod2() {                                            // A shorthand version of a method declaration.
        // some logic
    }
};
commonObject.aMethod3 = function() {                        // Method could be added with function expression.
    console.log('aMethod3 was called');
};
commonObject.aMethod4 = makeObject;                         // So as function declaration.

function makeObject(name, age) {
    return {
        name: name,
        age: age
    };
}
function makeObjectWithShortcutProperties(name, age) {      // Returns the same object as previous function. 'name' is the shortcut for 'name: name'.
    return {
        name,
        age
    };
}

delete commonObject.thirdProperty;                                      // Deleting a property.
console.log(commonObject.thirdProperty);                                // Output: undefined

// Note the difference between 'object.key === undefined' and 'key in object' checks.
console.log(commonObject.undefinedKey === undefined);                   // Output: true     Check if a property exists or value is undefined.
console.log(commonObject.thirdProperty === undefined);                  // Output: true     Check if a property exists or value is undefined.
console.log('undefinedKey' in commonObject);                            // Output: true     Check if a property exists
console.log('thirdProperty' in commonObject);                           // Output: false    Check if a property exists


for (let key in commonObject) {                                         // Cycling through object properties.
    console.log("KEY: " + key + ", VALUE: " + commonObject[key]);
}
console.log(Object.keys(commonObject).length);                          // Output: 4        The total number of methods and properties.


// Object's keys sorting: integer (or castable to integer) keys are sorted by ascending order, other keys are sorted by insertion order.
const sortingKeysObject = {
    '+1': null,         // Not castable to an integer - insertion order.
    '1.2': null,        // Not castable to an integer - insertion order.
    '3': null,          // integer - ascending order
    2: null,            // integer - ascending order
    'notInt': null      // Not castable to an integer - insertion order.
};
let keys = '';
for (let key in sortingKeysObject) {
    keys += key;
    keys += ', ';
}
console.log(keys);      // Output: 2, 3, +1, 1.2, notInt,


// Objects comparison. == and === comparison returns true only if both operands represent the same object.
const object1 = { };
const object2 = object1;
const object3 = { };
console.log(object1 == object2);        // Output: true
console.log(object1 === object2);       // Output: true
console.log(object1 == object3);        // Output: false
console.log(object1 === object3);       // Output: false


// Objects cloning and merging. To clone object properties - deep cloning should be used (manual or lodash lib's cloneDeep() function).
const toClone = {
    property1: 'value1',
    property2: 'value2'
};
const clone1 = { };                                                         // Manual cloning.
for (let key in toClone) {
    clone1[key] = toClone[key];
}
const clone2 = Object.assign({}, toClone);                            // Object.assign cloning.
const toMerge = {
    property3: 'value3',
    property4: 'value4'
};
const toMerge1 = {
    property1: 'will be overwritten',                                       // If property exists - it will be overwritten.
    property5: 'value5'
};
Object.assign(toMerge1, toMerge, toClone);                                  // toMerge1 now contains: property1..5
const toMerge2 = Object.assign({}, toMerge, toMerge1, toClone);      // toMerge2 now contains: property1..5


/* ----- Symbols ----- */
// Both and only symbols and strings could be used as object keys. Symbol is a unique identifier.
const symbol1 = Symbol('1');
const symbol2 = Symbol('1');
console.log(symbol1 == symbol2);                    // Output: false        Symbols are unique, even with the same description.
console.log(symbol1.toString());                    // Output: Symbol(1)    Symbols are not automatically converted to a string by methods. toString() should be used.
// Symbols are used to hide properties, added to external objects (to prevent influence to external code logic). Symbol property could be accessed only by symbol itself.
const externalObject = { };                         // Even if external code creates a symbol with the same description - it will be the distinct symbol and distinct key.
externalObject[symbol1] = 'value1';
console.log(externalObject[symbol1]);               // Output: value1
const objectWithSymbol = {
    [symbol1]: 'value1',
    symbol2: 'value2'                               // Wrong usage - square brackets should be used.
};
console.log(objectWithSymbol[symbol1]);             // Output: value1
console.log(objectWithSymbol[symbol2]);             // Output: undefined
for (let key in objectWithSymbol) {                 // Symbol keys are not visible when cycling with a for loop.
    console.log(key);                               // Output: symbol2.         Only 'wrong' symbol is printed, it was converted to a string 'symbol2'.
}
console.log(Object.keys(objectWithSymbol));         // Output: [ 'symbol2' ]    Object.keys() doesn't see symbol properties also.
const objectWithSymbolClone = Object.assign({}, objectWithSymbol);      // But Object.assign() clones symbol properties.
console.log(objectWithSymbolClone[symbol1]);        // Output: value1
// To make symbols equal by description (same description = same symbol = same property) global symbols (global symbols registry) could be used.
const globalSymbol1 = Symbol.for('1');          // Symbol.for() gets an existing symbol with same description from registry or creates a new symbol in registry.
const globalSymbol2 = Symbol.for('1');
console.log(globalSymbol1 === globalSymbol2);       // Output: true
console.log(Symbol.for('1'));                  // Output: Symbol(1)
console.log(Symbol.keyFor(globalSymbol1));          // Output: 1
console.log(Symbol.keyFor(symbol1));                // Output: undefined        symbol1 is not global, global symbol registry is missing symbol1.
console.log(symbol1.description);                   // Output: 1 !!Should be 1, but undefined in with nodejs!! Description property could be used to get local symbol's key.
console.log(Object.getOwnPropertySymbols(objectWithSymbol));    // Output: [ Symbol(1) ]    This method gets symbol properties of an object.
console.log(Reflect.ownKeys(objectWithSymbol));     // Output: [ 'symbol2', Symbol(1) ]     This method gets all properties, including symbols.


/* ----- this keyword ----- */
let user = {
    name: 'Sly',
    sayThisName() {
        console.log(this.name);     // 'this' inside a method means 'an object before dot (or before square brackets) in the method call'.
    },
    sayUserName() {
        console.log(user.name);     // Variable name could be used instead of this, but such method will fail if the object is copied to another variable and user becomes null.
    }
};
user.sayThisName();                 // Output: Sly
user.sayUserName();                 // Output: Sly
user['sayThisName']();              // Output: Sly
const aUser = user;
user = null;
aUser.sayThisName();                // Output: Sly
// aUser.sayUserName();             // TypeError: Cannot read property 'name' of null


const obj1 = {
    name: 'obj1'
};
const obj2 = {
    name: 'obj2'
};
function printObjName() {
    console.log(this.name);         // this and this.name value depends on object to which function belongs and are calculated before a function call.
}
obj1.printObj = printObjName;
obj2.printObj = printObjName;
obj1.printObj();                    // Output: obj1
obj2.printObj();                    // Output: obj2

// The common rule is if 'this' is used inside a function - it should be called in the context of some object (should be used as a method of some object).
function printThis() {
    console.log(this);
}
function printThisProperty() {
    console.log(this.property);
}
printThis();                        // Output: undefined    Undefined in strict mode, global object (i.e. window in browser) in non-strict mode.
// printThisProperty();             // TypeError: Cannot read property 'property' of undefined


// this value is ok if method is called like 'obj.method();' or 'obj['method']()'. If parenthesis (function call) are used without 'obj.' - this becomes undefined.
obj1.printObj();                                // Output: obj1
const printObjVariable = obj1.printObj;
// printObjVariable();                          // TypeError: Cannot read property 'name' of undefined


const someString = 'some string';
const globalArrow = () => {                     // Arrow functions have no proprietary 'this'.
    console.log(this.someString);               // Output: undefined            this of arrow function means this of the closest outer normal function.
};
const someObj = {
    someKey: 'some value',
    someMethod() {
        const localArrow = () => {
            console.log(this.someString);       // Output: undefined            this = someObj. someObj doesn't have 'someString' key.
            console.log(this.someKey);          // Output: some value
        };
        localArrow();
    }
};
globalArrow();
someObj.someMethod();

















