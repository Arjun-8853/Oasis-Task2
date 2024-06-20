document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '0';
    let operator = null;
    let previousInput = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '0';
                operator = null;
                previousInput = null;
            } else if (value === '=') {
                if (operator && previousInput !== null) {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                    operator = null;
                    previousInput = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (operator && previousInput !== null) {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '0';
            } else {
                if (currentInput === '0') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }

            display.textContent = currentInput;
        });
    });

    function calculate(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }
});
