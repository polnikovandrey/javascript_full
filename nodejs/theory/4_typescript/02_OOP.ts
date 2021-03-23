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
const user: User = new User(1, 'Tom');
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
const userTom: PrivateUser = new PrivateUser('Tom', 29);
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
const protectedUser: ProtectedUser = new ProtectedUser('Protected', 20);
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
const extendedProtectedUser: ExtendedProtectedUser = new ExtendedProtectedUser('Extended', 30);
extendedProtectedUser.displayName();    // Output: Extended user name: Extended

// There is a possibility to shorthand properties definition. Properties are being create under the hood if an access modifier is supplied in the constructor arguments.
class ShorthandPropertiesUser {
    constructor(private name: string, private age: number, protected guest: boolean, public nickName: string) {
    }
}
const shortUser: ShorthandPropertiesUser = new ShorthandPropertiesUser('Tom', 10, false, 'Tommy');
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
const userWithGetterSetter: UserWithGetterSetter = new UserWithGetterSetter('');
userWithGetterSetter.name = 'Tom';              // Output: Set
console.log(userWithGetterSetter.name);         // Output: Get /n Tom

// A property could be defined as readonly. That property could be defined with the constructor only.
class UserWithReadonlyName {
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
}
const userWithReadonlyName: UserWithReadonlyName = new UserWithReadonlyName('Tom');
console.log(userWithReadonlyName.name);         // Output: Tom
// userWithReadonlyName.name = 'John';          // The property is readonly - compiler error.

// A readonly property could be implicitly created with a readonly constructor argument definition.
class UserWithReadonlyNameShort {
    constructor(readonly name: string) {
    }
}
const userWithReadonlyNameShort: UserWithReadonlyNameShort = new UserWithReadonlyNameShort('Tom');
console.log(userWithReadonlyNameShort.name);        // Output: Tom
// userWithReadonlyNameShort.name = 'John';         // The property is readonly - compiler error.



// A class could be extended by another with the help of the 'extends' keyword.
class Person {
    constructor(private name: string) {
    }
    public logInfo(): void {
        console.log(this.getInfo());
    }
    protected getInfo(): string {
        return `Name: ${this.name}`;
    }
}
class Employee extends Person {                                     // Extend option 1
    constructor(name: string, private position: string) {
        super(name);
    }
    protected getInfo(): string {                                   // Note method override
        return super.getInfo() + `, position: ${this.position}`;    // Note super method call
    }
}
const Employee1 = class extends Person {
    constructor(name: string, private position: string) {
        super(name);
    }
    protected getInfo(): string {                                   // Extend option 2
        return super.getInfo() + `, position ${this.position}`;
    }
}
new Employee('Tom', 'manager').logInfo();           // Output: Name: Tom, position: manager


// A class could be abstract and contain abstract methods.
abstract class Figure {
    abstract getArea(): void;
}
class Rectangle extends Figure {
    constructor(private width: number, private height: number) {
        super();                                                    // Note: super() call is required.
    }
    getArea(): void {
        console.log(`Area: ${this.width * this.height}`);
    }
}
new Rectangle(2, 3).getArea();                          // Output: Area: 6




interface IUser {                                                   // Interface.
    id: number;
    name: string;
    age?: number;                                                   // The optional 'age' property.
    readonly password?: string;                                     // The readonly optional 'password' property (couldn't be modified after object construction).
    getFullName(surname: string): string;
}
const employee: IUser = {                                           // Implementation  should implement all interface's properties and methods.
    id: 1,
    name: 'Tom',
    password: 'zxc',
    getFullName(surname: string): string {
        return `${this.name} ${surname}`;
    }
}
console.log(`${employee.id} : ${employee.name}`);                   // Output: 1 : Tom
console.log(employee.getFullName('Bearden'));               // Output: Tom Bearden
function getEmployeeInfo(employee: IUser): void {
    console.log(`${employee.id} : ${employee.name}`);
}
function buildEmployee(userId: number, userName: string, userAge?: number): IUser {
    return {
        id: userId,
        name: userName,
        age: userAge,
        getFullName(surname: string): string {
            return `${this.name} ${surname}`;
        }
    };
}
const employee1 = buildEmployee(2, 'Alice', 40);
getEmployeeInfo(employee1);                                         // Output: 2 : Alice

