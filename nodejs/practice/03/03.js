'use strict';   // jshint ignore: line

let money, time;

function start() {
    money = prompt('Ваш бюджет на месяц?');
    time = prompt('Введите дату в формате YYYY-MM-DD');
    while (isNaN(money) || money === '' || money === null) {
        money = prompt('Ваш бюджет на месяц?');
    }
}
start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true
};

function chooseExpenses() {
    for (let i = 0; i < 2; i++) {
        let expenseInput = prompt('Введите обязательную статью расходов'),
            expenseSum = prompt('Во сколько обойдется?');
        if (typeof(expenseInput) === 'string'
            && typeof(expenseInput) != null
            && typeof(expenseSum != null)
            && expenseInput !== ''
            && expenseSum !== ''
            && expenseInput.length < 50) {
            appData.expenses[expenseInput] = expenseSum;
        } else {
            i--;
        }
    }
}
chooseExpenses();

function detectDayBudget() {
    let monthExpensesPerDay = (appData.budget / 30).toFixed();
    appData.moneyPerDay = monthExpensesPerDay;
    alert('Daily budget = ' + monthExpensesPerDay);
}
detectDayBudget();

function detectLevel() {
    if (appData.moneyPerDay < 100) {
        console.log('Minimal income amount.');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log('Average income amount.');
    } else if (appData.moneyPerDay > 2000) {
        console.log('Sufficient income amount');
    } else {
        console.log('Unknown error');
    }
}
detectLevel();

function checkSavings() {
    if (appData.savings === true) {
        let save = +prompt('Какова сумма накопления?'),
            percent = +prompt('Под какой процент?');
        appData.monthIncome = save / 100 / 12 * percent;
        alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
    }
}
checkSavings();

function chooseOptExpenses() {
    for (let i = 0; i < 3; i++) {
        let optExpence = prompt('Статья необязательных расходов?');
        appData.optionalExpenses[i + 1] = optExpence;
    }
    console.log(appData.optionalExpenses);
}
chooseOptExpenses();