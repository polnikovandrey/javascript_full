/* The TypeScript has those data types:
    * Boolean
    * Number
    * String
    * Array
    * Tuple
    * Enum
    * Any                               // arbitrary type
    * Null and undefined
    * Void                              // no-type, commonly used as a function's return value
    * Never                             // commonly used as a function's return value, which shouldn't be returned at all (function throws an error)
*/
const aBoolean: boolean = true;

const anArray: boolean[] = [ true, true, true ];
const anotherArray: Array<Boolean> = [ false, false, false ];

const aTuple: [string, number] = [ 'Tom', 28 ];     // A tuple(cortage) is a set(array) of variables of predefined types.
console.log(aTuple[1]);                 // Output: 28

enum Season { Winter, Spring, Summer, Autumn};
const anEnum: Season = Season.Summer;
enum Color { Gray = 2, Green = 5 };                 // Overriding ordinals
console.log(anEnum);                                // Output: 2
console.log(Season[2]);                             // Output: Summer

const anAny: any = 'something'          // The type is "Any"
let anAny1;                             // The type is "Any"
anAny1 = 1;
anAny1 = '';                            // Any type of value could be assigned to the Any type variable.
const anyArray: any[] = [ 1, '' ];      // An array of Any type could hold values of any type.

let person = { name: 'Tom', age: 29 };  // The complex objects are created as like as in javascript. But:
// person = { name: 'Alice' };          // Compile error: property 'age' is missing.