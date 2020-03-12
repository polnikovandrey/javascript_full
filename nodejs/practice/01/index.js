'use strict';   // jshint ignore: line

let money = prompt('Ваш бюджет на месяц?');
let time = prompt('Введите дату в формате YYYY-MM-DD');

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};
for (let i = 0; i < 2; i++) {
    let expenseInput = prompt('Введите обязательную статью расходов');
    let expenseSum = prompt('Во сколько обойдется?');
    appData.expenses.expenseInput = expenseSum;
    // appData.expenses[expenseInput] = expenseSum;        // Можно и так.
}
let monthExpensesPerDay = appData.budget / 30;
alert('Ежедневный бюджет = ' + monthExpensesPerDay);

