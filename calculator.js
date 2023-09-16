'use strict';

const wrapper = document.querySelector('.wrapper');
const input = document.querySelector('.screen');
let total = 0;
let operator;
let firstNumber
let secondNumber;
let reset = true;
wrapper.addEventListener('click', e => {

    if (e.target.nodeName === 'BUTTON') {
        const key = e.target.textContent.trim()

        switch (key) {
            case '←':
                if (input.textContent.length > 1)
                    input.textContent = input.textContent.slice(0, input.textContent.length - 1)
                else
                    input.textContent = '0'
                break;
            case 'C':
                input.textContent = '0';
                total = 0;
                operator = '';
                firstNumber = 0
                secondNumber = 0;
                reset = true;
                break;
            case '=':
                if (reset) {
                    const str = input.textContent.split(operator)
                    secondNumber = Number(str[str.length - 1])
                    reset = false
                }
                if (operator) {
                    total = handleOperations();
                    input.textContent = total
                    firstNumber = total;
                }
                break;

            default:
                if (input.textContent === '0') {
                    input.textContent = key
                } else if (Number(key) >= 0 && Number(key) <= 9) {
                    input.textContent += key
                } else if (Number(input.textContent[input.textContent.length - 1]) >=0) {
                    if (input.textContent[0] === '−')
                        firstNumber = Number(input.textContent.slice(1))*(-1);
                    else
                        firstNumber = Number(input.textContent)

                    console.log(firstNumber)
                    operator = key
                    input.textContent += key
                } else {
                    operator = key
                    input.textContent = input.textContent.slice(0, input.textContent.length - 1) + key // += key
                }

        }
    }
})


const handleOperations = () => {
    switch (operator) {
        case '+':
            return firstNumber + secondNumber
        case '×':
            return firstNumber * secondNumber
        case '÷':
            return firstNumber / secondNumber
        case '−':
            return firstNumber - secondNumber
    }
}