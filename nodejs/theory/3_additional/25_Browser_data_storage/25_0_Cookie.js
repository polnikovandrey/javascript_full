'use strict';           // jshint ignore: line

// Cookies are are part of HTTP protocol specification https://tools.ietf.org/html/rfc6265.
// Cookies are a tiny strings of date, which are stored by the browser itself.

// Cookies are added by a server with a 'Set-Cookie' response header.
// Cookies are added upon almost every proceeding request to the same domain with a 'Cookie' request header.

// The most usual use case is an authentication:
// 1. When entering a site the server sends 'Set-Cookie' with the unique "session identifier" value.
// 2. On each proceeding call to the server a browser supports a request with a 'Cookie' header to identify the session.

// To access cookies on the client the [document.cookie] property could be used:
console.log(document.cookie);               // Output: cookie1=value1; cookie2=value2; ...

// To set a cookie the [document.cookie] property could also be used. Note: that property is actually a getter/setter, so the input is being filtered and only the
// passed cookie will be added/set, the rest will remain the same.
document.cookie = 'user=John';      // Only 'user=...' cookies will be updated.

// To ensure cookies correctness encoding should be used to handle special symbols (e.g. spaces):
const cookieName = 'my name';
const cookieValue = 'John Smith';
document.cookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue);
console.log(document.cookie);           // Output: ...; my%20name=John%20Smith; ...

// There are some limitations:
// * a cookie name/value pair must be limited to 4kb.
// * the maximum number of cookie name/value pairs per a domain is browser-dependent and usually is limited to 20+.

// There is a number of service (settings) cookies, which are important and must be in place.
// *    path=/mypath        URL absolute path-prefix. Cookies will be accessible only to pages with that path. The actual cookie path is used by default - a cookie from the
//      path=/admin path is accessible to the /admin and /admin/something, but not to the /home or /adminpage. The root path (/) is usually being used for a cookie to
//      be accessible by all site pages/paths.
// *    domain=site.com     By default cookies are accessible only to the domain, which sets the cookie (subdomains have no access to those cookies). To make cookies accessible
//      to subdomains - the 'domain:' cookie could be used. In that case cookies will be accessible by subdomain.site.com also. There is no possibility to make a cookie
//      accessible to another domain.
// *    expires=Tue, 19 Jan 2038 03:14:07 GMT       By default all cookies are supposed to be "session cookies", which means they are deleted upon browser closing. To
//      change that behavior the "expires" cookie could be used. To set the correct date the date.toUTCString() method could be used. If the cookie expires or the date
//      was initially set with expired date - the browser deletes that cookie.
// *    max-age: 3600       Another method to change the cookie's expiration behavior. The value supported is a number of seconds for a cookie to live. If the value is 0
//      or negative - the browser deletes that cookie.
// *    secure;     By default a cookie set with https protocol is also available for the same domain on http protocol. To prevent that kind of access - the 'secure;' cookie
//      must be set (without a value).
// *    samesite;/samesite=strict;/samesite=lax;    Is used to prevent XSRF-attacks (Cross-Site Request Forgery). That kind of attacks means sending the request to some site
//      with correct cookies by another evil web-page request. Without a value the meaning is the same as 'strict'. If a 'strict' value is used - all cookies are allowed
//      only for the source site (which set those cookies), all requests from another sources are being performed without cookies. If a 'lax' value is used - the behavior
//      is the same as for 'strict', but cookies from other sources are allowed if 2 conditions are satisfied:
//          - the request method is safe (readonly), e.g. GET (but not POST). The full list of safe protocols is in rfc https://tools.ietf.org/html/rfc7231.
//          - the request changes the topmost level of navigation (changes url of the browser's address input). IFrame request are denied (not topmost level), as like as
//          javascript requests (do not change the navigation). Old browsers ignore 'lax' value.
// *    httpOnly        That cookie could be set only by a server alongside with the 'Set-Cookie' header. That cookie will become invisible to the client - document.cookie
//      doesn't see that cookie and couldn't change it.

// There is a number of libraries to handle cookies conveniently (get/set/delete a cookie with correct encoding/decoding).
