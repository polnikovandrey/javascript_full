'use strict';           // jshint ignore: line

// Javascript has built-in support for public and private methods/properties. Protected methods/properties (accessible through inheritance) could be emulated.

// Protected property name should start with an underscore '_' by convention.
class WithProtectedProperties {
    constructor() {
        this._protectedProp = 0;                 // By convention this property shouldn't be accessed directly.
        this._protectedReadOnlyProp = 777;
    }
    get protectedProp() {
        return this._protectedProp;
    }
    set protectedProp(value) {                   // Setter is used to modify and control _protectedProp's value.
        if (value < 0) {
            throw new Error("Below zero!");
        }
        this._protectedProp = value;
    }
    get protectedReadOnlyProp() {                // _protectedReadOnlyProp is readonly because it has a getter methods only, there is no corresponding setter.
        return this._protectedReadOnlyProp;
    }
}
// new WithProtectedProperties().aPrivateProp = -1;             // Error: Below zero!
new WithProtectedProperties().protectedProp = 1;
// new WithProtectedProperties().aPrivateReadOnlyProp = 8;      // TypeError: Cannot set property aPrivateReadOnlyProp of #<WithProtectedProperties> which has only a getter

// Note: common functions-methods could be used instead of getters/setters and they are more agile (could have arbitrary number of arguments).
// It's suggested to use functions-methods instead of getters/setters.
class WithProtectedProp {
    constructor() {
        this._protectedProp = 0;
    }
    getProtectedProp() {
        return this._protectedProp;
    }
    setProtectedProp(value) {
        this._protectedProp = value;
    }
}

/*
There is a new syntax in javascript - a property or a method name, starting with a '#' symbol are called private. They are actually accessible only within a class itself
and are not directly accessible even by extending classes. The error is thrown if there is an attempt to access such property/method from the outside of a class.
This syntax is not widely supported yet, but polyfill is available and it should become a part of the specification soon.
There could be two distinct properties/methods with names with and without '#'.
Private properties/methods could't be accessed with an 'object['#propName']' syntax.
class WithPrivatePropertyAndMethod {
    #privateProp = 0;
    #privateMethod() { }
}
*/
