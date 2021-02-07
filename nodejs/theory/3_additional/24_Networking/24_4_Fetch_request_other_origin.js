'use strict';           // jshint ignore: line

// A request to another origin (the combination protocol/domain/port) is denied by default. To be available a remote host should provide special headers in the response.
// That policy is called a CORS (Cross-Origin Resource Sharing).

// JSONP - JSON with padding. That was a mean to bypass CORS. A JSONP request contains a callback parameter with a name of a local function, which handle the remote data.
// Upon request the remote host generates a script, which calls acquired function, passing a data as arguments of that function. That script is returned inside a response
// and is being called locally.

// There are 2 types of requests:
// * simple. One of GET/POST/HEAD methods, only Accept/Accept-Language/Content-Language/Content-Type headers are allowed. The Content-Type could be one of
// application/x-www-form-urlencoded, multipart/form-data or text/plain only.
// * complex. Any not-simple request.
// The main difference between a simple and a complex request is the fact that a simple one could be performed with the help of <form> or <script> without any additional
// methods. Even old servers support simple requests. If a complex request should be performed, a preliminary request (preflight request) is performed and a server
// should send an explicit response allowing a complex request. Otherwise the complex request will not occur.

// Simple request CORS.
// Any request to another origin includes the 'Origin' header (protocol/host/port value):
//      GET /request
//      Host: anywhere.com
//      Origin: https://javascript.info
// A remote server could check that header and could allow the request with a special header 'Access-Control-Allow-Origin' with a value of 'Origin' request header or '*'.
// Otherwise a request finishes with an error.
//      200 OK
//      Content-Type:text/html; charset=UTF-8
//      Access-Control-Allow-Origin: https://javascript.info
// A browser is responsible for passing a correct 'Origin' value and for checking the 'Access-Control-Allow-Origin' value during response resolution.

// Only a limited set of response headers could be accessed by receiving side: Cache-Control/Content-Language/Content-Type/Expires/Last-Modified/Pragma.
// Note: Content-Length header access is denied by default.
// To access any other header a response should contain a special header 'Access-Control-Expose-Headers' with the list of accessible headers.
//      200 OK
//      Content-Type:text/html; charset=UTF-8
//      Content-Length: 12345
//      API-Key: 2c9de507f2c54aa1
//      Access-Control-Allow-Origin: https://javascript.info
//      Access-Control-Expose-Headers: Content-Length,API-Key

// Before a complex request a browser performs a special preflight request to ensure that remote server could handle complex requests. A preflight request
// has no body, it uses an OPTION method and contains two headers:
// * Access-Control-Request-Method - the value is a name of the request method
// * Access-Control-Request-Headers - a comma-separated list of complex headers
// To allow a complex request a server should respond with the 200 status, without a body and with those headers:
// * Access-Control-Allow-Methods - a comma-separated list of allowed methods
// * Access-Control-Allow-Headers - a comma-separated list of allowed headers
// * Access-Control-Max-Age - an optional header with a value of seconds to cache that response (browser could skip a preflight requests while cache is actual).

// Javascript requests do not contain any credentials (domain cookies, HTTP-authentication headers) by default. Regular http-requests include all domain cookies in a request.
// To include authentication data fetch() should contain a credentials option:
// fetch('http://some.site', { credentials: "include" });       // Request will contain http://some.site cookies.
// To allow request with authentication a server should respond with a special header 'Access-Control-Allow-Credentials: true' (alongside with 'Access-Control-Allow-Origin', which
// is a required header upon every response). If a response contains 'Access-Control-Allow-Credentials: true' header, the 'Access-Control-Allow-Origin' value should be
// the explicit request 'Origin' header value, the '*' value is denied.