class UserImplementation implements IUser {
    constructor(public id: number, public name: string) {
    }
    getFullName(surname: string): string {
        return `${this.name + surname}`;
    }
}
// Class UserImplementation is of both the UserImplementation type and the IUser type.
const userJohn1: IUser = new UserImplementation(3, 'John');
const userJohn2: UserImplementation = new UserImplementation(4, 'John');

interface ReadWriteUser extends IUser {                             // One interface extends another.
    readWriteAccess: boolean;
}

// Interface of a function:
interface FullNameBuilder {
    (name: string, surname: string): string;
}
const simpleBuilder: FullNameBuilder = function(name: string, surname: string): string {        // Implementing function must match the interface declaration.
    return `Mr. ${name} ${surname};`
}


// Array interfaces allow access an array value of a particular type by index of by string.
interface StringArray {
    [index: number]: string;
}
const phones: StringArray = ['IPhone', 'HTC', 'Huawei'];
console.log(phones[1]);                                         // Output: HTC
interface Dictionary {
    [index: string]: string;
}
const colors: Dictionary = { };
colors['red'] = '#ff0000';
colors['green'] = '#00ff00';
colors['blue'] = '#0000ff';
console.log(colors['red']);                                     // Output: #ff0000


// Hybrid interfaces combine object definition and function definition. They are usually used to create object-factories.
interface PersonInfo {
    (name: string, surname: string): void;
    fullName: string;
    password: string;
    authenticate(): void;
}
function personBuilder(): PersonInfo {
    const person = <PersonInfo>function(name: string, surname: string): void {
        person.fullName = name + ' ' + surname;
    }
    person.authenticate = function() {
        console.log(`${person.fullName} is logging with the password: ${person.password}`);
    }
    return person;
}
const tomPerson = personBuilder();
tomPerson('Tom', 'Simpson');
tomPerson.password = 'qwerty';


// Casting classes. An object could be cast to a class with the help of angle brackets '<Class>' or the 'as Class' syntax.
class ClassA {
    methodA(): void { }
}
class ClassB extends ClassA {
    methodB(): void { }
}
const objectBOfClassA: ClassA = new ClassB();
// objectBOfTypeA.methodB();                                        // Compile error
const castObjectBToClassB: ClassB = <ClassB>objectBOfClassA;          // Cast to type ClassB with <Class> syntax.
castObjectBToClassB.methodB();
(<ClassB>objectBOfClassA).methodB();                                 // Another cast to type ClassB "on the fly" with <Class> syntax.
const anotherCastObjectBToClassB = objectBOfClassA as ClassB;         // Cast to type ClassB with 'as Class' syntax.
anotherCastObjectBToClassB.methodB();
(objectBOfClassA as ClassB).methodB();                               // Another cast to type ClassB "on the fly" with 'as Class' syntax.


// Casting interfaces. Same as classes, but there is a possibility to use objects, which do not implement interface directly (but have all of the interface properties).
// Object literals should have exactly the same list of properties to be compatible to an interface.
interface InterfaceC {
    propertyC: string;
}
class ClassC {
    propertyC: string;
    constructor(propertyC: string) {
        this.propertyC = propertyC;
    }
}
class ClassD extends ClassC {
    propertyD: string;
    constructor(propertyC: string, propertyD: string) {
        super(propertyC);
        this.propertyD = propertyD;
    }
}
function handleInterfaceC(interfaceC: InterfaceC) {
}
const objectCOfClassC = new ClassC('c');
const objectDOfClassD = new ClassD('c', 'd');
const objectDOfClassC = new ClassD('c', 'd');
handleInterfaceC(objectCOfClassC);                                  // Ok
handleInterfaceC(objectDOfClassD);                                  // Ok. Note - it's ok for a class to have additional property ('propertyD').
handleInterfaceC(objectDOfClassC);                                  // Ok
handleInterfaceC({ propertyC: 'c' });                      // Ok. Object literal is compatible with the InterfaceC interface.
// handleInterfaceC({ propertyC: 'c', propertyD: 'd' });            // Compile error, object literal has unknown property 'propertyD'.

