'use strict';           // jshint ignore: line

// then() method returns a promise of a value, calculated and returned inside then(). So then() methods could be chained.
const promise = new Promise(resolve => resolve(1))          // Output: 1 /n 2 /n 3 /n 4
    .then(value => {
        console.log(value);
        return value + 1;
    })
    .then(value => {
        console.log(value);
        return value + 1;
    })
    .then(value => {
        console.log(value);
        return new Promise(resolve => {     // then() onFulfilled callback could return a Promise - following consumers will wait for that Promise to resolve.
            resolve(value + 1);
        });
    })
    .then(value => {
        console.log(value);
        return value;
    });

// Actually then() could return any 'thenable' object. That means any object, containing a then() method. Thenable will be handled so as a regular Promise.
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve) {
        resolve(this.num + 1);
    }
}
promise
    .then(value => {
        return new Thenable(value);
    })
    .then(value => console.log(value));         // Output: 5


// fetch() method is available by default in major browsers. It returns a Promise of a response object.
// To get a text contents or a json contents - one must call a text() or json() method on a response object - it returns a Promise of the textual data.
const nodeFetch = require('node-fetch');
const fetchPromise = promise.then(() => nodeFetch('https://reqres.in/api/users/2'));     // Using nodeFetch as an analogue of a standard fetch() method in a browser.
const jsonPromise = fetchPromise.then(response => {
    return response.json();
});
jsonPromise.then(json => console.log(json));        // Output: { data: ... }