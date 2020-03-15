'use strict';   // jshint ignore: line

let money = +prompt('Ваш бюджет на месяц?');
let time = prompt('Введите дату в формате YYYY-MM-DD');

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

function promptUserExpenses() {

}

for (let i = 0; i < 2; i++) {
    let expenseInput = prompt('Введите обязательную статью расходов'),
        expenseSum = prompt('Во сколько обойдется?');
    if (typeof(expenseInput) === 'string'                       // In fact expenseInput is always a string, typeof check is excess.
            && typeof(expenseInput) != null
            && typeof(expenseSum != null)
            && expenseInput !== ''
            && expenseSum !== ''
            && expenseInput.length < 50) {                      // Input string length is lt 50.
        // Note: to use a variable value as a property name of an object - square parentheses should be used.
        appData.expenses[expenseInput] = expenseSum;            // [] parentheses are used to append an object property of expenseInput's value.
        // appData.expenses.expenseInput = expenseSum;          // In such case exact 'expenseInput' (not variable value) property is added and used to store a value.
    } else {
        i--;
    }
}

/*
let i = 0;
while (i < 2) {
    let expenseInput = prompt('Введите обязательную статью расходов'),
        expenseSum = prompt('Во сколько обойдется?');
    if (typeof(expenseInput) === 'string'                       // In fact expenseInput is always a string, typeof check is excess.
        && typeof(expenseInput) != null
        && typeof(expenseSum != null)
        && expenseInput !== ''
        && expenseSum !== ''
        && expenseInput.length < 50) {                      // Input string length is lt 50.
        // Note: to use a variable value as a property name of an object - square parentheses should be used.
        appData.expenses[expenseInput] = expenseSum;            // [] parentheses are used to append an object property of expenseInput's value.
        // appData.expenses.expenseInput = expenseSum;          // In such case exact 'expenseInput' (not variable value) property is added and used to store a value.
        i++;
    }
}
*/

/*
let i = 0;
do {
    let expenseInput = prompt('Введите обязательную статью расходов'),
        expenseSum = prompt('Во сколько обойдется?');
    if (typeof(expenseInput) === 'string'                       // In fact expenseInput is always a string, typeof check is excess.
        && typeof(expenseInput) != null
        && typeof(expenseSum != null)
        && expenseInput !== ''
        && expenseSum !== ''
        && expenseInput.length < 50) {                      // Input string length is lt 50.
        // Note: to use a variable value as a property name of an object - square parentheses should be used.
        appData.expenses[expenseInput] = expenseSum;            // [] parentheses are used to append an object property of expenseInput's value.
        // appData.expenses.expenseInput = expenseSum;          // In such case exact 'expenseInput' (not variable value) property is added and used to store a value.
        i++;
    }
} while (i < 2);
*/


let monthExpensesPerDay = appData.budget / 30;
appData.moneyPerDay = monthExpensesPerDay;
alert('Daily budget = ' + monthExpensesPerDay);

if (appData.moneyPerDay < 100) {
    console.log('Minimal income amount.');
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    console.log('Average income amount.');
} else if (appData.moneyPerDay > 2000) {
    console.log('Sufficient income amount');
} else {
    console.log('Unknown error');
}