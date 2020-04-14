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
const arrayOfStrings1 = stringWithDividers.split(',', 2);         // limit argument could limit the length of resulting array, elements over limit are ignored.
console.log(arrayOfStrings1);                                                   // Output: [ '111', '222' ]
const lettersArray = 'aString'.split('');                              // split() with empty string could used to split string into distinct letters.
console.log(lettersArray);                                                      // Output: [ 'a', 'S', 't', 'r', 'i', 'n', 'g' ]
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
const slicedArray1 = array.slice(-4, -2);       // Both start and end could be negative, indexes are calculated from the last element (-1 means last element).
console.log(slicedArray1);                      // Output: [ 5, 6 ]
const slicedArray2 = array.slice(-2, -4);       // Order of start/end is important, should be from start to begin.
console.log(slicedArray2);                      // Output: []
const slicedArray3 = array.slice(4);            // End parameter could be skipped, the rest of array starting with start parameter is returned.
console.log(slicedArray3);                      // Output: [ 5, 6, 7, 8 ]
const copiedArray = array.slice();              // slice() without parameters copies an array.
copiedArray[0] = 111;
console.log(copiedArray);                       // Output: [ 111, 2, 3, 4, 5, 6, 7, 8 ]     Copy of array was modified.
console.log(array);                             // Output: [ 1, 2, 3, 4, 5, 6, 7, 8 ]       Original array stays intact.

const splicedArray = array.splice(1, 3);    // splice() deletes and returns an array of m elements, starting with index n
console.log(array);                             // Output: [ 1, 5, 6, 7, 8 ]
console.log(splicedArray);                      // Output: [ 2, 3, 4 ]
const splicedArray1 = splicedArray.splice(1, 1, 33, 333, 3333);      // splice() could also replace deleted elements with items provided.
console.log(splicedArray);                      // Output: [ 2, 33, 333, 3333, 4 ]
console.log(splicedArray1);                     // Output: [ 3 ]
const splicedArray2 = splicedArray.splice(4, 0, 33333, 333333);      // splice() could also insert items without deletion of elements.
console.log(splicedArray);                      // Output: [ 2, 33, 333, 3333, 33333, 3333333, 4 ]
console.log(splicedArray2);                     // Output: []
const splicedArray3 = splicedArray.splice(-2, 1, 444444);           // splice() with negative start parameter counts index from the end of an array.
console.log(splicedArray);                      // Output: [ 2, 33, 333, 3333, 33333, 444444, 4 ]       Note: -1 start parameter means the last element
console.log(splicedArray3);                     // Output: [ 333333 ]

const reversedArray = splicedArray.reverse();   // Reverses and returns original array.
console.log(splicedArray);                      // Output: [ 4, 444444, 33333, 3333, 333, 33, 2 ]
console.log(reversedArray);                     // Output: [ 4, 444444, 33333, 3333, 333, 33, 2 ]

const concatArray = reversedArray.concat(1, 0, -1);     // concat() copies original array and appends copies and concatenates elements provided.
console.log(reversedArray);                     // Output: [ 4, 444444, 33333, 3333, 333, 33, 2 ]
console.log(concatArray);                       // Output: [ 4, 444444, 33333, 3333, 333, 33, 2, 1, 0, -1 ]
const toConcatArray = [-2, -3];
const concatArray1 = concatArray.concat(toConcatArray, -4, -5);     // Any number of arguments could be arrays, theirs elements are copied and concatenated.
console.log(concatArray1);                      // Output: [ 4, 444444, 33333, 3333, 333, 33, 2, 1, 0, -1, -2, -3, -4, -5 ]
const originalArray = [1, 2];
const arrayLikeObject = {                       // Array-like objects are concatenated as is, like objects.
    0: 3,
    1: 4,
    length: 2
};
const withArrayLikeElementArray = originalArray.concat(arrayLikeObject);
console.log(withArrayLikeElementArray);         // Output: [ 1, 2, { '0': 3, '1': 4, length: 2 } ]
// To handle as-array concatenation an array-like object should have number-key properties, length property and Symbol.isConcatSpreadable property set to true.
const concatSpreadableArrayLikeObject = {
    0: 3,
    1: 4,
    length: 2,
    [Symbol.isConcatSpreadable]: true
};
const withConcatSpreadableArrayLikeObjectArray = originalArray.concat(concatSpreadableArrayLikeObject);
console.log(withConcatSpreadableArrayLikeObjectArray);      // Output: [ 1, 2, 3, 4 ]



delete array[1];                                // delete array[index]      deletes a value at specified index, array's length stays intact.
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

