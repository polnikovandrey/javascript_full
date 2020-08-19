'use strict';       // jshint ignore: line

// eval() executes a string of code and returns the result of the last instruction execution.
const code1 = 'let i = 0; ++i;';
let result = eval(code1);
console.log(result);            // Output: 1

// eval() is being executed inside an existing lexical environment. So it has access to the outer variables.
const code2 = 'result += 1; console.log(result);';
eval(code2);                    // Output: 2

// In the strict mode variables defined inside eval()'s code are not accessible to the other code. In the non-strict mode - accessible.
const code3 = 'const innerVar = 1;';
eval(code3);
// console.log(innerVar);       // ReferenceError: innerVar is not defined          Not accessible also in the non-strict mode in NodeJs.

// eval() is used rarely. There is a known statement: "eval is evil".
// Not only because it's the stale method, but it also breaks compiler's optimization (to support minification) if there are outer variables inside eval()'s code.
// Nowadays there is no single reason to use eval() - there are modern methods to solve problems, targeted by eval().
// The usage of outer local variables inside eval() is a bad practice for sure.

// There are 2 recommendations to 'hide' local variables from the eval()'s code:
// * if eval() doesn't use outer variables - in browser code it should be used as 'window.eval(...);', so it will be executed inside a global scope.
// window.eval('console.log("window.eval();");');       // It's possible only in a browser environment.
// * if eval() uses outer variables - eval() should be replaced with a 'new Function(...);' call, supplied with according variables as parameters:
new Function('arg1', 'console.log(arg1);')(5);          // Output: 5
// new Function(...) creates a function also inside the global scope - local variables are not accessible directly, could be passed and accessed only as arguments.


