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


/* 'new Function' syntax. */
// new Function syntax is used to transform a string function representation into a working function.
// const func = new Function([arg1, arg2, ...argN], functionBody);
// Note: arguments could be passed as a single argument of comma separated arguments string.
new Function('console.log("Function without arguments");')();       // Output: Function without arguments
new Function('a', 'b', 'console.log(a + b)')(2, 3);                 // Output: 5
new Function('a, b', 'console.log(a + b);')(2, 3);                  // Output: 5
// Function, created with a 'new Function' method, has no [[Environment]] (lexical environment) other than global. For security and minification reasons such function
// has no direct access to both local and global variables, functions, etc. To use one - it should be passed as an argument.
const globalConstant = 'globalConstant';
(function() {
    const localConstant = 'localConstant';
    // new Function('console.log(localConstant);')();                           // ReferenceError: localConstant is not defined
    // new Function('console.log(globalConstant);')();                          // ReferenceError: globalConstant is not defined
    new Function('a', 'console.log(a);')(localConstant);                   // Output: localConstant
    new Function('b', 'console.log(b);')(globalConstant);                  // Output: globalVariable
})();


/* setTimeout and setInterval */
// Both functions are being called 'execution planning functions'. Both functions are not part of js specification, but are provided by most execution environments.
// All browsers and NodeJs provide those functions.

// const timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);
// func|code is a function or a code string to be executed.
// delay - milliseconds.
// arg1, arg2 - those arguments are passed to the function. Not supported by IE9- .
function timeOuted() {
    console.log('timeOuted1');
}
setTimeout(timeOuted, 200);                                       // Output: timeOuted1                         After 200ms of waiting.
function timeOutedWithArguments(a, b) {
    console.log(`timeOutedWithArguments: ${a}, ${b}`);
}
setTimeout(timeOutedWithArguments, 200, 1, 2);          // Output: timeOutedWithArguments: 1, 2        After 200ms of waiting.
// setTimeout("console.log('timeOuted from string');", 200);             // Output: timeOuted from string               After 200ms of waiting. Not supported by NodeJs.

// timerId has not specification. Browser returns a number a the result of setTimeout() call, NodeJs - an object with additional properties.
// Anyway timerId could be used as an argument to the clearTimeout() function to stop the timer.
const timerId = setTimeout(() => console.log('Execution was planned, but canceled.'), 200);        // No output, timer will be canceled.
clearTimeout(timerId);

// setInterval() function has the same set of arguments as setTimeout(), but it's second is an interval (not delay). Function will be executed repeatedly
// with the interval specified until clearInterval() function is called.
let intervalAccumulator = '';
const intervalId = setInterval(() => intervalAccumulator+='setInterval();', 200);
setTimeout(() => {
    clearInterval(intervalId);
    console.log(intervalAccumulator);               // Output: setInterval();setInterval();setInterval();setInterval();setInterval();
}, 1100);                           // Note: 4 outputs instead of 5 if 1000 or even 1001 timeout is used.


// setInterval() alternative - recursive setTimeout() execution. It's more agile method, because interval could be corrected on each step.
// It's also more accurate then setInterval(), which does include the function execution time in delay. Recursive setTimeout() does not,
// so delay starts ticking exactly on recursive setTimeout() call - delay is guaranteed to be >= function's delay argument.
let delay = 100;
let recursiveTimerId;
let recursiveTimeoutAccumulator = '';
const incrementDelay = () => {
    if (delay < 1000) {
        recursiveTimeoutAccumulator += `Delay=${delay};`;
        delay += delay;
        recursiveTimerId = setTimeout(incrementDelay, delay);
    } else {
        console.log(recursiveTimeoutAccumulator);               // Output: Delay=100;Delay=200;Delay=400;Delay=800;
    }
};
incrementDelay();

// setTimeout() could be supplied with a 0 delay (same as no delay). In that case function execution will start ASAP, but after current code finishes execution.
setTimeout(() => console.log('ZDA 1'));
console.log('ZDA 2');                                           // Output: ZDA 2    ZDA 1

// Note: there is a feature for recursive timer calls in a browser js - starting from 5th recursive setTimeout() or setInterval() call
// the delay is automatically incremented by at least 4ms. NodeJs have no such feature.
// Both setTimeout() and setInterval() do not guarantee absolutely accurate delay - it may vary.
// Both setTimeout() and setInterval() functions are executed only after current code execution finishes.


/* Decorators (decorator functions), call forwarding, Function.call(), Function.apply() */

