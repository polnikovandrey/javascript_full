'use strict';           // jshint ignore: line

/* Recursion and stack. */
// A base case of a recursion - is a terminal scenario of a recursion (when recursion ends).
// A recursive step - is a scenario, which leads to a recursive call.
// A depth of a recursion - is a number of recursive calls for a set of arguments.
// The average depth allowed by different js engines is about 10000 calls.
// Each function has exactly one execution context, which stores some info about an execution process.
// Execution context stores the current position of the interpreter, local variables, 'this' value and other service data.
// When other function is being called - execution stops, execution context is memoized in a stack of execution contexts, other function is being executed
// in it's own execution context, other function finish it's execution, original function's execution context is being restored from stack, execution continues.


/* Rest parameters and spread operator. */

// Ordinary function could be called with an arbitrary number of arguments. Excess arguments are being ignored.
function withOneParameter(parameter) { }
withOneParameter(1, 2, 3, 4);       // No error, arguments 2-3 are being ignored.
// A function with a rest parameter accepts all excess argument and places in an array, named as the rest parameter. Rest parameter should be the last parameter in a function.
function printRestArguments(parameter, ...restParameters) {
    console.log(restParameters);
}
printRestArguments(null, 1, 2, 3, 4);    // Output: [ 1, 2, 3, 4 ]

// All function's arguments could be accessed through an array-like 'arguments' property.
function printAllArguments() {
    console.log(arguments);
}
printAllArguments(1, 2, 3, 4);      // Output: { '0': 1, '1': 2, '2': 3, '3': 4 }

// Arrow function don't have it's own 'arguments' property, it stores the outer function arguments. 'this' property of an arrow function is undefined.
function withArrowFunction() {
    const arrowFunction = () => console.log(`this=${this}, arguments=${arguments}, arrayFromArguments=${Array.from(arguments)}`);
    arrowFunction();
}
withArrowFunction(1, 2, 3, 4);      // Output: this=undefined, arguments=[object Arguments], arrayFromArguments=1,2,3,4

// Spread operator is used to transform an iterable object to a list of elements when used as a function argument.
const arrayOfNumbers = [ 1, 2, 3, 4 ];
console.log(Math.max(arrayOfNumbers));      // Output: NaN      Math.max() expects a list of numbers, not array.
console.log(Math.max(...arrayOfNumbers));   // 4
const anotherArrayOfNumbers = [ 5, 6, 7, 8 ];
console.log(Math.max(...arrayOfNumbers, ...anotherArrayOfNumbers));     // Output: 8
console.log(Math.max(-1, 0, ...arrayOfNumbers, 777, ...anotherArrayOfNumbers, 9));      // Output: 777
// Arrays could be concatenated with the help of a spread operator.
console.log([-1, 0, ...arrayOfNumbers, 777, ...anotherArrayOfNumbers, 9]);      // Output: [ -1, 0, 1, 2, 3, 4, 777, 5, 6, 7, 8, 9 ]
// Strings could be transformed to an array with the help of a spread operator.
console.log([...'Hello!']);                     // Output: [ 'H', 'e', 'l', 'l', 'o', '!' ]
console.log(Array.from('Hello!'));      // Output: [ 'H', 'e', 'l', 'l', 'o', '!' ]
// Spread iterates objects (as for..of does) to transform argument to the array.
// Note: result of ...str and Array.from() is the same, but there is a difference. Array.from() works with both pseudo-arrays and iterable objects, spread - only with iterables.


/* Closures. */
// https://learn.javascript.ru/closure
// Each function, code block and script has inner hidden corresponding object LexicalEnvironment. LexicalEnvironment object consists of two parts:
// * EnvironmentRecord object - stores 'this' value, local variables and some other data in it's properties
// * reference to the outer LexicalEnvironment (outer relative to the current function/block/script curly braces).
// So under the hood a local variable is a property of the EnvironmentRecord object.
// To get/set a local variable means to get/set the according property of the EnvironmentRecord object.
// The global LexicalEnvironment's reference to the outer LexicalEnvironment is always null.
// A variable is added to the EnvironmentRecord when interpreter reaches the variable's declaration.
// A declared global function is added to the global EnvironmentRecord on the script initialization.
// Each time a function is being called - a new LexicalEnvironment is being created.
// Each function has a hidden [[Environment]] object, created upon declaration. It refers to the LexicalEnvironment of the declaring function/block/script.
// When a function uses an outer variable - it gets the current value of the closest outer EnvironmentRecord
// (there could be multiple common-name variables in different EnvironmentRecords).
// 'if' code block has it's own LexicalEnvironment. 'for' and 'while' code blocks create a new LexicalEnvironment on each iteration.
// Regular code blocks could be used to isolate variables from the outer context.

// An enclosed function is a function, which is declared inside another function. Enclosed function could be returned by enclosing function and used somewhere else in the code.
// Regardless of the enclosed function's place of call - it would have access to the same LexicalEnvironment (relative to the place of declaration), so to the same outer variables.

// Closure is a function, which remembers and have access to it's outer variables. In JavaScript all functions are closures, excluding functions created with new Function.

// IIFE - Immediately-Invoked Function Expression. They where used to isolate variables before the LexicalEnvironment implementation. It's a stale method and shouldn't be used.
(function iife() {
    console.log('IIFE');
})();                       // Output: IIFE


/* var stale keyword. */

