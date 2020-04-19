'use strict';               // jshint ignore: line

// Built-in Date object type contains date, time and methods to manipulate both of them.

// Date constructor.
const now = new Date();
console.log(now);           // Output: 2020-04-19T19:52:36.976Z (current date and time)
const _01Jan1970 = new Date(0);                                 // Using zero timestamp for 1970-01-01
console.log(_01Jan1970);    // Output: 1970-01-01T00:00:00.000Z
const _02Jan1970 = new Date(1000 * 60 * 60 * 24);               // Using timestamp (milliseconds since 1970-01-01
console.log(_02Jan1970);    // Output: 1970-01-02T00:00:00.000Z
const _31Dec1969 = new Date(-1000 * 60 * 60 * 24);              // Using negative timestamp for dates before 1970-01-01
console.log(_31Dec1969);    // Output: 1969-12-31T00:00:00.000Z
const parsedDate = new Date('2020-04-19');                      // String argument using same rules as Date.parse()
console.log(parsedDate);    // Output: 2020-04-19T00:00:00.000Z     Time wasn't specified - becomes GMT midnight (varies +/- depending on local timezone).
const constructedDate = new Date(2020, 0, 1, 11, 1, 1);      // Year is four-digit, month is zero-based.
console.log(constructedDate);   // Output: 2020-01-01T08:01:01.000Z     Time is local timezone dependent.
const shortConstructedDate = new Date(2020, 1);           // Only year and month are required.
console.log(shortConstructedDate);  // Output: 2020-01-31T21:00:00.000Z

// Get date fragments methods.
// Methods getFullYear, getMonth, getDate, getHours, getMinutes, getSeconds, getMilliseconds, getDay ARE local timezone dependent.
console.log(now.getFullYear());     // Output: 2020     Note: not Date.year() - works sometimes and incorrect (returns 2-digit value).
console.log(now.getMonth());        // Output: 3        Zero-based month
console.log(now.getDate());         // Output: 19
console.log(now.getHours());        // Output: 23
console.log(now.getMinutes());      // Output: 13
console.log(now.getSeconds());      // Output: 37
console.log(now.getMilliseconds()); // Output: 993
console.log(now.getDay());          // Output: 0        0 - sunday, 6 - saturday
// There are the same methods to get UTC+0 date (local timezone independent, London date and time without wintertime transition).
// Every method above has it's UTC analog: getUTCFullYear, getUTCMonth, ...
console.log(now.getUTCFullYear());  // Output: 2020
// There are 2 methods without UTC-analogs: getTime and getTimezoneOffset.
console.log(now.getTime());             // Output: 1587327783435        Returns date's timestamp (milliseconds since 1970-01-01).
console.log(now.getTimezoneOffset());   // Output: -180                 Returns signed difference between UTC and local timezone in minutes. UTC+3 === -180

// Set date fragments methods.
// Methods with UTC analogs:
// * setFullYear(year, [month], [date])
// * setMonth(month, [date])
// * setDate(date)
// * setHours(hours, [minutes], [seconds], [milliseconds])
// * setMinutes(minutes, [seconds], [milliseconds])
// * setSeconds(seconds, [milliseconds])
// * setMilliseconds(milliseconds)
// Methods without UTC analog: setTime(milliseconds)
console.log(now.setFullYear(2020, 1, 1));   // Output: 1587327783435        Returns milliseconds since 1970-01-01, as getTime() does.
console.log(now.setUTCFullYear(2020, 1, 1));
console.log(now.setMonth(1, 1));
console.log(now.setDate(1));
console.log(now.setHours(1, 1, 1, 1));
console.log(now.setMinutes(1, 1, 1));
console.log(now.setSeconds(1, 1));
console.log(now.setMilliseconds(1));
console.log(now.setTime(1000 * 60 * 60 * 24));      // Method without UTC analog.

// Date object type could correct it's value if an argument of a method is out of the valid range.
let selfCorrectedDate = new Date(2020, 3, 32);      // date is out of the range.
console.log(selfCorrectedDate);     // Output: 2020-05-01T21:00:00.000Z
selfCorrectedDate.setDate(0);       // Argument could be a zero value.
console.log(selfCorrectedDate);     // Output: 2020-04-29T21:00:00.000Z
selfCorrectedDate.setDate(-1);      // Argument could be a negative value.
console.log(selfCorrectedDate);     // Output: 2020-03-29T21:00:00.000Z

// Date transforms to a number with the value of milliseconds since 1970-01-01 (so as getTime() method does).
const hundredMillisDate = new Date(100);
console.log(+hundredMillisDate);             // Output: 100
// As soon as dates could be transformed to numbers - one could subtract dates, milliseconds are being subtracted.
const thousandMillisDate = new Date(1000);
console.log(thousandMillisDate - hundredMillisDate);        // Output: 900

// Date.now() could be used instead of new Date().getTime() to bypass object creation (and prevent excess garbage collection).
const dateNow = Date.now();
const datePast = new Date(dateNow - 1000);
console.log(dateNow - datePast);            // Output: 1000

// Date.parse(str). A string should be formed as YYYY-MM-DDTHH:mm:ss.sssZ . T is a divider. Optional Z should be a timezone in +-hh:mm format, or just Z (means UTC+0).
// All fragments are optional, strings formatted as YYYY-MM or just YYYY are also valid.
// Date.parse(str) returns a timestamp since 1970-01-01 UTC+0 or NaN if the str couldn't be parsed.
const parsedDateWithLocalTimezone = Date.parse('2020-04-19T23:50:12.123+03:00');
console.log(parsedDateWithLocalTimezone);   // Output: 1587329412123
const parsedDateWithUtcTimezone = Date.parse('2020-04-19T23:50:12.123Z');
console.log(parsedDateWithUtcTimezone);     // Output: 1587340212123
console.log(new Date(parsedDateWithLocalTimezone));     // Output: 2020-04-19T20:50:12.123Z
console.log(new Date(parsedDateWithUtcTimezone));       // Output: 2020-04-19T23:50:12.123Z

// Date's accuracy is limited to milliseconds. If more accuracy is needed other methods should be used: browsers support performance.now() method, NodeJs has microtime module.







