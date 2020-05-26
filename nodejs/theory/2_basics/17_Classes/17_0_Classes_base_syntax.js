'use strict';           // jshint ignore: line

/*
In OOP a class is an extendable template of code for objects creation, which sets the starting values (properties) and methods implementation in those objects.
'new function' constructor was used for objects creation before classes where implemented in js. Nowadays a 'class' statement could be used for that. Base syntax:
class MyClass {
    prop = value;               // Optional properties, see below.
    constructor() { ... }       // An optional constructor method is called automatically, is intended to initialize an object.
    aMethod() { ... }           // Note: unlike object literals, class'es methods shouldn't be separated by commas.
    get something(...) { ... }
    set something(...) { ... }
    [Symbol.iterator]() { ... } // Method with a computed name (in particular, a Symbol is being used as an example).
}
const myClassObject = new MyClass();        // constructor() is called automatically
 */
class User {
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log(`Hello, ${this.name}`);
    }
}
const aUser = new User('John');
aUser.greet();                              // Output: Hello, John
console.log(typeof User);                   // Output: function         Note: class is not a separate type, it is in fact a specific method to declare a function.
/*
As soon as a class is a function, under the hood a class declaration does the following:
1. Declares a function with the name of a class. Class constructor's code becomes a function's code (or empty code if there is no constructor method).
2. Class'es prototype is supported with all class'es methods (ClassName.prototype.aMethod = ...).
 */
console.log(User.prototype.constructor === User);           // Output: true         Class prototype's constructor property is a class itself.
console.log(User.prototype.greet === aUser.greet);          // Output: true         Class prototype contains all the class'es methods.
console.log(Object.getOwnPropertyNames(User.prototype));    // Output: [ 'constructor', 'greet' ]

// A class could be rewritten using a function syntax.
function FuncUser(name) {       // FuncUser.prototype.constructor has a default value, there is no need to set it manually.
    this.name = name;
}
FuncUser.prototype.greet = function() {
    console.log(`Hello, ${this.name}`);
};
const aFuncUser = new FuncUser('Shaun');
aFuncUser.greet();                                  // Output: Hello, Shaun

/*
But class syntax is not just a code sugar for declaring a constructor-function. A class declaration has some significant differences from a constructor-function method:
1. Functions, created by class declarations, has special inner property [[FunctionKind]]:"classConstructor".
2. Unlike constructor-functions classes could be used with a 'new' operator only.
3. Most js engines provide functions, created with the help of a class declaration, with a 'class ...' toString implementation.
4. Class methods are declared as non-enumerable by default. That is a helpful feature, most times it's appropriate for 'for..in' cycle to skip object's methods.
5. Classes always 'use strict' implicitly inside.
*/
// User();                                          // TypeError: Class constructor User cannot be invoked without 'new'
console.log(User);                                  // Output: [Function: User]         in NodeJs, 'class User { ... }' in most browsers

// As like as a function expression, a class expression could be declared inside another declaration, it also could be passed, returned, set as a value.
const UserClassExpression = class {
    greet() {
        console.log("Hi");
    }
};

// As like as a named function expression, a named class expression could be used. In that case, a name of an expression is visible only inside a class code itself.
const UserNamedClassExpression = class NamedClassExpression {
    printClassExpressionName() {
        console.log(NamedClassExpression);
    }
};
new UserNamedClassExpression().printClassExpressionName();              // Output: [Function: NamedClassExpression]

// Classes could be create dynamically.
function makeAClass(value) {
    return class {
        output() {
            console.log(value);
        }
    };
}
const AClass = makeAClass('Hi');
new AClass().output();                                                  // Output: Hi

// Class declaration could contain computed propertied, getters and setters.
class HasComputedPropertiesNGettersSetters {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    ['say' + 'Hi']() {
        console.log('Hi');
    }
}
new HasComputedPropertiesNGettersSetters('aName').sayHi();                          // Output: Hi           A computed property usage.
// Under the hood getters and setters are being declared in a such way:
Object.defineProperties(HasComputedPropertiesNGettersSetters.prototype, {
    name: {
        get() {
            return this._name;
        },
        set(value) {
            this._name = value;
        }
    }
});

// Classes could have properties. In older js versions a polyfill should be used to use a class properties.
// Not usable in NodeJs. Unlike methods, properties are stored inside of an object itself (not inside of a prototype).
// Those properties are being created right after a 'new' operator call and before a constructor execution.
/*
class WithAProperty {
    aProperty = 'aValue';
    output() {
        console.log(this.aProperty);
    }
}
 */