// Function could be used to decorate another function, i.e. to add functionality to another function. For example, could be used for caching.
// Decorator's advantages:
// * decorator-function is reusable, could be used with numerous functions.
// * decorator's logic is distinct, original function don't change and don't become more complex.
// * decorators could be joined together.
function heavySlowFunction(argsForHeavy) {
    // Here goes a heavy calculation.
    return argsForHeavy;
}
function cachingDecorator(heavySlowFunction) {
    const cache = new Map();
    return function(argsForHeavy) {
        if (cache.has(argsForHeavy)) {
            const cachedResult = cache.get(argsForHeavy);
            console.log(`From cache: ${cachedResult}`);
            return cachedResult;
        } else {
            const calculationResult = heavySlowFunction(argsForHeavy);
            cache.set(argsForHeavy, calculationResult);
            console.log(`Calculated: ${calculationResult}`);
            return calculationResult;
        }
    };
}
const decorated = cachingDecorator(heavySlowFunction);
decorated(1);               // Output: Calculated: 1
decorated(1);               // Output: From cache: 1

// const result = aFunction.call(context, ...args);
// Function.call() could be used to explicitly pass (to set or override) a context to a function.
// Simple example with a function without 'this' context (this=undefined).
function sayHi(greeting, suffix) {
    console.log(`${greeting}, ${this.name}${suffix}`);
}
const user = { name: 'User' };
const admin = { name: 'Admin' };
// sayHi('', '');                       // TypeError: Cannot read property 'name' of undefined          // function has no context
sayHi.call(user, 'Hi', '.');            // Output: Hi User.
sayHi.call(admin, 'Hello', '!');        // Output: Hello Admin!

// More complex example, object's method is decorated - this becomes undefined also.
const greeter = {
    greeting: 'Howdy',
    sayHi(firstName, lastName) {
        console.log(`${this.greeting}, ${firstName} ${lastName}!`);
    }
};
const woGreetingGreeter = greeter.sayHi;
// woGreetingGreeter(Andrey);                                                   // TypeError: Cannot read property 'greeting' of undefined
woGreetingGreeter.call({ greeting: 'Good evening' }, 'Andrey', 'Polnikov');     // Output: Good evening, Andrey Polnikov!
function greeterSayHiDecorator(greeterSayHi) {
    return function(firstName, lastName) {
        // return greeterSayHi(name);                                           // TypeError: Cannot read property 'greeting' of undefined
        return greeterSayHi.call(this, firstName, lastName);                    // Output: Howdy, Danila Polnikov!
    };
}
greeter.sayHi = greeterSayHiDecorator(greeter.sayHi);
greeter.sayHi('Danila', 'Polnikov');

// const result = aFunction.apply(context, args);
// Function.apply() differs from Function.call() only by arguments data structure type.
// Function.call() awaits a list of arguments. Spread operator with iterable object could possibly be used.
// Function.apply() supposes arguments to be a pseudo-array.
// It's sometimes convenient to pass the 'arguments' property of a function to the call() or apply() function. Function.apply() is the better choice,
// because there is no need to use a spread operator and apply() works a little bit faster on most js environments.
// When 'arguments' property of a function is used with apply() or call() methods - it's called 'call forwarding', because list of arguments stays the same.
function greeterSayHiForwardingDecorator(greeterSayHi) {
    return function () {
        return greeterSayHi.apply(this, arguments);             // Output: Howdy, Volha Polnikova!
        // return greeterSayHi.call(this, ...arguments);        // Alternative forwarding with call() and spread operator.
    };
}
greeter.sayHi = greeterSayHiForwardingDecorator(greeter.sayHi);
greeter.sayHi('Volha', 'Polnikova');
function greeterSayHiForwardingRestDecorator(greeterSayHi) {
    return function (...rest) {
        return greeterSayHi.apply(this, rest);                   // Output: Howdy, Dmitry Polnikov!     Alternative way to pass arguments by ...rest argument usage.
    };
}
greeter.sayHi = greeterSayHiForwardingRestDecorator(greeter.sayHi);
greeter.sayHi('Dmitry', 'Polnikov');

// 'Method borrowing' is a way to use an object's method to work with another object. For example, it could be used to join pseudo-arrays using Array.join() method.
function withArguments(a, b, c) {
    // console.log(arguments.join());           // TypeError: arguments.join is not a function          arguments property is a pseudo-array
    console.log([].join.call(arguments));       // Output: 1,2,3
}
withArguments(1, 2, 3);


