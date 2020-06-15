'use strict';           // jshint ignore: line

try {
    // code
} catch(err) {
    // error handling
} finally {
    // code to execute regardless errors.
}

// To catch errors inside timeout code - try..catch should be located inside timeout function.

// Every built-in error has properties: 'name', 'message' and 'stack'.
// Error.toString() works as a "name: message" combination.
try {
    lalala;
} catch(err) {
    console.log(`Err: ${err}`);                     // Output: Err: ReferenceError: lalala is not defined
    console.log(`Name: ${err.name}`);               // Output: Name: ReferenceError
    console.log(`Message: ${err.message}`);         // Output: Message: lalala is not defined
    console.log(`Stack: ${err.stack}`);
    /* Output: Stack: ReferenceError: lalala is not defined
           at Object.<anonymous> (/home/andr00ha/IdeaProjects/javascript_full/nodejs/theory/2_basics/18_Errors_handling/18_0_Handling_errors_try_catch.js:13:5)
           at Module._compile (module.js:652:30)
           ...
     */
}

// New browsers support catch without an argument. Polyfill is needed for older browsers. Not supported in NodeJs.
/*
try {
    // code
} catch {
    // error handling
}
*/

// 'throw' keyword could be used to produce and handle user-defined exceptions.
// 'throw' allows to use any data type (primitive, number, string, object, ...). But usually an object with 'name' and 'message' properties is used.
// There is a number of built-in constructors for errors: Error, SyntaxError, ReferenceError, TypeError an others. For such errors 'name' is a constructor name,
// 'message' is a constructor argument.
const handleUserJsonInput = function(userJsonInput) {
    try {
        const user = JSON.parse(userJsonInput);             // throws a SyntaxError if json input is not valid
        if (!user.name) {
            throw new Error("Malformed user object");
        }
    } catch(err) {
        console.log(`${err.name} : ${err.message}`);
    }
};
// handleUserJsonInput('wrong input type');         // Output: SyntaxError : Unexpected token w in JSON at position 0
handleUserJsonInput('{ "age": 18 }');   // Output: Error : Malformed user object

// For security reasons a 'catch' block should handle only known errors, others should be rethrown and may be handled somewhere above in the stack.
try {
    // code
} catch(err) {
    if (err.name === 'SyntaxError') {
        // handle error
    } else {
        throw err;
    }
}

// Code in a 'finally' block will be executed regardless any errors in a 'try/catch' blocks.
try {
    lalala;
} catch(err) {
    console.log(err.name);
} finally {
    console.log('Finally');
}
/* Output:
ReferenceError
Finally
 */
(function() {
    try {
        // All clear, no errors.
        if (false) {
            throw new Error('Some error');  // A 'finally' block will be executed even after 'throw'.
        }
        return 1;                           // A 'finally' block will be executed even after 'return'.
    } catch(err) {
        console.log(err.name);
    } finally {
        console.log('Finally');
    }
})();
/* Output:
Finally
 */

// Variables defined in a try/catch/finally blocks are local. To reuse a variable in those blocks - it should be before the try/catch/finally block.

// A 'catch' block could be skipped if a 'finally' block is present (in case when the errors must be handled somewhere above in the stack).
try {
    sergserg;
} finally {
    console.log(`Finally`);             // Output: Finally
}

// Global catch is a method to catch uncaught exceptions. It's not a part of javascript specification, but is provided by javascript engines:
// 'window.onerror' - in browsers, 'process.on("uncaughtException")' - in NodeJs.
// Global catch is mainly used for logging purposes.
/* 'window.onerror' syntax:
window.onerror = function(message, url, line, col, error) {
    // message - string error message
    // url - script URL, in which the exception occurred
    // line, col - line and column numbers, where the exception occurred
    // error - an error object
};  */


