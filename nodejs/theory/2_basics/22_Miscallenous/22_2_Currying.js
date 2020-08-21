'use strict';       // jshint ignore: line

// Currying is a special technic to transform a function f(a, b, c) to a form f(a)(b)(c). Currying doesn't execute a function, but only transforms it.
function curry(f) {
    return function(a) {
        return function(b) {
            return f(a, b);
        };
    };
}
function sum(a, b) {
    return a + b;
}
const curriedSum = curry(sum);
console.log(curriedSum(1)(2));          // Output: 3

// There are some advanced curry implementations, lodash also has one. Lodash's implementation allows to use both original and curry-syntax forms.

// Deleting the '"type": "module"' line in the package.json is required to use the require() method.
const _ = require('lodash');
const lodashCurriedSum = _.curry(sum);
console.log(lodashCurriedSum(1)(2));        // Output: 3
console.log(lodashCurriedSum(1, 2));        // Output: 3