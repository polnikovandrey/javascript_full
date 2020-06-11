'use strict';           // jshint ignore: line

// A class could extend exactly one other class in javascript. Mixin can be used to "extend" multiple classes.
// A mixin is a class, whose methods are intended to be used in other classes without extending a mixin.
// A mixin is not intended to be used standalone.
// One should be cautious with mixin's methods names - they shouldn'd intersect with (overwrite) class's existing methods.

const sayMixin = {
    say(phrase) {
        console.log(phrase);
    }
};
const sayHiMixin = {
    __proto__: sayMixin,                            // Mixin could extend another mixin
    sayHi() {
        super.say('Hi, ' + this.name);
    }
};
const sayByeMixin = {
    __proto__: sayMixin,
    sayBye() {
        super.say('Bye, ' + this.name);
    }
};
class User {
    constructor(name) {
        this.name = name;
    }
}
Object.assign(User.prototype, sayHiMixin);        // Copying mixin's methods to the User's prototype.
Object.assign(User.prototype, sayByeMixin);
new User('Bill').sayHi();                   // Output: Hi, Bill
new User('Phil').sayBye();                  // Output: Bye, Phil

// As an example, mixin can be used to provide a convenient method to apply event handling logic to any class without the extension of another class.
const eventMixin = {
    on(eventName, handler) {
        if (!this._eventHandlers) {
            this._eventHandlers = {};
        }
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    },
    off(eventName, handler) {
        const handlers = this._eventHandlers && this._eventHandlers[eventName];
        if (handlers) {
            for (let i = 0; i < handlers.length(); i++) {
                if (handlers[i] === handler) {
                    handlers.splice(i--, 1);
                }
            }
        }
    },
    trigger(eventName, ...args) {
        const handlers = this._eventHandlers && this._eventHandlers[eventName];
        if (handlers) {
            handlers.forEach(handler => handler.apply(this, args));
        }
    }
};
class Menu {
    choose(value) {
        this.trigger("select", value);
    }
}
Object.assign(Menu.prototype, eventMixin);
const menu = new Menu();
menu.on("select", value => console.log(`Menu select: ${value}`));
menu.trigger("select", 777);                                            // Output: Menu select: 777