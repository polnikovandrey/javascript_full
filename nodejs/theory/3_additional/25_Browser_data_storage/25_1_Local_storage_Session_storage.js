'use strict';           // jshint ignore: line

// Both local and session storages are intended to store key/value pairs in a browser.

// Unlike cookies, storage data is not being sent with each request. So, the limitation on storage data is much less restrictive - minimum 2mb by default and could
// be made larger changing the browser settings.
// Unlike cookies, server couldn't change storage data value directly.
// Storage is linked to the protocol/domain/port. The access from another protocol/domain/port combination is denied.

// Local and session storages have the same set of methods/properties:
// * setItem(key, value)
// * getItem(key)
// * removeItem(key)
// * clear()
// * key(index)
// * length

// Local storage is the same and accessible for all browser tabs and windows of the same source (protocol/domain/port combination).
// Local storage stays valid and accessible even after a browser or OS restart.
localStorage.setItem('test1', 1);
localStorage.test2 = 2;
localStorage.removeItem('test1');
delete localStorage.test2;
// In spite of the fact that keys could be accessed directly (without methods) - that is not recommended. The key name could be inappropriate (e.g. length) and
// the method could handle that with an error. Another reason - methods fire 'storage' event upon storage modification, direct write doesn't.
// Storages are not iterable objects, but could be iterated as a common array object:
for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.getItem(localStorage.key(i)));
}
// for ... in ... cycle could also be used, but it also iterates built-in properties (getItem, setItem, ...), which must be filtered with hasOwnProperty field.
for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
        continue;
    }
    console.log(key);
}
// Or an Object.keys() method could be used to cycle, it ignores prototype's properties.
for (let key of Object.keys(localStorage)) {
    console.log(key);
}

// Storages store all keys and values as Strings. Any non-string value is being cast to a String.
// JSON could be used to store objects:
localStorage.setItem('user', JSON.stringify({name: 'John'}));
console.log(JSON.parse(localStorage.getItem('user')).name);

// It's possible to transform all the storage to a JSON (e.g. to debug a storage):
console.log(JSON.stringify(localStorage, null, 2));


// Session storage is accessible only to the current browser tab. Another tab, even with the same source, will have a distinct storage. The tab itself and all iframes
// of that tab share the same storage if the source of the iframe matches the tab.
// Session storage stays valid and accessible even after a page reload (but not after the tab was closed and opened again).

// 'storage' event. It's fired for all Window objects, which have access to that particular storage. That fact alongside with the event.storageArea object passing makes
// possible cross-tab and cross-window communication. There is a special [Broadcast channel API] in modern browsers, which is intended for cross-window communication and
// is more capable. But that API support is limited and polyfills use localStorage under the hood to emulate that mechanism.
window.onstorage = function(event) {
    console.log(event.key);         // The key, which was changed (null after clear()).
    console.log(event.oldValue);    // null if the key is new.
    console.log(event.newValue);    // null if the key was removed.
    console.log(event.url);         // Url of the document, which performed the key modification.
    console.log(event.storageArea); // localStorage or sessionStorage object.
};