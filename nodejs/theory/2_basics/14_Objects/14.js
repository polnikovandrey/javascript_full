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
    aMethod: function () {
        // some logic
    }
};

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






















