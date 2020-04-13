'use strict';           // jshint ignore: line

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
arr1[99] = 'surprise';              // This creates 3..98 empty cells and appends 99 cell with a value.
console.log(arr1.length);           // Output: 100      length actually returns [last index + 1] value.
console.log(arr1);                  // Output: [ 1, 2, 3, <96 empty items>, 'surprise' ]

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




// Pseudo arrays are objects with array-like key-value pairs (keys are numbers, values are of arbitrary types).
// Pseudo arrays differ from arrays in fact they don't have array's methods (pop, shift, push, unshift, split, sort, ...)