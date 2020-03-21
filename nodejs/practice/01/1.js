'use strict';   // jshint ignore: line

const money = prompt('Ваш бюджет на месяц?');
const time = prompt('Введите дату в формате YYYY-MM-DD');

const appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};
for (let i = 0; i < 2; i++) {
    const expenseInput = prompt('Введите обязательную статью расходов');
    const expenseSum = prompt('Во сколько обойдется?');
    appData.expenses.expenseInput = expenseSum;
    // appData.expenses[expenseInput] = expenseSum;        // Можно и так.
}
const monthExpensesPerDay = appData.budget / 30;
alert('Ежедневный бюджет = ' + monthExpensesPerDay);