'use strict';           // jshint ignore: line

// The built-in URL class could be used to create complex urls, as well as to parse string URL addresses.

// Most js networking objects and methods (fetch(), XMLHttpRequest, ...) take a string url as an argument. And most of them could use a URL object instead of a string.

// The constructor:
// new URL(url, [base]);
// * [url] - full address or just a path in case when a [base] argument is provided.
// * [base] - optional argument - base-url.

const url1 = new URL('https://javascript.info/profile/admin');
const url2 = new URL('/profile/admin', 'https://javascript.info');
console.log(url1.href);     // Output: https://javascript.info/profile/admin
console.log(url2.href);     // Output: https://javascript.info/profile/admin
// Another URL object could be used to create a new URL object.
const url3 = new URL('tester?q=1#zzz', url2);

// A URL object is usually used to parse a url and get it's parts. See url.png cheatsheet to learn parts of a url.
console.log(url3.href);         // Output: https://javascript.info/profile/tester?q=1#zzz
console.log(url3.protocol);     // Output: https:
console.log(url3.host);         // Output: javascript.info
console.log(url3.pathname);     // Output: /profile/tester
console.log(url3.search);       // Output: ?q=1
console.log(url3.hash);         // Output: #zzz

// [user] and a [password] properties could be used as well.
const url4 = new URL('http://admin:pass@site.com');
console.log(url4.username);     // Output: admin
console.log(url4.password);     // Output: pass

// To create a url with search parameters (?a=1&b=2...) - a URL.searchParams property could be used. It has a value of the URLSearchParams object,
// which has convenient methods to manage search parameters, conforming search parameters encoding rules for non-latin characters (https://tools.ietf.org/html/rfc3986):
// * append(name, value)
// * delete(name)
// * get(name)
// * getAll(name)
// * has(name)
// * set(name, value)
// * sort()
// A URLSearchParams object is iterable (like a Map object) and could be iterated with the for..of cycle.

const url5 = new URL('https://google.com/search');
url5.searchParams.set('q', 'test me!');
console.log(url5.href);     // Output: https://google.com/search?q=test+me%21
url5.searchParams.set('tbs', 'qdr:y');
console.log(url5.href);     // Output: https://google.com/search?q=test+me%21&tbs=qdr%3Ay
for (let [name, value] of url5.searchParams) {
    console.log(`${name}=${value}`);        // Output: q=test me! /n tbs=qdr:y
}

// To handle encoding with a string urls there is a set of built-in methods:
// * encodeURI()
// * decodeURI()
// * encodeURIComponent()
// * decodeURIComponent()
// There is a reason why ...Component methods are needed - the rules for different components differ. E.g. :?=&# symbols are allowed in url, but denied in parameters.
// So encodeURI() method encodes only symbols denied in url. And encodeURIComponent() additionally encodes #, $, &, +, ,, /, :, ;, =, ? and @ symbols.
const url6 = encodeURI('http://site.com/привет');
console.log(url6);          // Output: http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
const musicParam = encodeURIComponent('Rock&Roll');         // Note - encodeURI() doesn't handle & symbol.
console.log(musicParam);    // Output: Rock%26Roll
const url7 = `https://google.com/search?q=${musicParam}`;
console.log(url7);          // Output: https://google.com/search?q=Rock%26Roll

// There is a difference between URL/URLSearchParams and encode*() encoding. URL/URLSearchParams conform the newly https://tools.ietf.org/html/rfc3986, while
// encode*() supports older https://www.ietf.org/rfc/rfc2396.txt. There are some differences, e.g. the older one doesn't support IPv6 addresses.