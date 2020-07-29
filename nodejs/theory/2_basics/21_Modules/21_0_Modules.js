'use strict';           // jshint ignore: line

// There is a built-in modules support in javascript since 2015 (ES6).
// Module is a file (one script - one module).
// Modules use 'export' and 'import' directives to exchange functionalities (to call one module's functions in another module).
// 'export' directive marks properties and functions, which are usable outside the module.
// 'import' directive imports functionality of another module in the current module.

import {sayHi} from './sayHi.js';           // See sayHi.js
console.log(sayHi);                         // Output: [Function: sayHi]
sayHi('Ivan');                         // Output: Hi, Ivan!

// To use 'import' directive inside a browser script - the type of the script should be a 'module':
// <script type="module">
//      ...
//      import {scriptName} from 'path/fileName.js';
//      ...
// </script>
// Browser loads and imports the module before the script execution, as like as modules, imported by that module.
// A module could also be imported as:
// <script type="module" src='path/fileName.js'></script>

// Each module has it's own properties and functions scope. A property/function should be exported and imported explicitly to be usable in another script.
// The same is actual for each '<script type="module"></script>' declaration. A common non-module script could declare global variables, a module-script
// could define and access a global variable using a 'window.variableName' construction only (definitely bad practice, the reason for that should be significant).
import {user1} from './user.js';
console.log(user1.name);                // Output: Ivan
// import {user2} from './user.js';     // SyntaxError: The requested module './user.js' does not provide an export named 'user2'
// console.log(user2.name);             // ReferenceError: user2 is not defined             user2 is defined, but wasn't exported by user.js module


// A module's script is being executed only once when imported. In case of multiple imports of the very same module - that module's script is being executed only
// once, then imported into all importers.
import './multipleUsagesModule.js';     // Output: multipleUsagesModule.js is being executed
import './multipleUsagesModule.js';     // No output, module was executed already.
// So an import's task is a module initialization only. A module's part (a property or a function) should be exported/imported to be executed multiple times.


// As soon as module's script is being executed only once - an exported property is the same for each importer. Changes to that property are visible to all
// the importers.
import {theSameObjectForAllImporters} from "./exporter.js";
import {logTheSameObjectForAllImportersValue} from "./exporter.js";
logTheSameObjectForAllImportersValue();         // Output: 1
theSameObjectForAllImporters.value = 2;
logTheSameObjectForAllImportersValue();         // Output: 2
// That fact could also be used to initialize a module's exported part outside by some importer.
import {toBeInitializedOnImport} from "./exporter.js";
import {logInitializedOnImportValue} from "./exporter.js";
logInitializedOnImportValue();                  // Output: undefined
toBeInitializedOnImport.value = 3;
logInitializedOnImportValue();                  // Output: 3

// Read and run [21_1_Modules.html].