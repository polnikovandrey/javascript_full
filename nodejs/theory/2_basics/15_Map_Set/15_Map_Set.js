'use strict';           // jshint ignore: line

/* Map, Set */

// Map is used to store key-value pairs like Object. Object's key is always of a string type, Map's key could be of any data type.
// Map uses SameValueZero comparison algorithm to find values. It's same as === comparison, but NaN is equal to Nan (so NaN could be used as a key).
// To know methods: new Map(iterable), set(), get(), has(), delete(), clear(), .size
const map = new Map();
map                             // Note: set() methods could be chained.
    .set(1, 'number')                   // Key is a number.
    .set('1', 'string')                 // Key is a string.
    .set(true, 'boolean')               // Key is a boolean.
    .set({}, 'object');                 // Key is an object.
console.log(map.get(1));                // Output: number
console.log(map.get('1'));              // Output: string
console.log(map.has('1'));          // Output: true
console.log(map.size);                  // Output: 4
console.log(map.delete(true));      // Output: true
map.clear();

// Every iterable with key-value pairs could be passed to Map constructor. Values are copied to the Map.
const map1 = new Map([['1', 'a'], ['2', 'b'], ['3', 'c']]);
// To know cycle methods: keys(), values(), entries(), forEach(). Another difference from object - map's key-value pairs are cycled in insertion order.
let mapAccum = '';
for (let key of map1.keys()) {
    mapAccum += key;
}
mapAccum += ' | ';
for (let value of map1.values()) {
    mapAccum += value;
}
mapAccum += ' | ';
for (let entry of map1) {       // .entries() is used by default by for..of, map1 is the same as map1.entries()
    mapAccum += entry + ' ';       // 1,a ...
}
console.log(mapAccum);             // Output: 123 | abc | 1,a 2,b 3,c
mapAccum = '';
map1.forEach((value, key, map) => mapAccum += `${key}:${value} `);
console.log(mapAccum);             // Output: 1:a 2:b 3:c

// Non-iterable object could be transformed to key-value pairs array with Object.entries() and passed to the Map constructor.
const obj = {
    name: 'John',
    age: 18
};
const arrayFromObject = Object.entries(obj);
const mapFromArray = new Map(arrayFromObject);
console.log(mapFromArray);            // Output: Map { 'name' => 'John', 'age' => 18 }

// The reverse operation Map -> Array -> Object could be performed with the help of Object.fromEntries() method. Map.fromEntries() expects iterable.
// Commented because Object.fromEntries() is not implemented in nodeJS.
// console.log(Object.fromEntries(mapFromArray.entries()));        // entries() returns key-value pairs array (iterable)
// console.log(Object.fromEntries(mapFromArray));                  // Map is iterable itself



// Set is a collection of distinct values.
// Array could possibly be used to prevent duplicates with find() check instead of Set. But it's much slower than Set, because Array.find() iterates over every element.
// To know methods: new Set(iterable), add(), delete(), has(), clear(), .size
// When constructor is used with an Iterable - it's values are copied to the Set.
const set = new Set();
set
    .add(1)
    .add(2)
    .add(3)
    .add(3);                            // If value exists in a set - add() ignores this value.
console.log(set);                       // Output: Set { 1, 2, 3 }
console.log(set.size);                  // Output: 3
console.log(set.delete(2));       // Output: true
console.log(set.has(3));          // Output: true
set.clear();

// Set could be cycled both with for..of and forEach(). Iterates in insertion order (remember that duplicate add() is ignored).
const set1 = new Set([1, 2, 3]);
let setAccum = '';
for (let value of set1) {
    setAccum += value;
}
setAccum += ' | ';
// sameValue argument below is implemented to support Map <=> Set displacements, so as Set's keys()/values()/entries() methods of Set. Method values() is the same as keys().
set1.forEach((value, sameValue, set) => {
    setAccum += value;
});
console.log(setAccum);      // Output: 123 | 123



/* WeakMap, WeakSet */

