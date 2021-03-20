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


// Union is not a distinct data type, but a combination of data types. It makes possible to declare a variable which could hold a value of 2 or more types.
let aNumberStringUnion: number | string;
aNumberStringUnion = 1;
aNumberStringUnion = '';

// The "Any" type or union type variable real type could be defined with the help of typeOf operator.
console.log(typeof aNumberStringUnion);             // Output: string
console.log(typeof anAny);                          // Output: string

// TypeScript allows to define a type pseudonym.
type stringOrNumberType = number | string;
let aStringOrNumber: stringOrNumberType = 1;
aStringOrNumber = '';

// Type assertion is a mechanism to cast an undetermined type to some particular type. There are two methods - with angle brackets and with 'as' operator;
const anyType: any = '';
console.log((<string>anyType).length);
console.log((anyType as string).length);


// TypeScript function declaration differs from javascript, it allows to declare a type of arguments and a type of a return value.
// function add(a, b) { return a + b; }                                             // Javascript function
function addWithTypes(a: number, b: number): number { return a + b; }               // TypeScript function 1
const addWithTypes1 = function(a: number, b: number): number { return a + b; }      // TypeScript function 2
// Note the 'void' return type - function returns nothing. The 'void' is the default return type if there is no return type declaration.
function aVoidFunction(): void {}


// A function call in TypeScript must use the strict number of parameters by default (all arguments are required).
// But there is a possibility to make arguments optional with the help of the "?" sign. Optional arguments must follow (be declared after) the required arguments.
function fio(name: string, lastName: string, surname?: string): string {
    if (surname) {
        return `${name} ${lastName} ${surname}`;
    } else {                                        // surname type is 'undefined'.
        return `${name} ${lastName}`;
    }
}

// A function declaration could contain arguments default values.
function withDefaultValue(value: Number = 1): void { }
function getNumber(): number { return 2; }
function withDefaultValue1(value: Number = getNumber()): void { }

// A function could be overridden in TypeScript.
function addFunction(a: number, b: number): number;                 // No declaration.
function addFunction(a: String, b: String): string;                 // No declaration.
function addFunction(a: any, b: any): any { return a + b; }         // 'Common' function must follow overriding functions.
addFunction(1, 2);
addFunction('a', 'b');


// Each function has a type - a combination of parameter types and return type (like signature in java). A variable could be assigned a function type and could
// be used to hold any function with the compliant type.
function sum(x: number, y: number): number {
    return x + y;
}
function subtract(x: number, y: number): number {
    return x - y;
}
let functionType: (x: number, y: number) => number;         // Function type declaration.
functionType = sum;
console.log(functionType(2, 1));                    // Output: 3
functionType = subtract;
console.log(functionType(2, 1));                    // Output: 1

// Function type could be used as a variable declaration, as like as a function argument (callback function).
function mathOperation(x: number, y: number, operation: (x: number, y: number) => number) {
    return operation(x, y);
}
console.log(mathOperation(2, 1, sum));              // Output: 3
console.log(mathOperation(2, 1, subtract));         // Output: 1


// Arrow functions.
let arrowSum = (x: number, y: number) => x + y;
console.log(arrowSum(2, 1));                                   // Output: 3
// let arrowSumWoTypes = (x, y) => x + y;                           // Argument types could be omitted.       // ?Compile error?
// console.log(arrowSumWoTypes(2, 1));                              // Output: 3
// let arrowSingleArgument = x => x * x;                            // Round brackets could be omitted if there is a single arrow function argument w/o a type. // ?Compile error?
let arrowWoArguments = () => console.log("No arguments");           // Empty round brackets should be used if an arrow function have no arguments.

// Arrow function could be used as a parameter of a function which have a callback argument.
console.log(mathOperation(2, 1, (x: number, y: number) => x + y));      // Output: 3