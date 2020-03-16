'use strict';       // jshint ignore: line

let globalVariable = 1;                                 // Global means 'outside function'. Global variable is usable both inside and outside functions.
let globalVariableToOverride = 'globalVarValue';

// functionDeclaration(1, 2);                          // Valid call. Declared function is visible before declaration and so could be called before declaration.
// functionExpression(1, 2);                           // Not valid. ReferenceError: functionExpression is not defined.

function functionDeclaration(argument1, argument2, optionalArgument) {    // Function declaration. Is visible before declaration, could be called before declaration.
    console.log(argument1);                             // Output: firstParameterValue
    console.log(argument2);                             // Output: undefined
    let localVariable = 'someValue';                    // Local means 'inside function'. Local variable is usable only inside function block.
    globalVariable = 2;
    let globalVariableToOverride = 'overridenGlobalVarValue';
    console.log(globalVariableToOverride);              // Output: overridenGlobalVarValue
    if (optionalArgument) {                             // Every argument of a function could be skipped when function is called.
        console.log('There is an optional argument');
    }
    return argument1 + argument2;
}

var functionExpression = function(argument1, argument2) {   // Function expression is visible only after the expression (with no difference if var or let is used).
    return argument1 + argument2;
};

let arrowFunction = (argument1, argument2) => argument1 + argument2;    // Arrow function.

functionDeclaration(1, 2);


// console.log(localVariable);                          // Reference error: localVariable is not defined.
console.log(globalVariable);                            // Output: 2
console.log(globalVariableToOverride);                  // Output: globalVarValue



/*----- Closures (замыкания) -----*/
// https://www.codingame.com/playgrounds/6516/closures-in-javascript-for-beginners
// A closure is a function which has access to the variable from another function’s scope. This is accomplished by creating a function inside a function.
function getCounter() {
    let counter = 0;
    return function() {
        return counter++;
    };
}
let count = getCounter();
console.log(count());                       // Output: 0
console.log(count());                       // Output: 1
console.log(count());                       // Output: 2


/*----- Object properties and methods -----*/
let object = {
    aProperty: 1,                           // Property (key is a value).
    aMethod: function(argument) {           // Method (key is a function).
        return this.aProperty + argument;
    }
};
console.log(object.aProperty);               // Output: 1
console.log(object.aMethod(2));     // Output: 3


/*----- Some string and number methods -----*/
let str = 'Text';
console.log(str.toUpperCase());             // Output: TEXT
console.log(str.toLowerCase());             // Output: text
let num = 12.2;
console.log(Math.round(num));               // Output: 12
let px = '12.2px';
console.log(parseInt(px));                  // Output: 12
console.log(parseFloat(px));                // Output: 12.2



