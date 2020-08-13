'use strict';           // jshint ignore: line

// Proxy object wraps another object and intercepts/handles actions on that object. Basic syntax:
const target = {};      // Any object to wrap, including functions.
const handler = {};     // Proxy-configuration - an object with traps, i.e. methods to intercept operations on target.
const proxy = new Proxy(target, handler);
// If there is a trap for an action on a target object - the trap is being executed, otherwise - the action on the target object is being performed directly.
// A proxy behaves as a transparent wrapper is there are no traps inside handler.
proxy.test = 5;
console.log(proxy.test);        // Output: 5
console.log(target.test);       // Output: 5
for (let key in proxy) {        // Output: test                 Iteration works for a proxy
    console.log(key);
}
/*
A trap is a method with a specific name. That name corresponds to the inner method name and to the action, which is going to be intercepted:
- get                       [[Get]]                 property reading
- set                       [[Set]]                 property writing
- has                       [[HasProperty]]         using the 'in' operator
- deleteProperty            [[Delete]]              using the 'delete' operator (deleting a property)
- apply                     [[Call]]                function execution
- construct                 [[Construct]]           using the 'new' operator
- getPrototypeOf            [[GetPrototypeOf]]      using the 'Object.getPrototypeOf'
- setPrototypeOf            [[SetPrototypeOf]]      using the 'Object.setPrototypeOf'
- isExtensible              [[IsExtensible]]        using the 'Object.isExtensible'
- preventExtensions         [[PreventExtensions]]   using the 'Object.preventExtensions'
- defineProperty            [[DefineOwnProperty]]   using the 'Object.defineProperty'/'Object.defineProperties'
- getOwnPropertyDescriptor  [[GetOwnProperty]]      using the 'Object.getOwnPropertyDescriptor' (for...in, Object.keys/values/entries)
- ownKeys                   [[OwnPropertyKeys]]     using the 'Object.getOwnPropertyNames'/'Object.getOwnPropertySymbols' (for...in, Object.keys/values/entries)
Inner methods couldn't be accessed directly (except Reflect - see below).
All those traps should follow the spec https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots to be used.
Different traps have different limitations according to the spec:
- set/delete traps should return true if the value was actually written/deleted, false otherwise
- getPrototypeOf trap should return the same value as the Object.getPrototypeOf method, called on the wrapped object.
- ... see the spec
 */

// It's highly recommended to overwrite the original (wrapped) object with a Proxy everywhere to avoid a confusion while coding.

// A 'get' trap syntax: get(target, property, receiver). Target - wrapped object, property - a property name, receiver - the 'this' value of a getter (if exists) of the property.
// A 'get' trap use case - implementation of the default value of an array.
let numbers = [ 1, 2, 3 ];
numbers = new Proxy(numbers, {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return 0;
        }
    }
});
console.log(numbers[123]);                  // Output: 0


// Another 'get' trap use case - returning the original word from dictionary if there is no corresponding entry.
let dictionary = {
    'Hello': 'Hola',
    'Bye': 'Adios'
};
dictionary = new Proxy(dictionary, {
    get(target, phrase) {
        if (phrase in dictionary) {
            return target[phrase];
        } else {
            return phrase;
        }
    }
});
console.log(dictionary['Proxy']);           // Output: Proxy


// A 'set' trap syntax: set(target, property, value, receiver).
// A 'set' trap use case - validation of values being added to the array - NaNs are being skipped with an error.
// Note that a proxy doesn't change the array's behavior - length is being applied correctly, push()/unshift() methods are being intercepted and work correctly.
let numbersOnly = [];
numbersOnly = new Proxy(numbersOnly, {
    set(target, property, value) {
        if (typeof value === 'number') {
            target[property] = value;
            return true;                    // boolean return value is required by the spec. Absent and falsy return values both lead to the TypeError.
        } else {
            return false;
        }
    }
});
try {
    numbersOnly.push('NaN');
} catch(error) {
    console.log(error);                     // TypeError: 'set' on proxy: trap returned falsish for property '0'
    console.log(numbersOnly);               // Output: []
}


