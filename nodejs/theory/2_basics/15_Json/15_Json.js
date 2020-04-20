'use strict';           // jshint ignore: line

/* JSON - JavaScript Object Notation. */
// JSON.stringify()     object -> json
// JSON.parse()         json -> object

const student = {
    name: 'John',
    age: 18,
    courses: [ 'html', 'js', 'css'],
    wife: {
        name: 'Rebecca',
        age: 18
    }
};
const jsonStudent = JSON.stringify(student);    // jsonStudent is the json-formatted serialized object.

console.log(jsonStudent);                   // Output: {"name":"John","age":18,"courses":["html","js","css"],"wife":{"name":"Rebecca","age":18}}
console.log(JSON.parse(jsonStudent));       // Output: { name: 'John', age: 18, courses: [ 'html', 'js', 'css' ], wife: { name: 'Rebecca', age: 18 } }

// Json-formatted object could contain only double quotes (no back quotes or single quotes allowed); every key is converted to a string.
// Json-formatted object could contain objects, arrays, strings, numbers, booleans and nulls as is.
console.log(JSON.stringify({ type: 'object' }));    // Output: {"type":"object"}
console.log(JSON.stringify([ 'array' ]));           // Output: ["array"]
console.log(JSON.stringify('string'));              // Output: "string"
console.log(JSON.stringify(1));                     // Output: 1
console.log(JSON.stringify(true));                  // Output: true
console.log(JSON.stringify(null));                  // Output: null

// JSON.stringify() ignores methods, Symbol-properties and properties with undefined value.
const stringifyIgnoresProperties = {
    method() {

    },
    [Symbol('id')]: 123,
    undefinedValueKey: undefined
};
console.log(JSON.stringify(stringifyIgnoresProperties));    // Output: {}

// Enclosed objects are handled properly by JSON.stringify(), but there should be no cyclic properties.
const object1 = { };
const object2 = { };
object1.obj = object2;
object2.obj = object1;
// console.log(JSON.stringify(object1));        // TypeError: Converting circular structure to JSON

// JSON.stringify(value, [replacer, space]).
// 'replacer' - a properties array or a mapping function(key, value).
// 'space' - number of spaces used for formatting json.

// Argument 'replacer' could be used to map or bypass some properties.
const withIgnoredProperties = {
    key1: 'value1',
    key2: 'value2',
    key3: {
        key1: 'common key name!!',
        innerKey1: 'innerValue1',
        innerKey2: 'innerValue2'
    },
    ignore: false,
    replace: false
};
// If 'replacer' is an array of strings - only keys contained in the array are used, including both regular an enclosed objects keys with common names.
// Other properties are ignored by JSON.stringify(), including enclosed objects keys.
console.log(JSON.stringify(withIgnoredProperties, [ 'key1', 'key3' ]));     // Output: {"key1":"value1","key3":{"key1":"common key name!!"}}
// If 'replacer' is a mapping function(key, value) return:
// * a string for key-value pair to replace a value in mapping
// * an undefined value to skip a property
// * a value itself to leave it as is.
// 'this' value inside replacer refers to the object, which owns the mapped property.
// The first call of replacer comes with '' key and whole object to map value. One can analyze and replace object to stringify.
console.log(JSON.stringify(withIgnoredProperties, (key, value) => {
    if (key === '') {
        if (value.ignore) {             // If true - JSON.stringify() returns {}.
            return {};
        } else if (value.replace) {     // If true - output will become: {"replacementObjectKey":"replacementObjectValue"}
            return { replacementObjectKey: 'replacementObjectValue' };
        }
    }
    if (value === 'value1') {
        return 'VALUE1';
    }
    if (key === 'key2' || key.startsWith('inner') || typeof value === 'boolean') {
        return undefined;
    }
    return value;
}));                                                                                // Output: {"key1":"VALUE1","key3":{"key1":"common key name!!"}}

// 'space' argument is used to pretty-format the output (for logging).
const toFormatWithSpaces = {
    key1: 'value1',
    key2: 'value2'
};
console.log(JSON.stringify(toFormatWithSpaces));
/* Output: {"key1":"value1","key2":"value2"} */
console.log(JSON.stringify(toFormatWithSpaces, null, 2));
/* Output:
{
  "key1": "value1",
  "key2": "value2"
}
 */
console.log(JSON.stringify(toFormatWithSpaces, null, 4));
/* Output:
{
    "key1": "value1",
    "key2": "value2"
}
 */


/* .toJSON() method */
// .toJSON() is used to override object's default to json mapping. Some built-in object (for example Date) already have .toJSON() implemented.
console.log(JSON.stringify({ date: new Date()}));       // Output: {"date":"2020-04-20T20:12:39.973Z"}
const withToJSON = {
    toJSON() {
        return 'Here comes json';
    }
};
const withWithToJSON = {
    key: withToJSON
};
console.log(JSON.stringify(withToJSON));            // Output: "Here comes json"
console.log(JSON.stringify(withWithToJSON));        // Output: {"key":"Here comes json"}


/* JSON.parse(str, [reviver]) */
// 'reviver' is a function(key, value), which could return alternative value for each key-value pair of json input.
console.log(JSON.parse('[0, 1, 2, 3]'));                        // Output: [ 0, 1, 2, 3 ]
console.log(JSON.parse('{"name": "John", "age": 18}'));         // Output: { name: 'John', age: 18 }
// Attention is needed when formatting json by hand, JSON.parse() handles only correctly formed json strings.
// Common json formatting mistakes: key without double quotes, single or back quotes usage, 'new' constructor usage (only values are allowed), comments usage.
const completelyWrongJson = "{key: 'value', date: new Date() // valuable comment comes here }";
// console.log(JSON.parse(completelyWrongJson));        // SyntaxError: ...

// 'reviver' function argument is used to correctly parse values, which couldn't be handled by JSON.parse() itself.
const jsonFromServer = `{
    "name": "Vasya",
    "date": "2017-11-30T12:00:00.000Z",
    "inner": {
        "dateInner": "2017-04-18T12:00:00.000Z"
    }
}`;
console.log(JSON.parse(jsonFromServer));
/*
Output: { name: 'Vasya',
  date: '2017-11-30T12:00:00.000Z',
  inner: { dateInner: '2017-04-18T12:00:00.000Z' } }
Both date and dateInner are parsed as strings, JSON.parse() doesn't know how to parse those values - as strings or as dates.
 */
console.log(JSON.parse(jsonFromServer, (key, value) => {
    if (key.startsWith('date')) {
        return new Date(value);
    }
    return value;
}));
/*
Output: { name: 'Vasya',
  date: 2017-11-30T12:00:00.000Z,
  inner: { dateInner: 2017-04-18T12:00:00.000Z } }
Now dates are dates.
 */






