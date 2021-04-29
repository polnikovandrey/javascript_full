// A decorator is the mean of declarative programming, it allows to change a behavior without explicit code changes.
// A decorator is the experimental feature. The "experimentalDecorators" compiler option in tsconfig.json should be set to "true" (or the "--experimentalDecorators" flag
// should be passed to the compiler in the command line command).



// Class decorator. It's a function with a single parameter - the constructor of the class being decorated.
function classDecoratorFn(constructor: Function) { }

// The simplest class decorator scenario:
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
@sealed
class SealedUser {
    constructor(public name: string) {
    }
}
try {
    Object.defineProperty(SealedUser, 'age', { value: 28 });
} catch (e) {
    console.log(e.message);                 // Output: Cannot define property age, object is not extensible
}

// Another class decoration scenario - extending and changing the constructor behavior.
function logger(constructorFunction: Function) {
    console.log('New instance');
    constructorFunction.prototype.age = 23;
    constructorFunction.prototype.print = function(): void {
        console.log(`${this.name} ${this.age}`);
    }
}
@logger
class LoggedUser {
    constructor(public name: string) {
    }
    print(): void { console.log('Will be overridden by the decorator.')};
}
new LoggedUser('Tom').print();              // Output: New instance /n Tom 23




// A method and method parameters decorators.
function deprecated(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log("Method is deprecated")
}

// A decorator-function takes 3 parameters:
// * class-constructor function for a static method or a class prototype for a regular method.
// * a method name
// * an interface PropertyDescriptor implementation
// interface PropertyDescriptor { configurable? : boolean, enumerable?: boolean, value?: any, writable?: boolean, get?(): any, set?(v: any): void };
// The [value] property must contain a function definition.
function readOnly(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
}
class WithAMethod {
    @readOnly
    aMethod(): void {
        console.log('Original output');
    }
}
const aWithAMethod = new WithAMethod();
// aWithAMethod.aMethod = function() { console.log('New output') };             // Error: TypeError: Cannot assign to read only property 'aMethod' of object '#<WithAMethod>'

// A decorator-function could be used to modify the return value of a function.
function log(target: Object, method: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(JSON.stringify(args));
        const returnValue = originalMethod.apply(this, args);
        console.log(`${JSON.stringify(args)} => ${returnValue}`)
        return returnValue;
    }
}
class Calculator {
    @log
    add(x: number, y: number): number {
        return x + y;
    }
}
new Calculator().add(1, 2);                                                 // Output: [1,2] /n [1,2] => 3

// A decorator could be used to modify parameters of a function.
// function ParameterDecorator(target: Object, propertyKey: string, parameterIndex: number) { ... }
// Where:
// * [target] - class constructor for a static method or a class prototype for a regular method.
// * [key] - a method name
// * [index] - the order index of a parameter
function logParameter(aFunction: Function, methodName: string, index: number) {
    console.log(`Method [${methodName}] has an annotated parameter`);
}
class SomeClass {
    someMethod(@logParameter firstParameter: number, secondParameter: string) { }           // Output: Method [someMethod] has an annotated parameter
}


// Properties and accessor methods (get/set) decorators.
// function PropertyDecorator(target: Object, propertyKey: String) { ... }
// [target] - a constructor of class for a static method or a prototype of a class for a regular method.
// [propertyKey] - the name of a property.

// function AccessorMethodDecorator(target: Object, propertyName: String, descriptor: PropertyDescriptor) { ... }
// [target] - a constructor of class for a static method or a prototype of a class for a regular method.
// [propertyName] - a method name.
function logProperty(target: Object, propertyKey: String) {
    console.log(`Class has decorated property ${propertyKey}`);
}
function logAccessorMethod(target: Object, propertyName: String, descriptor: PropertyDescriptor) {
    console.log(`Class has decorated method ${propertyName}`);
}
class ForDecoration {

    @logProperty                                // Output: Class has decorated property aProperty
    aProperty: String;

    constructor(aProperty: String) {
        this.aProperty = aProperty;
    }

    @logAccessorMethod                          // Output: Class has decorated method prop
    get prop(): String {
        return this.aProperty;
    }
}


// Decorator factory is used to implement decorator with parameters.
function makePropertyMapper<T>(prototype: any, key: string, mapper: (value: any) => T) {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, key, {
        set(firstValue: any) {
            Object.defineProperty(this, key, {
                get() {
                    return values.get(this);
                },
                set(value: any) {
                    values.set(this, mapper(value));
                },
                enumerable: true,
            });
            this[key] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}
function apply(aNumber: number) {
    return function(target: any, key: string) {
        makePropertyMapper(target, key, (value: number) => {
            return value + aNumber;
        });
    };
}
class HasNumber {

    @apply(2)
    aValue: number;

    constructor(aValue: number) {
        this.aValue = aValue;
    }

    log(): void {
        console.log(this.aValue);
    }
}
new HasNumber(1).log();                 // Output: 3