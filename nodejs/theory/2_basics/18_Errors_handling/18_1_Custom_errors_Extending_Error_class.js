'use strict';           // jshint ignore: line

// Examples of custom errors: HttpError, DbError, NotFoundError, ... Those errors should extend the Error class of any of it's inheritors because it's convenient sometimes
// to identify any error by 'obj instanceof Error' check.

// 'json' should be of a json-string type like { "name": "John", "age": 18 }.
// Built-in SyntaxError is thrown if there is a syntax error in json-string input.
function readUser(json) {
    const user = JSON.parse(json);
    if (!user.name) {
        throw new NameRequiredError('name');
    } else if (!user.age) {
        throw new ValidationError('There is no "age" property');
    } else {

    }
    return user;
}
/*
 A custom error should be implemented to handle correct syntax, but not valid data input. The Error class should be extended, here is a pseudo-code of that class:
        class Error {
            constructor(message) {
                this.message = message;
                this.name = "Error";                // Every built-in error has a distinct name property.
                this.stack = <stack data>;          // Not a standard property, but usually it's supported by a javascript engine.
            }
         }
 */
class ValidationError extends Error {
    constructor(message) {
        super(message);                         // super() call is essential for extending class. It's used to pass and set a custom 'message' property value.
        this.name = this.constructor.name;      // By using a constructor name the need to manually set the name property value in inheriting classes is avoided.
        // 'stack' property will be available to every Error class's inheritor.
    }
}
class NameRequiredError extends ValidationError {
    constructor(property) {
        super(`There is no ${property} property`);
        this.property = property;
    }
}
function useReadUser(json) {
    try {
        console.log(readUser(json));
    } catch(err) {
        // Sometimes an 'err.name === "Error"' check is used to recognized an error. One should avoid using this method because 'instanceof' check will continue to work even
        // if there will appear an inheritor of ValidationError, i.e. WrongPropertyValueError. Name check should be used only if a checked error is produced in external
        // library code and class is not available.
        if (err instanceof NameRequiredError) {
            const property = err.property;              // Custom 'property' property is available.
            console.log(`${err.name} ${err.message}`);
        } else if (err instanceof ValidationError) {
            console.log(`${err.name} ${err.message}`);
        } else if (err instanceof SyntaxError) {
            console.log(`${err.name} ${err.message}`);
        } else {
            throw err;
        }
    }
}
useReadUser('{bad json}');                          // Output:  SyntaxError Unexpected token # in JSON at position 0
useReadUser('{ "age": 18 }');                       // Output:  NameRequiredError There is no property: name
useReadUser('{ "name": "John" }');                  // Output:  ValidationError There is no "age" property
useReadUser('{ "name": "John", "age": 18 }');       // Output:  { name: 'John', age: 18 }


// Wrapping exceptions is a common practice in OOP. It's used to generalize low-level errors to some high-level error type to be handled somewhere in the outer code.
class ReadError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = this.constructor.name;
        this.cause = cause;
    }
}
function anotherUseReadUser(json) {
    try {
        console.log(readUser(json));
    } catch(err) {
        if (err instanceof SyntaxError) {
            throw new ReadError('Syntax error', err);
        } else if (err instanceof ValidationError) {
            throw new ReadError('Validation error', err);
        } else {
            throw err;
        }
    }
}
try {
    anotherUseReadUser('{bad json}');                       // Output: ReadError Cause: SyntaxError: Unexpected token b in JSON at position 1
} catch (err) {
    if (err instanceof ReadError) {
        console.log(`${err.name} Cause: ${err.cause}`);
    } else {
        throw err;
    }
}
