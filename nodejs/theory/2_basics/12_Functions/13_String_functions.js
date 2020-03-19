'use strict';       // jshint ignore: line

/* ----- Via https://learn.javascript.ru/string ----- */

// Js always uses UTF-16 encoding in spite of page encoding.

/* ----- Quotes in string declaration ----- */
// Strings are wrapped with ', " or `.
let singleQuoteString = 'has "quotes" inside';
let doubleQuoteString = "has 'quotes' inside";
let backQuoteString = `has 'quotes' and "quotes" inside`;

function sum(a, b) {
    return a + b;
}
console.log(`Sum result is ${sum(2, 2)}`);      // Back quoted string supports inner expressions.
console.log(`This
is
a
multiline
string!`);                                              // Back quoted string supports multiline strings.


/* ----- Tag functions ----- */
function handleBackQuotedTemplateString(stringValue) {  // Back quoted string supports tag functions.
    console.log(stringValue + '!!!');
}
const tagFunction = handleBackQuotedTemplateString`My super string`;    // Output: My super string!!!


/* ----- Special symbols ----- */
// \n                       new line symbol
// \'                       single quote escape
// \"                       double quote escape
// \\                       slash escape
// \t                       tabulation symbol
// \xXX                     2 digits hex unicode code symbol, \x7A = 'z'
// \uXXXX                   4 digits hex UTF-16 code symbol, \u00A9 = '©'
// \u{X...XXXXXX}           1-6 digits hex UTF-32 code symbol


/* ----- Length of a string ----- */
console.log('Some string'.length);          // Output: 11       String length property


/* ----- Access char of a string by index ----- */
console.log('Some string'[0]);              // Output: S        Modern char access
console.log('Some string'.charAt(0));       // Output: S        Former char access
console.log('Some string'[1000]);           // Output: undefined
console.log('Some string'.charAt(1000));    // Output: empty string


/* ----- Cycle a string by chars ----- */
const aString = 'Some string';
let aConcat = '';
for (let char of aString) {                 // for ... of - cycles through chars of a string.
    if (char) {
        aConcat += char += '.';
    }
}
console.log(aConcat);                       // Output: S.o.m.e. .s.t.r.i.n.g.


/* ----- Uppercase/lowercase functions -----*/
console.log('Hello'.toUpperCase());         // Output: HELLO
console.log('Hello'.toLowerCase());         // Output: hello


/* ----- Search for a substring (indexOf(), lastIndexOf(), includes(), startsWith(), endsWith() ----- */
const searchInsideString = 'AbcdefAbcdef';

console.log(searchInsideString.indexOf('A'));               // Output: 0
console.log(searchInsideString.indexOf('A', 1));            // Output: 6
console.log(searchInsideString.indexOf('a'));               // Output: -1

console.log(searchInsideString.lastIndexOf('b'));           // Output: 7
console.log(searchInsideString.lastIndexOf('b', 1));        // Output: 1

console.log(searchInsideString.includes('Abcdef'));         // Output: true
console.log(searchInsideString.includes('Abcdef', 7));      // Ouput: false

console.log(searchInsideString.startsWith('Abc'));          // Output: true
console.log(searchInsideString.startsWith('Abc', 6));       // Output: true
console.log(searchInsideString.startsWith('Abc', 7));       // Output: false

console.log(searchInsideString.endsWith('def'));            // Output: true
console.log(searchInsideString.endsWith('def', 6));         // Output: true
console.log(searchInsideString.endsWith('def', 7));         // Output: false


/* ----- Substrings ----- */
const fullString = 'stringify';

console.log(fullString.slice(2));           // Output: ringify
console.log(fullString.slice(0, 1));        // Output: s        Start position, end position
console.log(fullString.slice(1, 4));        // Output: tri
console.log(fullString.slice(-4, -1));      // Output: git      Start and end positions from the end of a string

console.log(fullString.substring(1, 4));    // Output: tri      The same as slice(), but negative parameters are interpreted as zeros.
console.log(fullString.substring(4, 1));    // Output: tri      The order of arguments could be reversed with the same result, but slice() returns empty string in this case.

console.log(fullString.substr(0, 6));       // Output: string       Start position, length
console.log(fullString.substr(-5, 2));      // Output: ng           Start position could be negative - position from the end of a string.


/* ----- Compare strings ----- */
console.log('a' > 'Z');                                 // Output: true     Uppercase letters are lt lowercase ones.
console.log('aZc'.codePointAt(1));                      // Output: 90       UTF-16 code for 'Z'
console.log(String.fromCodePoint('90'));      // Output: 'Z'
console.log('\u005a');                                  // Output: 'Z'      hex(98) == 005a
console.log('Öst'.localeCompare('Ost'));           // Output: 1        Locale-specific comparison rules are applied (including language dependent alphabets).


/* ----- Miscellaneous ----- */
console.log('   abc   '.trim());                    // Output value: 'abc'
console.log('   abc   '.trimLeft());                // Output value: 'abc   '
console.log('   abc   '.trimRight());               // Output value: '   abc'

console.log('abc'.repeat(3));                 // Output: abcabcabc







