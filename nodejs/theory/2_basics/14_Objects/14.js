'use strict';           // jshint ignore: line

// There are 2 methods to declare an object: new Object() and curly braces {}.
const rareObject = new Object();        // Legal, but rarely used method.
const commonObject = {                  // Mostly used method to declare an object.
    firstProperty: 'Hello ',
    secondProperty: 'world!',
    aMethod: function() {
        return this.firstProperty + this.secondProperty;
    }
};
console.log(commonObject);                  // Output: { firstProperty: 'Hello ', secondProperty: 'world!', aMethod: [Function: aMethod] }
console.log(commonObject.firstProperty);    // Output: Hello
console.log(commonObject['firstProperty']); // Output: Hello
console.log(commonObject.aMethod);          // Output: [Function: aMethod]
console.log(commonObject.aMethod());        // Output: Hello world!

commonObject.thirdProperty = 'Hooray!';     // Writing a new property.
console.log(commonObject.thirdProperty);    // Output: Hooray!
commonObject.propertyObject = {             // Writing a new property, the value is another object.
    aProperty: 'some value',
    aMethod: function () {
        // some logic
    }
};

delete commonObject.thirdProperty;                                      // Deleting a property.
console.log(commonObject.thirdProperty);                                // Output: undefined

for (let key in commonObject) {                                         // Cycling through object properties.
    console.log("KEY: " + key + ", VALUE: " + commonObject[key]);
}
console.log(Object.keys(commonObject).length);                          // Output: 4        The total number of methods and properties.

