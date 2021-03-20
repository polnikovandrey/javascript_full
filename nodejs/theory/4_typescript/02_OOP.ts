// Classes.
class User {

    id: number;
    name: string;

    constructor(userId: number, userName: string) {
        this.id = userId;
        this.name = userName;
    }

    getInfo(): string {
        return `id: ${this.id}, name: ${this.name}`;
    }
}
const user = new User(1, 'Tom');
console.log(user.getInfo());                        // Output: id: 1, name: Tom


// Static properties and functions.
class Operation {

    static PI: number = 3.14;

    static getSquare(radius: number): number {
        return Operation.PI * radius * radius;
    }
}
console.log(Operation.getSquare(30));         // Output: 2826
console.log(Operation.PI);                          // Output: 3.14


// TypeScript has 3 access modifiers: public, protected and private. By default (if not defined) the access is implied as public.
class ImplicitLyPublicUser {
    name: string;
    year: number;
    constructor(name: string, year: number) {
        this.name = name;
        this.year = year;
    }
}
class ExplicitlyPublicUser {
    public name: string;
    public year: number;
    constructor(name: string, year: number) {
        this.name = name;
        this.year = year;
    }
}
class PrivateUser {
    private _name: string;          // Note: the underscore is not necessary, it's a kind of tradition (js agreements).
    private _year: number;
    constructor(name: string, age: number) {
        this._name = name;
        this._year = this.setYear(age);
    }
    public displayYear(): void {
        console.log(`Year of birth: ${this._year}`);
    }
    public displayName(): void {
        console.log(`Name: ${this._name}`);
    }
    private setYear(age: number): number {
        return new Date().getFullYear() - age;
    }
}
const userTom = new PrivateUser('Tom', 29);
userTom.displayName();                  // Output: Name: Tom
userTom.displayYear();                  // Output: Year of birth: 1992
// console.log(userTom._name);          // _name property is private, compile error
// userTom.setYear(40);                 // setYear() method is private, compile error

class ProtectedUser {
    protected name: string;             // Is like private, but accessible by descendants (extending classes).
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public displayName(): void {
        console.log(`User name: ${this.name}`);
    }
}
const protectedUser = new ProtectedUser('Protected', 20);
// console.log(protectedUser.name);     // name is the protected property, compile error
protectedUser.displayName();            // Output: User name: Protected
class ExtendedProtectedUser extends ProtectedUser {
    public displayName(): void {
        console.log(`Extended user name: ${this.name}`);        // Note - parent protected property [name] is accessible.
    }
    public displayAge(): void {
        // console.log(`Extended user age: ${this.age}`);       // Note - parent private property [age] is not accessible.
    }
}
const extendedProtectedUser = new ExtendedProtectedUser('Extended', 30);
extendedProtectedUser.displayName();    // Output: Extended user name: Extended

// There is a possibility to shorthand properties definition. Properties are being create under the hood if an access modifier is supplied in the constructor arguments.
class ShorthandPropertiesUser {
    constructor(private name: string, private age: number, protected guest: boolean, public nickName: string) {
    }
}
const shortUser = new ShorthandPropertiesUser('Tom', 10, false, 'Tommy');
// console.log(`${shortUser.name}`);            // private - compiler error
// console.log(`${shortUser.age}`);             // private - compiler error
// console.log(`${shortUser.guest}`);           // protected - compiler error
console.log(`${shortUser.nickName}`);           // Output: Tommy


// The common practice is to support a private property with getters and setters.
class UserWithGetterSetter {
    private _name: string;
    constructor(name: string) {
        this._name = name;
    }
    public get name(): string {
        console.log('Get');
        return this._name;
    }
    public set name(name: string) {
        console.log('Set');
        this._name = name;
    }
}
const userWithGetterSetter = new UserWithGetterSetter('');
userWithGetterSetter.name = 'Tom';              // Output: Set
console.log(userWithGetterSetter.name);         // Output: Get /n Tom

// A property could be defined as readonly. That property could be defined with the constructor only.
class UserWithReadonlyName {
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
}
const userWithReadonlyName = new UserWithReadonlyName('Tom');
console.log(userWithReadonlyName.name);         // Output: Tom
// userWithReadonlyName.name = 'John';          // The property is readonly - compiler error.

// A readonly property could be implicitly created with a readonly constructor argument definition.
class UserWithReadonlyNameShort {
    constructor(readonly name: string) {
    }
}
const userWithReadonlyNameShort = new UserWithReadonlyNameShort('Tom');
console.log(userWithReadonlyNameShort.name);        // Output: Tom
// userWithReadonlyNameShort.name = 'John';         // The property is readonly - compiler error.

