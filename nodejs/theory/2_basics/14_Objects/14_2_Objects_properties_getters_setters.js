'use strict';           // jshint ignore: line

/*
There are 2 types of object properties:
1. data properties
2. accessor properties
Accessor properties are functions, used to get and set values. But they look like properties in the outer code. It's something like virtual properties.
 */

// Getters and setters
const obj = {
    get propName() {
        // Is used implicitly when obj.propName is read.
    },
    set propName(value) {
        // Is used implicitly when obj.propName is set.
    }
};
const user = {
    firstName: 'John',
    lastName: 'Smith',
    get shortName() {
        return `${this.firstName.substr(0, 1)}.${this.lastName.substr(0, 1)}.`;
    },
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(fullName) {
        [ this.firstName, this.lastName ] = fullName.split(' ');
    }
};
console.log(user.shortName);            // Output: J.S.           Note that fullName() getter is not executed explicitly as a function, it looks like data-property instead.
console.log(user.fullName);             // Output: John Smith
// user.shortName = 'B.G.';             // TypeError: Cannot set property shortName of #<Object> which has only a getter         Setter was not defined.
user.fullName = 'Boris Johnson';
console.log(user);                      // Output: { firstName: 'Boris', lastName: 'Johnson', shortName: [Getter], fullName: [Getter/Setter] }

// Accessor properties descriptors.
/*
 Descriptors of accessor properties could have:
 1. get() function, used to read a value
 2. set(value) function, used to set a value
 3. enumerable property, same meaning as in data property descriptor
 4. configurable property, same meaning as in data property descriptor
 So, comparing to data property descriptors, accessor properties descriptors have additional get() and set() descriptors, but do not have value and writable descriptors.
 */
const anotherUser = {
    firstName: 'Bill',
    lastName: 'Gates'
};
Object.defineProperty(anotherUser, 'fullName', {
    get() {
        return `${this.firstName} ${this.lastName}`;
    },
    set(fullName) {
        [ this.firstName, this.lastName ] = fullName.split(' ');
    }
});
console.log(anotherUser.fullName);                              // Output: Bill Gates
console.log(anotherUser);                                       // Output: { firstName: 'Bill', lastName: 'Gates' }

// Property could be data property or accessor property, not both. So it could have only suitable descriptor flags.
// Object.defineProperty(anotherUser, 'shortName', {
//     get() {
//         return `${this.firstName.substr(0, 1)}.${this.lastName.substr(0, 1)}.`;
//     },
//     value: 'B.G.'
// });                                  // TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>


// Smart getters and setters.
// Getters and setters could be used as wrappers of an existing inner property, to have better control over property modifications.
// They are also used for objects compatibility - for example replaced property could be emulated with a getter, which calculates the result using a new property.
// There is a convention not to use properties starting with '_' symbol directly outside of an object.
// Technically such properties could be accessed from outside, but it is restricted by the convention.
const longNameUser = {
    get name() {
        return this._name;
    },
    set name(name) {
        if (name.length < 4) {
            console.log(`The name ${name} is too short!`);
            return;
        }
        this._name = name;
    }
};
longNameUser.name = 'Vanessa';
console.log(longNameUser.name);                                 // Output: Vanessa
longNameUser.name = 'May';                                      // Output: The name May is too short!
longNameUser._name = 'I do not respect conventions';            // Legal, but restricted by conventions.
console.log(longNameUser.name);                                 // Output: I do not respect conventions