// Both WeakMap and WeakSet are used to store data (objects), whose accessibility is controlled somewhere outside of code, which uses those data structures.
// WeakMap and WeakSet support garbage collection of objects, stored in them, if no other links to those objects exist.
// WeakMap's key should be an object. WeakMap has no methods to get all keys/values/entries/size (no keys(), values(), entries(), size() methods) and not iterable.
// The reason is the fact that it's unknown when exactly js garbage collection implementation should discard stale objects.
// WeakMap supports only methods: get(), set(), delete(), has().
// WeakMap is used to store data (value), which is logically tied to the key object and should be garbage collected when the key object is no longer accessible.
// In other words - the value in a WeakMap is garbage collected alongside with the key object, then it becomes inaccessible (besides the WeakMap itself).
// Use case: to store logged user session data, which is no longer needed when user log out.
// Use case: a cache implementation, which is automatically cleaned up when the cache key is no longer accessible.
const aMap = new Map();
let aMapObject = { };
aMap.set(aMapObject, '');
aMapObject = null;          // aMapObject won't be garbage collected - it is contained in the aMap and is accessible.

const aWeakMap = new WeakMap();
let aWeakMapObject = { };
aWeakMap.set(aWeakMapObject, '');
aWeakMapObject = null;      // aWeakMap object would be garbage collected - there are no references to it besides the aWeakMap.

// WeakSet is also used to store object, which become not accessible and are being garbage collected when there are no links to the object left.
// WeakSet could store only objects. It has only add(), has() and delete() methods and is not iterable.
// Use case: to store only logged-in users data and to check if user is logged in (WeakSet.has(user)). Logged out users loose references and are cleaned from a WeakSet.


/* Object.keys, values, entries */

// Map, Set, Array support keys(), values() and entries() methods. One should also implement those method for data structure to follow js convention.
// Object type supports those methods also, but not directly (through Object type) and syntax is a little bit different.
// Object could have it's own keys(), values(), entries() methods, but it could be used with Object.method() also.
// Object.keys(obj), Object.values(obj) and Object.entries(obj) method return arrays, on the contrary Map/Set/Array methods return iterable object.
const user = {
    name: 'John',
    age: 20,
    [Symbol.name]: 'user'
};
console.log(Object.keys(user));     // Output: [ 'name', 'age' ]
console.log(Object.values(user));   // Output: [ 'John', 20 ]
console.log(Object.entries(user));  // Output: [ [ 'name', 'John' ], [ 'age', 20 ] ]

const aMap1 = new Map();
aMap.set(1, 2);
aMap.set('3', '4');
console.log(Array.isArray(aMap.keys()));            // Output: false
console.log(Array.isArray(Object.keys(aMap)));      // Output: true

// Object.keys/values/entries ignores Symbol-key properties (as for..in cycle does). To get Symbol-key properties only Object.getOwnPropertySymbols() should be used.
// To get all properties including Symbol-key properties - Reflect.ownKeys(obj) method should be used.
const objectWithSymbolKeyProperty = {
    commonKey: '',
    [Symbol.toPrimitive](hint) {                                            // This single method handles all possible types of hint.
        return hint === 'string' ? `1` : 1;
    }
};
console.log(Object.keys(objectWithSymbolKeyProperty));                          // Output: [ 'commonKey' ]
console.log(Object.getOwnPropertySymbols(objectWithSymbolKeyProperty));         // Output: [ Symbol(Symbol.toPrimitive) ]
console.log(Reflect.ownKeys(objectWithSymbolKeyProperty));                      // Output: [ 'commonKey', Symbol(Symbol.toPrimitive) ]

// Object has no array-like methods - map(), filter(), ... To use those methods on objects one should get entries Object.entries(obj), modify, then convert back to object
// with the Object.fromEntries(obj) method.
const prices = {
    apple: 2,
    banana: 3,
    cherry: 5
};
// const doublePrices = Object.fromEntries(Object.entries(prices).map(([key, value]) => [key, value * 2]));     // Object.fromEntries is not implemented in NodeJs.
// console.log(prices);     // Output: { apple: 4, banana: 6, cherry: 10 }