// 'instanceof' operator could be used to check if the object belongs to a class.
console.log(objectDOfClassD instanceof ClassD);                     // Output: True
console.log(objectDOfClassD instanceof ClassC);                     // Output: True



// TypeScript supports generalization (like as parametrization in Java).

// Function generalization.
function generalizedFunction<T>(arg: T): T {
    return arg;
}
const aString: string = generalizedFunction('a');
const aNumber: number = generalizedFunction(1);

// Array generalization.
function createGeneralizedArray<T> (arg: T[]): Array<T> {
    return new Array<T>();
}
const numberArray: Array<number> = createGeneralizedArray([1, 2, 3] );
const aNumber1: number | undefined = numberArray.pop();

// Generalized classes and interfaces.
class GeneralizedUser<T> {
    private id: T;
    constructor(id: T) {
        this.id = id;
    }
}
const aGeneralizedUser = new GeneralizedUser<number>(1);
let aGeneralizedUser1 = new GeneralizedUser<string>('');
// aGeneralizedUser1 = new GeneralizedUser<number>(2);              // A variable's generalized type couldn't be changed once initialized.

// Generalization could be more precise and limited to a class or interface hierarchy with the help of the 'extends' syntax.
interface GeneralizedUserInterface<T> {
    id: T;
}
class GeneralizedUserImplementation implements GeneralizedUserInterface<number> {
    constructor(public id: number) {
        this.id = id;
    }
}
interface GeneralizedUserConsumer<T extends GeneralizedUserInterface<number>> {
    consume(user: T): void;
}

const generalizedUserConsumer: GeneralizedUserConsumer<GeneralizedUserInterface<number>> = new class implements GeneralizedUserConsumer<GeneralizedUserInterface<number>> {
    consume(user: GeneralizedUserInterface<number>): void {
    }
}
generalizedUserConsumer.consume(new GeneralizedUserImplementation(1));


// Generalization could be used to produce objects of a generalized type. A special statement should be used to note that a type has a constructor.
class Product {
    constructor() { }
}
function productFactory<T>(type: { new (): T }): T {                    // 'new (): T' ensures that T parameter is a type with a constructor.
    return new type();
}
const product = productFactory(Product);



// Mixins - a kind of multiple inheritance emulation. It allows to inherit a number of properties and methods of multiple classes.
class ClassOne {
    propertyOne: number = 1;
    methodOne(): void { console.log('One'); }
}
class ClassTwo {
    propertyTwo: number = 2;
    methodTwo(): void { console.log('Two'); }
}
class AMixin implements ClassOne, ClassTwo {                        // Note: implements multiple classes.
    propertyOne: number = 1;                                        // Note: all properties should be declared.
    propertyTwo: number = 2;
    methodOne(): void { };                                          // Note: all methods should be declared with empty body.
    methodTwo(): void { };
}
function applyMixins(derivedCtor: any, baseCtors: any[]): void {    // Note: method copies base classes methods to the target class prototype.
    baseCtors.forEach(baseCtor => {
        Object
            .getOwnPropertyNames(baseCtor.prototype)
            .forEach(name => derivedCtor.prototype[name] = baseCtor.prototype[name]);
    });
}
applyMixins(AMixin, [ ClassOne, ClassTwo ]);
const theMixin: AMixin = new AMixin();
console.log(theMixin.propertyOne);              // Output: 1
console.log(theMixin.propertyTwo);              // Output: 2
theMixin.methodOne();                           // Output: One
theMixin.methodTwo();                           // Output: Two
// Mixins disadvantages:
// * works only for own properties and methods of the inherited class. E.g. if the ClassOne extends ClassZero - ClassZero's properties and methods will not be inherited.
// * a mixin inherits only one of the methods with a common name in source classes (the last one, see applyMixins() method).