'use strict';       // jshint ignore: line

// Promise class has 5 static methods: all(), allSettled(), race(), resolve(), reject().

// Promise.all() accepts an array or any iterable of Promises or values of any type, and returns a single Promise.
// The resulting Promise is fulfilled with an array of results (non-Promise values are returned as-is) if every Promise passed in all() is fulfilled.
// The order of the resulting array is the same, as the order of Promise.all() arguments - regardless the speed of any of those promises execution.
// The resulting Promise is rejected immediately with an exception of the first rejected Promise. Other Promises continue execution, but their results are ignored.
const promise1 = Promise.all([
    new Promise(resolve => resolve(1)),
    new Promise(resolve => resolve(2)),
    3                                                       // This value will be returned as-is in the following .then() method.
]).then(values => console.log(values));
const promise2 = promise1
    .then(() => Promise.all([
        new Promise(resolve => resolve(console.log(4))),                            // Output: 4
        new Promise(((resolve, reject) => reject(new Error('Error in a promise!')))),
        new Promise(resolve => resolve(console.log(5)))                             // Output: 5        Promise resolves regardless the previous Promise was rejected.
    ]))
    .then(value => console.log('Resolved!') , reason => console.log(`Rejected: ${reason.message}`));    // Output: Rejected: Error in a promise!    Promise.all() was rejected.
// It's convenient sometimes to use Promise.all() with an Array's object .map() method.
const promise3 = promise2
    .then(value => Promise.all([6, 7, 8].map(value => new Promise(resolve => resolve(value)))))     // Mapping is not necessary, values could be passed to .all().
    .then(values => console.log(values));       // Output: [ 6, 7, 8 ]


// Promise.allSettled() - a new method, old browsers need a polyfill.
if (!Promise.allSettled) {      // As soon as NodeJs doesn't support .allSettled() - applying a polyfill.
    Promise.allSettled = function(promises) {
        return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
            status: 'fulfilled',
            value: value
        }), error => ({
            status: 'rejected',
            reason: error
        }))));
    };
}
// Promise.allSettled() accepts an array or iterable of Promises or values of any type, waits all of them to become fulfilled or rejected and returns an array of objects
// of 2 types ({status: "fulfilled", value: result} and {status: "rejected", reason: error}) for every Promise and value ordered like the source Promises/values array.
const promise4 = promise3
    .then(Promise.allSettled([
            new Promise(resolve => resolve(9)),
            new Promise(((resolve, reject) => reject(new Error('Error in a promise!')))),
            new Promise(resolve => resolve(10))
        ]).then(values => console.log(values))                      // Output: [{ status: 'fulfilled', value: 9 }, { status: 'rejected', ... }, { status: 'fulfilled', value: 10 }]
    );


// Promise.race() accepts an array or iterable of Promises or values of any type, waits for any promise to fulfill or reject and return the result of that quickest promise.
const promise5 = promise4
    .then(Promise.race([
            new Promise(resolve => setTimeout(() => resolve(11), 300)),
            new Promise(resolve => setTimeout(() => resolve(12), 200)),
            new Promise(resolve => setTimeout(() => resolve(13), 400))
        ]).then(value => console.log(value))        // Output: 12
    );
const promise6 = promise5
    .then(Promise.race([
            new Promise(resolve => setTimeout(() => resolve(11), 300)),
            new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error in promise!')), 200)),
            new Promise(resolve => setTimeout(() => resolve(13), 400))
        ])
            .then(value => console.log(value), reason => console.log(reason))           // Output: Error: Error in promise! ... (stack trace)
    );

// Promise.resolve() and Promise.reject() are used to create already fulfilled/rejected Promise.
const promise7 = new Promise(resolve => resolve(1));
const promise8 = Promise.resolve(1);                                            // Same as previous line.
const promise9 = new Promise((resolve, reject) => reject(new Error()));
const promise10 = Promise.reject(new Error());                                        // Same as previous line.