// Iterating by [ownKeys] and [getOwnPropertyDescriptor] traps.
// Most methods, used to iterate over an object's properties (Object.keys, for..in, ...), use inner method [[OwnPropertyKeys]] under the hood.
// Those iteration methods have differences, but every one of them starts with the list returned by [[OwnPropertyKeys]]. Differences:
// * Object.getOwnPropertyNames() - returns non-Symbol keys
// * Object.getOwnPropertySymbols() - returns Symbol keys
// * Object.keys()/.values() - return non-Symbol keys/values, having enumerable=true flag in theirs descriptors
// * for..in - cycles through non-Symbol keys, having enumerable=true flag, and prototype keys
// [ownKeys] trap intercepts that inner method.
// An example to skip keys, starting with "_" symbol, while iterating the object's keys with for..in, Object.keys() and Object.values():
let user = {
    name: 'John',
    age: 30,
    _password: '***'
};
user = new Proxy(user, {
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
});
for (let key in user) {
    console.log(key);                           // Output: name  /n   age
}
console.log(Object.keys(user));                 // Output: [ 'name', 'age' ]
console.log(Object.values(user));               // Output: [ 'John', 30 ]
// Custom keys, returned by [ownKeys], are not visible to Object.keys()/.values() and for..in, because the are not enumerable by default.
// To overcome that limitation the [getOwnPropertyDescriptor] trap could be used.
// An example to override keys by [ownKeys] property with the help of [getOwnPropertyDescriptor] property.
let user1 = { };
user1 = new Proxy(user1, {
    ownKeys(target) {
        return ['a', 'b', 'c'];
    },
    getOwnPropertyDescriptor(target, p) {
        return {
            enumerable: true,
            configurable: true
        };
    }
});
console.log(Object.keys(user1));                // Output: [ 'a', 'b', 'c' ]


// An example of [get], [set], [deleteProperty] and [ownKeys] traps usage to make a field private (to limit access to those fields from outside).
let user2 = {
    name: 'John',
    _password: '***',
    checkPassword(value) {
        return value === this._password;
    }
};
user2 = new Proxy(user2, {
    get(target, p, receiver) {
        if (p.startsWith('_')) {
            throw new Error('Access denied');
        } else {
            // That check is needed for user2.checkPassword() to work, otherwise inner checkPassword() logic wouldn't have access to the '_password' field too.
            let value = target[p];
            return typeof value === 'function' ? value.bind(target) : value;
        }
    },
    set(target, p, value, receiver) {
        if (p.startsWith('_')) {
            throw new Error('Access denied');
        } else {
            target[p] = value;
            return true;
        }
    },
    deleteProperty(target, p) {
        if (p.startsWith('_')) {
            throw new Error('Access denied');
        } else {
            delete target[p];
            return true;
        }
    },
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
});
try {
    console.log(user2._password);
} catch(error) {
    console.log(error.message);                     // Output: Access denied
}
try {
    user2._password = 'asd';
} catch(error) {
    console.log(error.message);                     // Output: Access denied
}
try {
    delete user2._password;
} catch(error) {
    console.log(error.message);                     // Output: Access denied
}
console.log(Object.keys(user2));                    // Output: [ 'name', 'checkPassword' ]


// An example of [has] trap to implement a value in a range check.
let range = {
    start: 1,
    end: 10
};
range = new Proxy(range, {
    has(target, p) {
        return p >= target.start && p <= target.end;
    }
});
console.log(5 in range);                            // Output: true
console.log(50 in range);                           // Output: false

// An example of [apply] trap usage to capture the proxy-function call. The function-implementation of a delay-function-wrapper:
function delay(originalFunction, delayMs) {
    return function() {
        setTimeout(() => originalFunction.apply(this, arguments), delayMs);
    };
}
// That wrapper-function work, but a user has no access to the originalFunction's properties through the wrapper:
function sayHi(user) {
    console.log(`Hi, ${user}`);
}
console.log(sayHi.length);                              // Output: 1                    Number of sayHi()'s arguments.
const wrappedSayHi = delay(sayHi, 1);
console.log(wrappedSayHi.length);                       // Output: 0                    Number of wrappedSayHi()'s arguments.
wrappedSayHi('John');                                   // Output: Hi, John             Wrapper works.
// To retain access to the originalFunction's properties the [apply] trap could be used.
function delayWithApply(originalFunction, delayMs) {
    return new Proxy(originalFunction, {
        apply(target, thisArg, argArray) {
            setTimeout(() => target.apply(thisArg, argArray), delayMs);
        }
    });
}
const wrappedWithApplySayHi = delayWithApply(sayHi, 1);
console.log(wrappedWithApplySayHi.length);              // Output: 1                    All types of access to the Proxy are forwarded to the original function.
wrappedWithApplySayHi('John');                          // Output: Hi, John             Wrapper works.


