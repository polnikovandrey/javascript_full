'use strict';       // jshint ignore: line

// There is a problem of different representation of numbers in different regions. Some numbers are being written as arabic symbols, some as ierogliphs. Long number's ranks
// could be divided by spaces or commas, or not divided at all.
// Dates representation are also different - date's parts priority and dividers differ from country to country.
// Besides that there is a problem of strings comparison. Strings are being compared by their symbol code values, that is not what is expected: "ё" > "я" === true.

// ECMA-402 standard is used to solve these problems. It's widely supported. IE10- have no such support, but but there are special libraries for IE.
// Main ECMA-402 objects:
// * Intl.Collator - is used for natural comparison and sorting of strings.
// * Intl.DateTimeFormat - is used to format dates and times according to the specified language rules.
// * Intl.NumberFormat - is used to format numbers according to the specified language rules.

// A locale (локаль) is an argument, passed to the methods of objects above. It is a string, which consists of three parts:
// 1. language tag (код языка)
// 2. locale-specific method of writing code (код способа записи)
// 3. country code (код страны)
// A locale could contain only some of those parts: 'ru', 'en-GB', 'en-US', 'zh-Hans-CN'.
// A suffix -u could be added with locale extension after it: 'th-TH-u-nu-tai".
// The standard for locales - http://tools.ietf.org/html/rfc5646.
// The standard for languages - http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry.
// Each Intl object's method accepts a locale as a string or an array of strings (a list of localees, sorted by preference).
// If a locale is not specified - a default locale of the environment is being used.

// There is a special setting called 'localeMaster'. It provides a method of locale search if the provided local wasn't found. There are only 2 valid values for
// that property - 'lookup' and 'best fit' (is used by default).
// 'Lookup' means a method of simplifying the local: 'zh-Hans-CN' -> 'zh-Hans' -> 'zh'.
// 'Best fit' means to search for the most according locale of the locals provided by array, simplifying that locals. Otherwise - the default locale of the environment
// is used.

// Intl.Collator
// const collator = new Intl.Collator([locales, [options]]);            Only locales value/array is sufficient for most cases.
// const compareResult = collator. compare(str1, str2);                 Only 1, 0, -1 result values are possible
const collator = new Intl.Collator();
console.log("ёжик" > "яблоко");                            // Output: true         but naturally should be 'false
console.log(collator.compare("ёжик", "яблоко"));     // Output: -1           that is natural
// The special setting could be used to make comparison case-insensitive.
console.log(collator.compare("ЁжиК", "ёжик"));                      // Output: 1
const caseInsensitiveCollator = new Intl.Collator(undefined, { sensitivity: 'accent' });            // undefined locale - the default locale is used
console.log(caseInsensitiveCollator.compare("ЁжиК", "ёжик"));       // Output: 0
// Options object could contain such properties:
// * 'localeMatcher' - a method to search for most suitable locale: 'lookup', 'best fit' (default)
// * 'usage' - the purpose of comparison, 'search'/'sort'(default)
// * 'sensitivity' - which differences should be treated as the same symbols:
//      - 'base' - symbols influence comparison, diacritical signs and case are ignored: a != б, e == ё, а == А
//      - 'accent' - symbols and diacritical signs influence comparison, case is ignored: а != б, е != ё, а == А
//      - 'case' - symbols and case influence comparison, diacritical signs are ignored: а != б, е == ё, а != А
//      - 'variant'(default) - symbols, diacritical signs and case influence comparison: а != б, е !=ё, а != А
// * 'ignore punctuation': true/false(default)
// * 'numeric': 'true' 12 > 2 == true, 'false' 12 < 2 == true
// * 'caseFirst': 'upper' uppercase first, 'lower' lowercase first, 'false'(default) locale-specific.

