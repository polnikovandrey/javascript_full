'use strict';           // jshint ignore: line

class A {
    constructor(name) {
        this.name = name;
    }
    methodA() {
        console.log(this.name);
    }
}
class B extends A { }                                       // 'extends' sets A as a prototype of B's prototype.
console.log(B.prototype.__proto__ === A.prototype);         // Output: true
console.log(new B().__proto__.__proto__ === A.prototype);   // Output: true
console.log(new B().methodA === A.prototype.methodA);       // Output: true
new B('B').methodA();                                 // Output: B


function f(phrase) {
    return class {
        sayPhrase() {
            console.log(phrase);
        }
    };
}
class C extends f("Hello") { }                    // Any expression after 'extends' could be used.
new C().sayPhrase();                                    // Output: Hello

class D extends A {
    constructor(name, age) {
        super(name);                                    // super(args) could be used to access a base constructor
        this.age = age;
    }
    methodA() {
        super.methodA();                                // super.method(args) could be used to access a base method
        console.log(this.age);
    }
    methodB() {
        // Arrow functions have both 'this' and 'super', but they lead to the outer class's method.
        setTimeout(() => this.methodA(), 1000);         // Output: D
        setTimeout(() => super.methodA(), 1000);        // Output: D \n 10
        // Anonymous functions have no 'super'
        setTimeout(function() {
            // super.methodA();
        }, 1000);
    }
}
new D('D', 10).methodA();                       // Output: D /n 10

class E extends A {
    constructor(...args) {                  // This constructor is generated automatically if there is no any explicit constructor.
        super(args);
    }
}

/*
Technically there is a difference between an extended class's constructor function and all other functions. Derived constructor function is marked with a
[[ConstructorKind]]:"derived" property under the hood. Any constructor implicitly initializes 'this' value at the beginning of execution. Derived constructor
does'n - it expects a parent-class to do so. So, any derived constructor MUST call 'super()' before trying to access 'this' object.
 */

/*
Each method has a [[HomeObject]] implicit property with a value of the containing object. The value of a [[HomeObject]] could not be changed. The value
is used for defining a context of execution when 'super.method(...)' is used. Unlike other methods, methods with a 'super.method(...)' call inside couldn't
be borrowed by other objects, because the context of execution stays the same.
 */
const aF = {
    methodA() {
        console.log("aF");
    }
};
const aG = {
    __proto__: aF,
    methodA() {
        super.methodA();
    }
};
const aH = {
    methodA() {
        console.log("aH");
    }
};
const aI = {
    __proto__: aH,
    methodA: aG.methodA
};
// Note: aF's method is used instead of aH prototype's, because there is a 'super.methodA()' inside aG.methodA() and aG.methodA stores [[HomeObject]].
aI.methodA();               // Output: aF

/*
Note: [[HomeObject]] is applied both to the class's and object's methods. But for object's methods - a method should be declared exactly as a method, not as a
property-function. For a property-function no [[HomeObject]] is set, so 'super' couldn't be used for to call those methods.
 */
const aJ = {
    methodA: function() {
    }
};
const aK = {
    __proto__: aJ,
    methodA: function() {
        // super.methodA();         // SyntaxError: 'super' keyword unexpected here
    }
};