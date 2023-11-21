"use strict";
const wrapper = document.querySelector('.wrapper');
const input = document.querySelector('.screen');
let total = 0;
let firstNumber = 0;
let secondNumber = 0;
let operator;
wrapper.addEventListener('click', (event) => {
    const target = event.target;
    if (target.nodeName === 'BUTTON') {
        const key = target.textContent.trim();
        switch (key) {
            case '←':
                if (input.textContent.length > 1)
                    input.textContent = input.textContent.slice(0, input.textContent.length - 1);
                else
                    input.textContent = '0';
                break;
            case 'C':
                input.textContent = '0';
                total = 0;
                operator = '';
                firstNumber = 0;
                secondNumber = 0;
                break;
            case '=':
                const str = input.textContent.split(operator).map(number => number[0] === '−' ? +number.slice(1) * (-1) : +number);
                if (str.length > 2 && secondNumber === 0)
                    return;
                firstNumber = str[0];
                if (str.length > 1)
                    secondNumber = str[1];
                total = handleOperations();
                break;
            default:
                if (input.textContent === '0') {
                    input.textContent = key;
                    return;
                }
                else if (+key >= 0 && +key <= 9) {
                    input.textContent += key;
                    return;
                }
                firstNumber = input.textContent[0] === '−' ? +input.textContent.slice(1) * (-1) : +input.textContent;
                operator = key;
                input.textContent += key;
        }
    }
});
const handleOperations = () => {
    let result;
    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '×':
            result = firstNumber * secondNumber;
            break;
        case '÷':
            result = firstNumber / secondNumber;
            break;
        case '−':
            result = firstNumber - secondNumber;
            break;
        default:
            result = null;
    }
    if (result === null)
        return result;
    input.textContent = '' + result;
    firstNumber = result;
    return result;
};