// Intl.DateTimeFormat
// const formatter = new Intl.DateTimeFormat([locales, [options]]);
// const dateString = formatter.format(date);
// Options could contain:
// * 'localeMatcher' - locale search algorithm: 'lookup', 'best fit' (default)
// * 'formatMatcher' - format search algorithm: 'basic', 'best fit' (default)
// * 'hour12': 'true' 12-hour time format, 'false' 24-hour time format
// * 'timeZone' - local timezone: ..., 'UTC' (default)
// * 'weekday': 'narrow', 'short', 'long'
// * 'era': 'narrow', 'short', 'long'
// * 'year': '2-digit', 'numeric'/undefined (default)
// * 'month': '2-digit', 'numeric'/undefined (default), 'narrow', 'short', 'long'
// * 'day': '2-digit', 'numeric'/undefined (default)
// * 'hour': '2-digit', 'numeric'
// * 'minute': '2-digit', 'numeric'
// * 'second': '2-digit', 'numeric'
// * 'timeZoneName': 'short', 'long'
// One of those set of settings should be provided by any locale.
// * weekday year month day hour minute second
// * weekday year month day
// * year month day
// * year month
// * month day
// * hour minute second
// If a locale is not supported - the formatMatcher is used to format the output.
const ruFormatter = new Intl.DateTimeFormat('ru');
const enUsFormatter = new Intl.DateTimeFormat('en-US');
const date = new Date(2014, 11, 31, 12, 30, 0);
console.log(ruFormatter.format(date));                      // Output: 2014-12-31
console.log(enUsFormatter.format(date));                    // Output: 12/31/2014
const ruDateSpecificFormatter = new Intl.DateTimeFormat('ru', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
console.log(ruDateSpecificFormatter.format(date));          // Output: 2014 M12 31, Wed
const ruTimeSpecificFormatter = new Intl.DateTimeFormat('ru', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
console.log(ruTimeSpecificFormatter.format(date));          // Output: 12:30:00

// Intl.NumberFormat
// Is used to format numbers, currencies and percents.
// const formatter = new Intl.NumberFormat([locales, [options]]);
// formatter.format(number);
// Options list:
// * 'localeMatcher': 'lookup', 'best fit' (default)
// * 'style' - formatting style: 'percent', 'currency', 'decimal' (default)
// * 'currency' - an alphabetic currency code: one of http://www.currency-iso.org/en/home/tables/table-a1.html, example: 'USD'
// * 'currencyDisplay' - show currency as code, localized symbol or localized name: 'code', 'name', 'symbol' (default)
// * 'useGrouping' - split or not groups of a number: 'false', 'true' (default)
// * 'minimumIntegerDigits' - a minimum number of digits of the integer part: 1 to 21 (21 by default)
// * 'minimumFractionDigits' - a minimum number of digits of the fraction part: 0-20 (defaults to 0 for decimals and percents, default depends on currency code for currencies)
// * 'maximumFractionDigits' - a maximum number of digits of the fraction part: minimumFractionDigits - 20 (defaults to [max(minimumFractionDigits, 3)] for decimals,
//                              0 for percents, depends on currency code for currencies)
// * 'minimumSignificantDigits' - a minimum number of significant digits: 1-21 (1 by default)
// * 'maximumSignificantDigits' - a maximum number of significant digits: minimumSignificantDigits - 21 (minimumSignificantDigits by default)
const numberFormatter = new Intl.NumberFormat('ru');
console.log(numberFormatter.format(1234567890.123));                    // Output: 1,234,567,890.123
const threeMaxSignificantFormatter = new Intl.NumberFormat('ru', { maximumSignificantDigits: 3 });
console.log(threeMaxSignificantFormatter.format(1234567890.123));       // Output: 1,230,000,000
const gbpFormatter = new Intl.NumberFormat('ru', { style: 'currency', currency: 'GBP' });
console.log(gbpFormatter.format(1234.5));                               // Output: £ 1,234.50
const gbpMinOneFractionFormatter = new Intl.NumberFormat('ru', { style: 'currency', currency: 'GBP', minimumFractionDigits: 1 });
console.log(gbpMinOneFractionFormatter.format(1234.5));                 // Output: £ 1,234.5

// Formatting is also supported by the methods of a regular strings, numbers and dates.
// String.prototype.localeCompare(that [, locales [, options]]);                Locale-specific strings comparison.
const aString = 'ёжик';
console.log(aString.localeCompare('яблоко', 'ru'));                 // Output: -1
// Date.prototype.toLocaleString([locales [, options]]);                        // Locale-specific date formatting
const aDate = new Date(2014, 11, 31, 12, 0);
console.log(aDate.toLocaleString('ru', { year: 'numeric', month: 'long' }));            // Output: 2014 ├F3: M12┤
// Date.prototype.toLocaleDateString([locales [, options]]);                    The same as previous, but year, month, day options are enabled by default.
// Date.prototype.toLocaleTimeString([locales [, options]]);                    The same as previous, but hours, minutes, seconds options are enabled by default.
// Number.prototype.toLocaleString([locales [, options]]);                      Formats a number with locale and options.
// All those methods create the Intl object and use those methods under the hood.

// IE10 doesn't support Intl - the polyfill-library https://github.com/andyearnshaw/Intl.js could be used.


























