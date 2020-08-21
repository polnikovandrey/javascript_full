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

// Currying is used to implement 'partially applied functions' (functions with default parameters).     // Частично примененная функция.
function log(date, importance, message) {
    console.log(`${date} ${importance}: ${message}`);
}
const curriedLog = _.curry(log);
curriedLog(new Date(), 'DEBUG', 'A message');           // Output: Fri Aug 21 2020 21:15:59 GMT+0300 (GMT+03:00) DEBUG: A message           Works as a common function.
curriedLog(new Date())('DEBUG')('A message');           // Output: Fri Aug 21 2020 21:15:59 GMT+0300 (GMT+03:00) DEBUG: A message           Works as a curried function.
const logNow = curriedLog(new Date());                  // 'logNow' always logs with the given date value.
logNow('DEBUG')('A message');                           // Output: Fri Aug 21 2020 21:15:59 GMT+0300 (GMT+03:00) DEBUG: A message
const debugNow = logNow('DEBUG');                       // 'debugNow' always logs with the given date value and 'DEBUG' importance.
debugNow('A message');                                  // Output: Fri Aug 21 2020 21:15:59 GMT+0300 (GMT+03:00) DEBUG: A message

// lodash's advanced curry implementation could be replaced with a custom one.
function advancedCurry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}
function sumValues(a, b, c) {
    console.log(a + b + c);
}
const curriedSumValues = advancedCurry(sumValues);
curriedSumValues(1, 2, 3);                      // Output: 6
curriedSumValues(1)(2, 3);                      // Output: 6
curriedSumValues(1)(2)(3);                      // Output: 6

// Only functions with a fixed number of arguments could be curried. Function with 'rest parameters' operator couldn't be curried.