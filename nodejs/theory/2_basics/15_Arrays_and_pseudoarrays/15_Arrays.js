'use strict';           // jshint ignore: line

// Both objects and arrays are collections. Array is an ordered collection, that is a major difference from an object.

const constructedArray = new Array();           // Valid, but rarely used array declaration.
console.log(new Array('one', 'two'));     // Output: [ 'one', 'two' ]
console.log(new Array(2));           // Output: [ <2 empty items> ]     Note: if used with a number n parameter - array contains n undefined elements.
const emptyArray = [];                          // Commonly used array declaration.
// Array could store all data types: primitives, objects, functions/
emptyArray[0] = function() {
    console.log('Function inside array');
};
emptyArray[1] = {
    name: 'Object inside array'
};

// Array supports basic queue operations - push and shift, so as stack operations - push and pop.
// Data structure, which supports both queue and stack operations is called 'double queue'. Array is a 'double queue'.
// As of method effectiveness - push/pop are fast, shift/unshift are slow (both shift and unshift have to renumber each element's index).
const arr = [1, 2, 3, 4, 5];
console.log(arr);                   // Output: [ 1, 2, 3, 4, 5 ]
console.log(arr.pop());             // Output: 5                        pop() removes and returns the last item of an array.
console.log(arr);                   // Output: [ 1, 2, 3, 4 ]
console.log(arr.shift());           // Output: 1                        shift() removes and returns the first item of an array.
console.log(arr);                   // Output: [ 2, 3, 4 ]
console.log(arr.push('5'));         // Output: 4                        push() appends an item and returns a new length of an array.
console.log(arr);                   // Output: [ 2, 3, 4, '5' ]         js array could store items of different types.
console.log(arr.unshift('1'));// Output: 5                        unshift() prepends an item and returns a new length of an array.
console.log(arr);                   // Output: [ '1', 2, 3, 4, '5' ]

// There are 3 types of cycles for arrays: for (;;;), .forEach(), for (of).
let arrayValues = '';
for (let i = 0; i < arr.length; i++) {      // Iterating an array.
    arrayValues += arr[i];
    arrayValues += ' ';
}
console.log(arrayValues);                   // Output: 1 2 3 4 5

const arr1 = [1, 2, 3];
console.log(arr1.length);           // Output: 3
// It's possible to append an element with arbitrary index, but arrays are not supposed to be used like that. Array should be ordered and uninterrupted to be efficient and fast.
// Otherwise js engine will not be able to provide runtime optimizations.
arr1[99] = 'surprise';              // This creates 3..98 empty cells and appends 99 cell with a value.
console.log(arr1.length);           // Output: 100      length actually returns [last index + 1] value.
console.log(arr1);                  // Output: [ 1, 2, 3, <96 empty items>, 'surprise' ]
arr1.customProp = 'hehe';           // Array is an object in fact, so it could store an arbitrary key-value pair. But array is not intended for that, optimizations are broken also.
console.log(arr1);                  // Output: [ 1, 2, 3, <96 empty items>, 'surprise', customProp: 'hehe' ]
arr1[98] = '98';
arr1[97] = '97';                    // Reverse array filling - another example of possible, but improper and unoptimized array usage.

const arr2 = ['one', 'two', 'three'];
let output = '';
arr2.forEach(function(value, index, array) {
    output += `${index}: ${value} in array: ${array}\n`;
});
console.log(output);                // Output:  0: one in array: one,two,three
                                    //          1: two in array: one,two,three
                                    //          2: three in array: one,two,three

output = '';
for (let key in arr2) {
    output += key + ' ';
}
console.log(output);                // Output: 0 1 2            for (in) cycles through object's keys, so indexes are being cycled for array object.

output = '';
for (let key in arr2) {             // for (in) could be used to get values, but its 10..100 times slower than for (of) and iterates over custom properties (besides indexes).
    output += arr2[key] + ' ';
}
console.log(output);                // Output: one two three

output = '';
for (let value of arr2) {
    output += value + ' ';
}
console.log(output);                // Output: one two three    for (of) cycles through object's values, so array's values are being cycled.

const stringWithDividers = '111,222,333,444';
const arrayOfStrings = stringWithDividers.split(',');                   // array = string.split()
console.log(`length: ${arrayOfStrings.length}, array: ${arrayOfStrings}`);      // Output: length: 4, array: 111,222,333,444
const joinedArrayString = arrayOfStrings.join(',');                             // string = array.join()
console.log(joinedArrayString);                                                 // Output: 111,222,333,444

const toSortStringArray = ['c', 'b', 'a'];
console.log(toSortStringArray.sort());                      // Output: [ 'a', 'b', 'c' ]
const toSortNumberArray = [3, 314, 4];
console.log(toSortNumberArray.sort());                      // Output: [ 3, 314, 4 ]        !! sort() uses string comparison by default.
function compareNumbers(num1, num2) {
    return num1 - num2;
}
console.log(toSortNumberArray.sort(compareNumbers));        // Output: [ 3, 4, 314 ]        !! to sort() numbers correct comparator-function should be used.

const array = [1, 2, 3, 4, 5, 6, 7, 8];
const slicedArray = array.slice(1, 3);          // slice() copies and returns an array of 3 elements, starting with index n, ending with index (m - 1)
console.log(array);                             // Output: [ 1, 2, 3, 4, 5, 6, 7, 8 ]
console.log(slicedArray);                       // Output: [ 2, 3 ]
const splicedArray = array.splice(1, 3);    // splice() deletes and returns an array of m elements, starting with index n
console.log(array);                             // Output: [ 1, 5, 6, 7, 8 ]
console.log(splicedArray);                      // Output: [ 2, 3, 4 ]
const reversedArray = splicedArray.reverse();   // Reverses and returns original array.
console.log(splicedArray);                      // Output: [ 4, 3, 2 ]
console.log(reversedArray);                     // Output: [ 4, 3, 2 ]
const concatArray = reversedArray.concat(1, 0); // concat() copies original array and appends provided elements.
console.log(reversedArray);                     // Output: [ 4, 3, 2 ]
console.log(concatArray);                       // Output: [ 4, 3, 2, 1, 0 ]
delete array[1];                                // delete array[index]      deletes element with specific index
console.log(array);                             // Output: [ 1, <1 empty item>, 3, 4, 5, 6, 7, 8 ]

const arrayWithLength = [1, 2, 3, 4, 5];
const aLength = arrayWithLength.length;
arrayWithLength.length = 3;                     // Length could be overwritten, array is reduced accordingly.
console.log(arrayWithLength);                   // Output: [ 1, 2, 3 ]
arrayWithLength.length = aLength;               // After length 'restoration' values won't be restored.
console.log(arrayWithLength);                   // Output: [ 1, 2, 3, <2 empty items> ]
arrayWithLength.length = 0;                     // The simplest method to clean an array.
console.log(arrayWithLength);                   // Output: []

const matrix = [                                // Array could store arrays.
    [1, 2], [3, 4]
];
console.log(matrix);                            // Output: [ [ 1, 2 ], [ 3, 4 ] ]

// Array do not implement both toPrimitive() and valueOf(). So array are always concatenated using toString() method when used with + operator.
console.log([] + 1);                            // Output: 1
console.log([1] + 1);                           // Output: 11
console.log([1, 2] + 1);                        // Output: 1,21

// Pseudo arrays are objects with array-like key-value pairs (keys are numbers, values are of arbitrary types).
// Pseudo arrays differ from arrays in fact they don't have array's methods (pop, shift, push, unshift, split, sort, ...)