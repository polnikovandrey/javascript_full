'use strict';           // jshint ignore: line

// There are some restrictions for an import statement:
//      1. a module path must be a string, it couldn't be a dynamic value (a method, for example)
//              import ... from getModuleName();            // Not valid expression.
//      2. import statement couldn't be used inside a code block, including the 'if' block.
//              if (true) { import ... from ...; }          // Not valid expression.
//              { import ... from ...; }                    // Not valid expression.

// To import something dynamically an 'const promise = import(module);' construction could be used. A 'promise' contains an object of a module, containing every module's export.
// 'await' could also be used in conjunction witn an 'import(module);' statement inside an async function.
const firstModulePromise = import('./say.js')                                       // jshint ignore: line
    .then(moduleObj =>  moduleObj.say1())                   // Output: Hi
    .catch(error => console.log(error));
const secondModulePromise = firstModulePromise
    .then(async () => {
        const { say1, say2 } = await import('./say.js');                            // jshint ignore: line
        say1();                                         // Output: Hi
        say2();                                         // Output: Bye
    });
secondModulePromise
    .then(async () => {
        const moduleObject = await import('./withUnnamedDefaultObject.js');                                     // jshint ignore: line
        const unnamedDefaultModuleMethod = moduleObject.default;
        unnamedDefaultModuleMethod();                   // Output: Unnamed default function.
        // The same as below:
        const { default: unnamedDefaultModuleMethod1 } = await import('./withUnnamedDefaultObject.js');         // jshint ignore: line
        unnamedDefaultModuleMethod1();                  // Output: Unnamed default function.
    });

// Dynamic import(module) could be used inside common non-module scripts (not only inside <script type="module"></script>).
// import(module) looks like a function call, but it's not. It's a special syntax like 'super()'. By that reason - import(module) couldn't be assigned to a variable or
// call it by .call/.apply methods.