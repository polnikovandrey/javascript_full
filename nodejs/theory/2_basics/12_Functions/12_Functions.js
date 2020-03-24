'use strict';       // jshint ignore: line

let globalVariable = 1;                                 // Global means 'outside function'. Global variable is usable both inside and outside functions.
let globalVariableToOverride = 'globalVarValue';

// functionDeclaration(1, 2);                          // Valid call. Declared function is visible before declaration and so could be called before declaration.
// functionExpression(1, 2);                           // Not valid. ReferenceError: functionExpression is not defined.

function functionDeclaration(argument1, argument2, optionalArgument) {    // Function declaration. Is visible before declaration, could be called before declaration.
    argument1++;                                        // argument1 is a copy of outer variable parameter1, so it is a function local variable.
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

let parameter1 = 1;
functionDeclaration(parameter1, 2);


// console.log(localVariable);                          // Reference error: localVariable is not defined.
console.log(globalVariable);                            // Output: 2
console.log(globalVariableToOverride);                  // Output: globalVarValue



/*----- Closures (замыкания) -----*/
// https://medium.com/nuances-of-programming/%D1%8F-%D0%BD%D0%B8%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0-%D0%BD%D0%B5-%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%BB-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%87%D0%B0%D1%81%D1%82%D1%8C-%D0%BF%D0%B5%D1%80%D0%B2%D0%B0%D1%8F-3c3f02041970
// https://learn.javascript.ru/string
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number
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


/* ----- Function parameter default value and undefined value ----- */
function getDefaultValue() {
    return 'default';
}
// Parameters with default values should come after regular parameters.
function withDefaultParameterValue(paramWithoutDefalutValue, paramWithDefaultValue = 'default', paramWithDefaultFunctionValue = getDefaultValue()) {
    console.log(paramWithoutDefalutValue + '/' + paramWithDefaultValue + '/' + paramWithDefaultFunctionValue);
}
withDefaultParameterValue();        // Output: undefined/default/default


/* ----- Return value of a function ----- */
// Function without or with empty return results in undefined.
function withoutReturn() {
}
function withEmptyReturn() {
    return;
}
console.log(withoutReturn() === undefined);         // Output: true
console.log(withEmptyReturn() === undefined);       // Output: true

// Expression of a return statement should start on the return line. Otherwise compiler appends ';' after return, undefined is returned;
function wrongReturnUsage() {
    return
        2 + 2;
}
console.log(wrongReturnUsage() === undefined);      // Output: true