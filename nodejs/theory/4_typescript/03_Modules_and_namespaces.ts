// Namespaces could be used to group classes, interfaces, objects, functions and other namespaces.

import {ModuleB, ModuleBImpl} from "./03_ModuleB";

namespace Data {
    export namespace Personnel {                                    // Exporting (exposing) the inner namespace.
        export interface SomeInterface { }                          // Exporting an interface.
        export class SomeClass { }                                  // Exporting a class.
        export function someFunction() { }                          // Exporting a function.
        export const someObject: SomeClass = new SomeClass();       // Exporting an object.
    }
}
class SomeImplementation implements Data.Personnel.SomeInterface { }
const someClassObject: Data.Personnel.SomeClass = new Data.Personnel.SomeClass();
Data.Personnel.someFunction();
const someObject = Data.Personnel.someObject;

import personnelData = Data.Personnel;          // Namespace alias.
personnelData.someFunction();


/// <reference path="./03_Namespace.ts"/>             // Legacy directive to use another .ts file. Compiler should be supported the -out parameter with both files.
// Service.perform();                               // Doesn't work without a compiler parameter. Modules should be used to import something from another file.



// TypeScript supports modules. Module is the ES2015 concept, which is not currently supported by browsers.
// Modules resemble namespaces, they could be used to group interfaces, classes, functions, objects. Modules are located in distinct files and are imported
// not by a <script> tag, but using a module loader.
// There are 5 types of modules, which could be used:
// * AMD (Asynchronous Module Definition)
// * CommonJS
// * UMD (Universal Module Definition)
// * System
// * ES2015
// To compile a module the type must be supplied as a parameter of the compile command (--module ...).
// To load a module one of module loaders could be used:
// * RequireJS (which uses AMD syntax)
// * Browserify (uses CommonJS syntax)
// * SystemJS (universal loader to load modules of any type)

import { ModuleA, ModuleAImpl, printName as doPrintName } from "./03_ModuleA";
const importedA: ModuleA = new ModuleAImpl('ModuleA');
doPrintName(importedA);                                                     // Output: ModuleA

import * as modB from "./03_ModuleB";
const importedB: modB.ModuleB = new modB.ModuleBImpl('ModuleB');
modB.printName(importedB);                                                  // Output: ModuleB

import ModuleC from "./03_ModuleC";
console.log(new ModuleC().name);                                            // Output: ModuleC