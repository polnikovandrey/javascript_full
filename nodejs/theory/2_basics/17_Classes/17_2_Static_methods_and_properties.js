'use strict';           // jshint ignore: line

// Static method is a method of a class-function itself, not of it's prototype.
class WithStaticMethod {
    static sayHello() {
        console.log('Hello');
    }
}
WithStaticMethod.sayHello();                                // Output: Hello
// The same without 'static' keyword.
WithStaticMethod.sayHi = function() {
    console.log('Hi');
};
WithStaticMethod.sayHi();                                   // Output: Hi
// Static method's 'this' value is a constructor of a class-function (the same rule "object before dot" is applied).
WithStaticMethod.isThisConstructor = function() {
    console.log(this === WithStaticMethod);
};
WithStaticMethod.isThisConstructor();                       // Output: true

// Static methods are commonly used to implement comparators, factory-methods, methods for db manipulations.
class Article {
    constructor(id, name, date) {
        this.id = id;
        this.name = name;
        this.date = date;
    }
    static compare(article1, article2) {
        return article1.date - article2.date;
    }
    static createToday(id, name) {
        return new this(id, name, new Date());                      // Note the usage of 'new this' - the value of 'this' is a constructor of the Article class.
    }
    static removeFromDb(article) {
        // db related logic here
    }
}
const articles = [
    new Article(1, 'First', new Date(2012, 12, 12)),
    Article.createToday(2, 'Second')
];
articles.sort(Article.compare);
Article.removeFromDb({ id: 1 });

// Fresh browsers support class static properties.
class WithStaticProperty {
    // static aStaticProperty = 'A value';                              // Not available in nodeJs yet. Is available in a Chrome browser.
}
// console.log(WithStaticProperty.aStaticProperty);
// The same as previous.
WithStaticProperty.aStaticProperty2 = 'A value';
console.log(WithStaticProperty.aStaticProperty2);                       // Output: A value

// Static methods and properties are being inherited.
class ExtendsWithStaticMethod extends WithStaticMethod { }
ExtendsWithStaticMethod.sayHello();                                     // Output: Hello
class ExtendsWithStaticProperty extends  WithStaticProperty { }
console.log(ExtendsWithStaticProperty.aStaticProperty2);                // Output: A value
/*
 This works because:
 1. Extending class (function) inherits the extended class (function) by prototype. Static methods/properties are being inherited.
 2. Extending class's prototype inherits the extended class's prototype by prototype. Common methods/properties are being inherited.
 */
console.log(ExtendsWithStaticMethod.__proto__ === WithStaticMethod);                            // Output: true
console.log(ExtendsWithStaticMethod.prototype.__proto__ === WithStaticMethod.prototype);        // Output: true

// Both classes below inherit Object's methods/properties, but only the last inherits static methods/properties.
class AClass { }
class BClass extends Object { }
// console.log(AClass.getOwnPropertyNames({ a: 1, b: 2 }));            // TypeError: AClass.getOwnPropertyNames is not a function
console.log(BClass.getOwnPropertyNames({ a: 1, b: 2 }));            // Output: [ 'a', 'b' ]
console.log(AClass.__proto__);                                         // Output: [Function]
console.log(AClass.__proto__ === Function.prototype);                  // Output: true
console.log(BClass.__proto__);                                         // Output: [Function: Object]
console.log(BClass.__proto__ === Object);                              // Output: true