// Reflect is a built-in object used to simplify Proxy creation.
// Reflect has access to the inner methods like [[Get]], [[Set]] and others. Reflect object's methods are minimal wrappers around those inner methods.
// Here comes a table of examples of the Reflect usage (operation - Reflect method - Inner method):
// obj[prop]                Reflect.get(obj, prop)                  [[Get]]
// obj[prop] = value        Reflect.set(obj, prop, value)           [[Set]]
// delete obj[prop]         Reflect.deleteProperty(obj, prop)       [[Delete]]
// new F(value)             Reflect.construct(F, value)             [[Construct]]
// ...
// Actually, every single inner method, captured by a Proxy, has according Reflect object's method with the same name and arguments.
// That is why a Reflect could be used to forward the operation to the original object, there is no need to implement operation explicitly:
let user3 = {
    name: 'John'
};
user3 = new Proxy(user3, {
    get(target, p, receiver) {
        console.log(`GET ${p}`);
        return Reflect.get(target, p,receiver);
    },
    set(target, p, value, receiver) {
        console.log(`SET ${p}`);
        return Reflect.set(target, p, value, receiver);
    }
});
const aName = user3.name;           // Output:  GET name
user3.name = 'Bill';                // Output:  SET name

// Reflect could be used to implement a correct Proxy access to a getter in case of prototyping.
const user4 = {
    _name: 'John',
    get name() {
        return this._name;
    }
};
const user4ProxyWithoutPrototypeGetterSupport = new Proxy(user4, {
    get(target, p, receiver) {
        return target[p];
    }
});
const notValidAdmin = {
    __proto__: user4ProxyWithoutPrototypeGetterSupport,
    _name: 'Admin'
};
console.log(notValidAdmin.name);            // Output: John                 Not Admin! 'this' context is not as expected, it's a user4 object.
const user4ProxyWithPrototypeGetterSupport = new Proxy(user4, {
    get(target, p, receiver) {
        return Reflect.get(target, p, receiver);            // receiver is used to pass a correct context to the original function.
        // return Reflect.get(...arguments);                // alternative shortcut usage - arguments of a Proxy method and according Reflect method always match.
    }
});
const validAdmin = {
    __proto__: user4ProxyWithPrototypeGetterSupport,
    _name: 'Admin'
};
console.log(validAdmin.name);               // Output: Admin


    // Proxy limitations.

// Built-in objects: built-in slots.
// Many built-in objects (Map, Set, Date, Promise, ...) use built-in clots to store those data. Built-in slots are "inner properties" like Map's [[MapData]], which
// are visible only to those objects and which are accessed directly by such object's built-in methods, bypassing [[Get]]/[[Set]] methods.
// That makes impossible to intercept those methods by the regular proxying.
const map1 = new Map();
const unworkableProxy = new Proxy(map1, {});
// unworkableProxy.set('test', 1);                      // TypeError: Method Map.prototype.set called on incompatible receiver [object Object]

// To make interception possible - the special technic should be used.
const workableProxy = new Proxy(map1, {
    get(target, p, receiver) {
        const value = Reflect.get(...arguments);
        return typeof value === 'function' ? value.bind(target) : value;
    }
});
workableProxy.set('test', 1);
console.log(workableProxy.get('test'));                 // Output: 1
// Array object is an exception - it doesn't use slots. There is no need to provide a special handler to proxy an object of the Array type.

// Private fields.
// The same problem is actual for private fields, which are being stored in built-in slots (js doesn't use [[Get]]/[[Set]] methods to access them).
class PrivateUser {
    #name = 'Guest';            // jshint ignore: line

    getName() {
        return this.#name;      // jshint ignore: line
    }
}
const privateUser = new PrivateUser();
const unworkablePrivateUserProxy = new Proxy(privateUser, {});
// console.log(unworkablePrivateUserProxy.getName());           // TypeError: Cannot read private member #name from an object whose class did not declare it
// To solve that problem the correct context should be provided to the Proxy's 'get' trap.
const workablePrivateUserProxy = new Proxy(privateUser, {
    get(target, p, receiver) {
        const value = Reflect.get(...arguments);
        return typeof value === 'function' ? value.bind(target) : value;
    }
});
console.log(workablePrivateUserProxy.getName());                // Output: Guest

// The method of solving 2 problems above has a serious drawback - method is being provided with the original object, which could be passed somewhere else. That
// could break the functionality of proxying.

// Proxy and proxied object are distinct objects. If original object is used as a key of a collection - it couldn't be located by it's proxy.
const allUsers = new Set();
class User {
    constructor(name) {
        this.name = name;
        allUsers.add(this);
    }
}
const user5 = new User('John');
console.log(allUsers.has(user5));                   // Output: true
const user5Proxy = new Proxy(user5, {});
console.log(allUsers.has(user5Proxy));              // Output: false

// Proxy can't intercept the strict equality check '==='. Every method, using a strict equality check, will deffer the proxy and it's original object.
