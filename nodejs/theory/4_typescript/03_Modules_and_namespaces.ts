// Namespaces could be used to group classes, interfaces, objects, functions and other namespaces.

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


/// <reference path="./03_Service.ts"/>             // Legacy directive to use another .ts file. Compiler should be supported the -out parameter with both files.
// Service.perform();                               // Doesn't work without a compiler parameter. Modules should be used to import something from another file.