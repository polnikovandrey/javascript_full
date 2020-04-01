'use strict'; // jshint ignore:line

// Single line comment

/*
    Multi line comment
 */




                /* ----- Variable types and their scope. ----- */

        /* ----- Using variables before declaration. ----- */
// Variable of var type is visible everywhere in a script and exists even before script execution.
console.log(a9$_);      // Output: undefined. Variable exists, but is undefined at the time of execution of this line.
// Variable of let type is not visible before declaration.
// console.log(some);   // Output: ReferenceError: Cannot access 'some' before initialization
// ----- Declaration of variables. -----
// var variable declaration. Valid symbols are letters, numbers, $ and _ . Number is not valid as a first symbol.
var a9$_ = 1;
// let variable declaration.
let some = 3;   // jshint ignore:line
// ----- Using variables after declaration. -----
console.log(a9$_);      // Output: 1. Variable exists and is defined at the time of execution of this line.
console.log(some);      // Output: 3. Variable exists and is defined at the time of execution of this line.


        /* ----- Using variables outside of declaration block. ----- */
// var is accessible outside block, let is accessible only inside block.
{
    var b1 = 1;
    let b2 = 2;
}
console.log(b1);        // Output: 1.
// console.log(b2);     // Output: Uncaught ReferenceError: b2 is not defined


        /* ----- Using constants. -----*/
// const couldn't be changed, nor used outside declaration block.
{
    const pi = 3.14;
// pi = 42;     // Output: Uncaught TypeError: Assignment to constant variable.
}
// console.log(pi);     // Output: Uncaught ReferenceError: pi is not defined