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