/* Applying 'this' context to a function. */
// 'this' context of an object is lost, when object's method is used as a callback of a function (separately from the owning object).
const aUser = {
    name: 'Vasya',
    say(suffix) {
        console.log(`${suffix}, ${this.name}`);
    },
    sayHi() {
        console.log(`Hi, ${this.name}`);
    }
};
setTimeout(aUser.sayHi, 100);                       // Output: Hi, undefined
// Note: in a browser setTimeout() function callback's 'this' value is a window object, in NodeJs - 'this' is a timer object, in other environments 'this' is undefined.
// There are 2 methods to solve the problem of a lost context:

// 1. wrap a method call in an anonymous function (use a closure).
setTimeout(function() {
    aUser.sayHi();
}, 100);                                            // Output: Hi, Petya
setTimeout(() => aUser.sayHi(), 100);       // Output: Hi, Petya
// The disadvantage of this method is the fact that the context object 'aUser' could be changed before the function call by a timer.
// If context should be fixed - next method could be used.

// 2. bind a 'this' context with a function's bind() method.
// let boundFunction = aFunction.bind(context);             // boundFunction() call means call a aFunction() method with 'this' a particular context.
function logNameFunction(suffix) {
    console.log(`${suffix} ${this.name}`);
}
const logNameWithContextFunction = logNameFunction.bind(aUser);
logNameWithContextFunction('The name is');                 // Output: The name is Petya
const sayHiFunctionWoContext = aUser.sayHi;
const sayHiFunctionWithBoundContext = aUser.sayHi.bind(aUser);
const sayFunctionWithBoundContext = aUser.say.bind(aUser);
// sayHiFunctionWoContext();                                                    // TypeError: Cannot read property 'name' of undefined
setTimeout(sayHiFunctionWoContext, 100);                                // Output: Hi, undefined
sayHiFunctionWithBoundContext();                                                // Output: Hi, Petya
setTimeout(sayHiFunctionWithBoundContext, 100);                         // Output: Hi, Petya
sayFunctionWithBoundContext('Hello');                                          // Output: Hello, Petya

// There is a convenient method for a mass-binding of an object's methods - bindAll(). Could be used with an object, whose methods are often used as callbacks.
for (let key in aUser) {
    if (typeof aUser[key] === 'function') {
        aUser[key] = aUser[key].bind(aUser);
    }
}


// function's bind() method could also be used to bind arguments. This could be used for 'partial application' - binding a part of function's arguments to constant values.
// const aBoundFunction = aFunction.bind(context, [arg1], [arg2], ...);
function multiply(a, b) {
    return console.log(a * b);
}
const multiplyByTwo = multiply.bind(null, 2);
const multiplyByThree = multiply.bind(null, 3);
multiplyByTwo(1);                                       // Output: 2
multiplyByThree(1);                                     // Output: 3
multiplyByTwo(2);                                       // Output: 4
multiplyByThree(2);                                     // Output: 6
multiplyByTwo(3);                                       // Output: 6
multiplyByThree(3);                                     // Output: 9

// Note that a context object ('this') is required by bind() method and last example used null as a context value.
// If original 'this' context should be used by a bound function - it could be achieved with a the help of a helper function.
function partial(func, ...argBounds) {          // There is lodash's _.partial() same implementation.
    return function(...args) {
        return func.call(this, ...argBounds, ...args);
    };
}
const speaker = {
    name: 'Alphonso',
    say(time, phrase) {
        console.log(`[${time}] ${this.name}: ${phrase}`);
    }
};
speaker.sayNow = partial(speaker.say, new Date().getHours() + ':' + new Date().getMinutes());           // The speaker object becomes 'this' context.
speaker.sayNow('Hello');                               // Output: [22:12] Alphonso: Hello

// bind() methods creates an `exotic object` with a bound context and arguments, which couldn't be changed. bind() call on such object has no effect.
function tryToBindTwice(suffix) {
    console.log(`${this.prefix} and ${suffix}`);
}
const boundTwice = tryToBindTwice.bind({ prefix: 'Shadows' }, 'dust').bind({ prefix: 'Peace' }, 'glory');
boundTwice();               // Output: Shadows and dust

// bind() method creates an another `exotic object`, which doesn't have original function's properties.
function withAProperty() {
    console.log(this.value);
}
withAProperty.aProperty = 'will be lost';
const withoutAProperty = withAProperty.bind({ value: 'aValue' });
withoutAProperty();                             // Output: aValue
console.log(withoutAProperty.aProperty);        // Output: undefined












