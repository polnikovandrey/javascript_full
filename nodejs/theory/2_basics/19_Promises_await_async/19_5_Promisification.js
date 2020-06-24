'use strict';           // jshint ignore: line

// Promisification is a process of transforming a function with a callback-function parameter to a function, returning a Promise.
// It could be performed manually, but there is a method to automate this process.
function withCallback(param1, param2, callback) {
    if (true) {
        callback(null, 'result1', 'result2');
    } else {
        callback(new Error('Something went wrong'));
    }
}
// promisify(f) method accepts a function with a callback-function parameter and returns a promisified wrapper-function.
function promisify(f) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            }
            args.push(callback);
            f.call(this, ...args);
        });
    };
}
promisify(withCallback)('arg1', 'arg2')
    .then(value => console.log(value), reason => console.log(reason));      // Output: [ 'result1', 'result2' ]

// There is a number of libraries (es6-promisify or util.promisify for NodeJs) for a more agile process and handling more complex cases of promisification.
// To keep in mind - promises are limited to having only a single result, but callbacks could be called numerous times.
// So a callback could be correctly promisified only in case a callback is called once - other calls will not be handled after promisification.