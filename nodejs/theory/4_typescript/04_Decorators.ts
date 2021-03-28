// A decorator is like an annotation in Java.
// A decorator is the mean of declarative programming, allows to change behavior without direct code changes.
// Decorators are experimental feature, the "experimentalDecorators" compiler option in tsconfig.json should be set to "true" (or the "--experimentalDecorators" flag
// should be passed to the compiler in the command line command.



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




// Method and method parameters decorators.