const toSearchArray = ['a', 0, 777, false, 777, NaN];
console.log(toSearchArray.indexOf(777));            // Output: 2
console.log(toSearchArray.lastIndexOf(777));        // Output: 4
console.log(toSearchArray.indexOf(false));          // Output: 3        indexOf() search uses strict equality check, so strict false value is being searched (not 0).
console.log(toSearchArray.indexOf('no such value'));// Output: -1       -1 return value means 'value was not found'.
console.log(toSearchArray.includes('a'));           // Output: true     If index is not necessary - one should prefer includes() method.
console.log(toSearchArray.indexOf(NaN));            // Output: -1
console.log(toSearchArray.lastIndexOf(NaN));        // Output: -1       Both indexOf()/lastIndexOf do not work with NaN, because NaN !== NaN
console.log(toSearchArray.includes(NaN));           // Output: true     But includes() is able to locate NaN.


// find() iterates over elements, argument function should return true for searched element. Function find() returns found element or undefined otherwise.
const users = [
    { id: 1, name: 'volta'},
    { id: 2, name: 'ampere'},
    { id: 3, name: 'watt'}
];
console.log(users.find(function(item, index, array) {
    return item.id === 3;
}));                                                                                                                            // Output: { id: 3, name: 'watt' }
console.log(users.find((item, index, array) => item.id === 2));      // Output: { id: 2, name: 'ampere' }
console.log(users.find(item => item.id === 4));                                                                        // Output: undefined

// findIndex() does the same as find(), but returns found index or -1 otherwise.
console.log(users.findIndex(function(item, index, array) {
    return item.name === 'ampere';
}));                                                                                                                           // Output: 1

// filter() returns an array of all matching elements or empty array if none match.
console.log(users.filter(function(item, index, array) {
    return item.id === 1 || item.id === 3;
}));                                                                                                                // Output: [ { id: 1, name: 'volta' }, { id: 3, name: 'watt' } ]

// map() transforms each element to something else and returns array of transformed elements.
console.log(users.map(function(item, index, array) {
    return `id: ${item.id}`;
}));                                                                                                                // Output: [ 'id: 1', 'id: 2', 'id: 3' ]
const mapToObjectsArray = users.map(item => ({              // Note additional braces. Otherwise js will treat curly braces as start of a function, not object.
    id: item.id
}));
console.log(mapToObjectsArray);                                                                                     // Output: [ { id: 1 }, { id: 2 }, { id: 3 } ]

// reduce() is used to produce some value out of all array elements. Note: if initialValue is skipped - the starting previousValue equals 0 index element value, iteration starts
// from element with index 1. But there will be an error if no initialValue and array is empty. So initialValue should be present in all cases.
const initialValue = 'Users:';
console.log(users.reduce(function(previousValue, item, index, array) {
    return `${previousValue} ${item.name}`;
}, initialValue));                                                                                                  // Output: Users: volta ampere watt

// reduceRight() does the same as reduce(), but starts iteration from the beginning.
console.log(users.reduceRight(function(previousValue, item, index, array) {
    return `${previousValue} ${item.name}`;
}, initialValue));                                                                                                  // Output: Users: watt ampere volta

// some() returns true if any element matches.
console.log(users.some(function(item, index, array) {
    return item.id > 2;
}));                                                                                                               // Output: true

// every() returns true if all element match.
console.log(users.every(function(item, index, array) {
    return item.id < 4;
}));                                                                                                                // Output: true

// fill() fills an array with the same value from start index inclusive to end index exclusive.
const toFillArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
console.log(toFillArray.fill(333, 2, 4));                                                           // Output: [ 1, 2, 333, 333, 5, 6, 7, 8, 9 ]

// copyWithin() copies and inserts array's chunk from start index inclusive to end index exclusive to the target index.
const toCopyWithinArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 0 ];
console.log(toCopyWithinArray.copyWithin(1, 9, 12));                                               // Output: [ 1, 'a', 'b', 'c', 5, 6, 7, 8, 9, 'a', 'b', 'c', 0 ]


// Almost every array method, which takes function as an argument, has optional last argument thisArg. It provides 'this' context to the function argument.
const adultUserCriteria = {
    age: 18,
    isAdult(user) {
        return user.age >= this.age;
    }
};
const users1 = [ { id: 1, age: 16 }, { id: 2, age: 20 }, { id: 3, age: 78 } ];
// console.log(users1.filter(adultUserCriteria.isAdult));                       // TypeError: Cannot read property 'age' of undefined       * because this === undefined
console.log(users1.filter(adultUserCriteria.isAdult, adultUserCriteria));       // Output: [ { id: 2, age: 20 }, { id: 3, age: 78 } ]


// typeof couldn't be used to differ an array from the object. Array.isArray() should be used to define an array.
console.log(typeof { });                // Output: object
console.log(typeof [ ]);                // Output: object
console.log(Array.isArray({ }));    // Output: false
console.log(Array.isArray([ ]));    // Output: true

// Note: it's urgent to remember - sort(), reverse() and splice() methods mutate original array!