// In contrast to let and const, var do not obey all code block scope restrictions.
// The scope of var is limited by a function for local variables or by a script for global variables, other code blocks do not limit var's scope.
function withVar() {
    const insideFunctionConst = 'Not usable outside of the function';
    let insideFunctionLet = 'Not usable outside of the function';
    var insideFunctionVar = 'Not usable outside of the function';
}
// console.log(insideFunctionConst);    // ReferenceError: insideFunctionVar is not defined
// console.log(insideFunctionVar);      // ReferenceError: insideFunctionVar is not defined
// console.log(insideFunctionLet);      // ReferenceError: insideFunctionVar is not defined
if (true) {
    const insideIfCodeBlockConst = 'Not usable outside of the code block';
    let insideIfCodeBlockLet = 'Not usable outside of the code block';
    var insideIfCodeBlockVar = 'Usable outside of the code block';      // var is a local variable only inside a function, global otherwise.
}
// console.log(insideIfCodeBlockConst);     // ReferenceError: insideFunctionVar is not defined
// console.log(insideIfCodeBlockLet);       // ReferenceError: insideFunctionVar is not defined
console.log(insideIfCodeBlockVar);          // Usable outside of the code block

for (var i = 0; i < 10; i++) { }
console.log(i);                 // Output: 9    var is a global variable. Use 'let' to limit the scope of a variable to the the cycle code block.
for (let j = 0; j < 10; j++) { }
// console.log(j);              // ReferenceError: j is not defined

// local var declaration is handled at the beginning of a function execution, global var - at the beginning of a script execution (regardless of the actual line position).
(function amazingVars() {
    sadButTrue = true;          // var is declared already regardless the fact that var declaration is below this line and var code block will never be executed.
    console.log(declaredButNotAssignedYet);     // Output: undefined    variable is declared, but the value was not assigned yet.
    declaredButNotAssignedYet = true;
    if (false) {
        var sadButTrue;
    }
    var declaredButNotAssignedYet;
    console.log(sadButTrue);                    // Output: true        This var behavior is called "hoisting".
})();



/* Global object. */
// Global object provides access to global variables and functions, including built-in. It's name is 'window' in a browser, 'global' in a NodeJs environment, could differ
// in other js environments. New js conventions suggest to name it 'globalThis', one should check support before usage, there is a polyfill in case it's not supported.
// Code below should be run in a browser to work properly, it uses a 'window' as the global object.

// Global object's variables and functions could be accessed directly.
/*
alert("true");           // That call
window.alert(true);      // totally matches this.
*/

// var becomes a global object's variable, let - doesn't (scope is limited to the containing script).
// In modern projects, which use modules to limit the scope, var does not become a global variable.
/*
var globalVar = true;
window.alert(window.globalVar);         // Output: true
let notGlobalVar = true;
window.alert(window.notGlobalVar);      // Output: undefined
*/

// var shouldn't be used to declare global variables. Explicit declaration should be used instead.
/*
window.customGlobalVar = true;
console.log(customGlobalVar);           // OK
console.log(window.customGlobalVar);    // OK   Explicit access could be used in case there is the local variable with the same name.
*/

// Global object contains built-in properties to check if some features are supported or not.
/*
if (!window.Promise) {
    window.Promise = {
        // Polyfill or implementation goes here.
    };
}
*/



/* Function object, NFE (Named Function Expression. */
// Function is an object type, so it's possible to add/delete properties of a function, assign it to a variable by a reference, etc.
// Function object contains some useful properties.

// function.name returns a context-name of a function. Context name means that js tries to find the name of a function in case it has no explicit name.
function myFunctionDeclaration() { }
const myFunctionExpression = function() { };
console.log(myFunctionDeclaration.name);        // Output: myFunctionDeclaration
console.log(myFunctionExpression.name);         // Output: myFunctionExpression
const classWithFunctions = {
    innerFunctionDeclaration: function() { },
    innerFunctionExpression() { }
};
console.log(classWithFunctions.innerFunctionDeclaration.name);      // Output: innerFunctionDeclaration
console.log(classWithFunctions.innerFunctionExpression.name);       // Output: innerFunctionExpression
// There are few cases it's impossible to define the name of a function - empty string is returned.
const arrayWithFunction = [function() { }];
console.log(arrayWithFunction[0].name);                             // Output:  (empty string)

// function.length returns the number of parameters, excluding ...rest parameter.
console.log((function() {}).length);                // Output: 0
console.log((function(a) {}).length);               // Output: 1
console.log((function(a, b) {}).length);            // Output: 2
console.log((function(a, b, ...c) {}).length);      // Output: 2

// Custom properties could be added to a function. Note: function properties and function local variables are not the same: properties are accessible outside, variables are not.
function withCounterProperty() {
    withCounterProperty.count++;
}
withCounterProperty.count = 0;
withCounterProperty();
withCounterProperty();
console.log(withCounterProperty.count);         // Output: 2

// Named Function Expression is a variant of a function expression. It differs from common function expression: it's accessible inside itself (recursive call is possible)
// and not visible outside of the function itself. It's used for recursive calls to handle situations when function declaration is overwritten somewhere in the code.
let nfe = function namedFunction() {
    if (false) {
        namedFunction();        // OK
        nfe();                  // TypeError: nfe is not a function
    }
};
const nfeCopy = nfe;
nfe = null;
nfeCopy();
// namedFunction();             // ReferenceError: namedFunction is not defined