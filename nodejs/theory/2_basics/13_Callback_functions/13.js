'use strict';       // jshint ignore: line

function withCallbackFunction(callback) {
    console.log('With callback executed.');
    callback();
}

function functionDeclaration() {
    console.log('Function declaration callback executed.');
}

const functionExpression = function() {
    console.log('Function expression callback executed.');
};

withCallbackFunction(functionDeclaration);                      // Function declaration callback.
withCallbackFunction(functionExpression);                       // Function expression callback.
withCallbackFunction(function() {                       // Anonymous function callback.
    console.log('Anonymous function callback executed');
});
withCallbackFunction(() => {                            // Arrow function callback.
    console.log('Arrow function callback executed.');
});