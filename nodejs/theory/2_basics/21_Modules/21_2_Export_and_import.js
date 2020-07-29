'use strict';           // jshint ignore: line

// Both a property, a function and a class are valid to be exported/imported.
export const NUMBERS = [ 1, 2, 3 ];
export let letters = [ 'a', 'b', 'c' ];
export function sayHi() {
    console.log('Hi!');
}
export class someClass { }

// Export could be performed deferred, after the declaration itself. Multi-export statement could be used.
const ZXC = [ 'z', 'x', 'c' ];
let asd = [ 'a', 's', 'd' ];
export { ZXC, asd };
// Export statement of a function could be located above the function being exported.
export { sayBye };
function sayBye() {
    console.log('Bye!');
}

// A multi-import statement could be used.
import { say1, say2 } from "./say.js";
say1();             // Output: Hi
say2();             // Output: Bye

// If there is a need to import a huge number of objects - an [import * as <obj> from 'xxx.js'] construction could be used.
import * as say from './say.js';
say.say1();         // Output: Hi
say.say2();         // Output: Bye

// 'as' construction could also be used to import an object with a custom name.
import { say1 as say11, say2 as say12 } from './say.js';

// 'as' construction could be used to export an object with a custom name. That object could be imported using that custom name only (but could be overridden by 'as').
export { sayHi as sayHello };


// In practice there are two types of modules:
// 1. A module with a number of exported objects.
// 2. A module with a single exported object.
// The second one is more convenient, but it's highly recommended to have meaningful file names and to be structured by folders for such modules.
// A single-export-object module could use an 'export default' construction. Only a single default export per module is allowed.
// Technically there could be a mix of a default export and named exports, but that is a bad and meaningless practice.

// user.js
// export default class User { }

// That default User class-object could be imported without curly braces.
// main.js
// import User from './user.js';                        // Not '{ User }, but just a 'User'. User is a custom name for a default exported object.

// As soon as there could be only one default export per module - exported object could be unnamed. There are valid use-cases of a default export below:
// export default class { }
// export default function(user) { }
// export default [ 'Jan', 'Feb', 'Mar' ];

// A 'default' keyword could be used for a deferred export:
function toBeExported() { }
// export { toBeExported as default };          // The same as [ export default function toBeExported() { } ]

// A 'default' keyword could be used to import a default object from a module with a mix of default and named objects.
// import { default as User, someExportedObj } from './user.js';

// A 'default' keyword could be used to access a default exported object of a module, which is fully imported.
// import * as user from './user.js';
// const User = user.default;
// new User('John');

// There is a meaning that using a default export is a bad practice. The main argue is an arbitrary naming of exported object - that could lead to
// a different naming of the same imported objects. Unlikely, named object are imported with a meaningful and defined names - that is a significant
// advantage, especially for a large project.


// A reexport could be used to structure a project api. It's convenient sometimes to 'hide' inner modules and to open public objects with a distinct module.
export { sayHi as reExportedSayHi } from './sayHi.js';                                      // Reexport
/* The same as:
import {sayHi as reExportedSayHi } from './sayHi.js';
export { reexportedSayHi };
 */
export { default as unnamedDefaultFunction } from './withUnnamedDefaultObject.js';          // Reexport of an unnamed default-exported object.

// A named default-object couldn't be exported by a default name, an 'export {default as xxx}' construction should be used.
// export namedDefaultFunction from './withNamedDefaultObject.js';                          // SyntaxError: Unexpected token 'export'
// export { namedDefaultFunction } from './withNamedDefaultObject.js';                      // SyntaxError: ...module does not provide an export named 'namedDefaultFunction'
export { default as namedDefaultFunction } from './withNamedDefaultObject.js';              // A valid reexport of a named default-exported object.

// 'export * from xxx' construction reexports only named exports, excluding default exports. To reexport both named and default exports - two export statements should be used:
export * from './mixedNamedAndDefaultObjectsModule.js';
export { default } from './mixedNamedAndDefaultObjectsModule.js';