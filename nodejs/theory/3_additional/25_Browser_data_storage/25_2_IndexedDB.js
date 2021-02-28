'use strict';           // jshint ignore: line

// IndexedDB is a browser built-in db. Features:
// * supports some types of keys and almost any types of values
// * supports transactions
// * supports querying keys ranges and indexing
// * allows to store a larger amount of data comparing to the local storage

// IndexedDB is intended for offline applications alongside with ServiceWorkers and other powerful technologies.
// IndexedDB interface is based on the events model. There is a number of wrappers, which make possible to use Promises and await/async mechanism with IndexedDB,
// but there is a number of limitations comparing to the event-based interface.

// There could be a number of databases, but all of them exist and are accessible in the context of a particular source (protocol/domain/port combination).

// To start the IndexedDB usage the particular db should be opened.
const indexedDB = require('indexeddb');         // NodeJS implementation, not verified.
const dbName = 'dbName';
const dbVersion = 2;                            // Db version, 1 by default.
const openRequest = indexedDB.open(dbName, dbVersion);

// Version parameter is used to track db versions. If the requested db version is greater than the existing one or if the db doesn't exist - the 'upgradeneeded' event rises.
// If the requested db version is lesser than the existing one - the 'error' event rises, the current window/tab must be reloaded and stale cache should be destroyed.
// If there is an open tab with some version and the other tab tries to upgrade the db - there 'versionchange' event rises (because it's needed to close all the connections
// to the older db version before upgrading). After the 'versionchange' event if there stays a connection to the older db version - the new connection will be blocked with
// a 'blocked' event ('success' event won't be fired).
openRequest.onupgradeneeded = function(event) {
    // The db initialization or the version upgrade actions are needed.
    const db = openRequest.result;
    switch (db.version) {
        case 0:
            // Db doesn't exist - the initialization is needed.
        case 1:
            // Db version doesn't match - the upgrade is needed.
    }
};
openRequest.onerror = function(event) {
    console.error(`Error: ${openRequest.error}`);
};
openRequest.onsuccess = function(event) {
    // Event is fired after a successful db opening or after a successful upgrade/initialization.
    const db = openRequest.result;
    db.onversionchange = function(event) {
        db.close();     // To prevent the 'blocked' event to be fired.
        alert('Db version changed, please reload the page.');
    };
};
openRequest.onblocked = function(event) {
    console.log('Connection to db failed, there is an open connection to the older db version.');
};

// To delete a db:
const deleteDbRequest = indexedDB.deleteDatabase('dbName');
deleteDbRequest.onerror = function(event) { /* ... */ };
deleteDbRequest.onsuccess = function(event) { /* ... */ };

