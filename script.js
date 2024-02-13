// script.js
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');
let outputContainer = document.querySelector('.output');
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let output = '';
let previousOperator = '';

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const className = event.target.className;
    const value = event.target.value;
    operate(className, value);
  })
});

function operate(className, value) {
  if (className === "number" && !currentOperator) {
    display.textContent += value;
    firstNumber = display.textContent;

  }  else if (className === 'number' && currentOperator) {
    secondNumber += value; // Append to the secondNumber string
    display.textContent += value;
  } 
  else if (className === 'operator') {

    if ((firstNumber || secondNumber) && !containsOperator(display.textContent)) {
      currentOperator = value;
      display.textContent += value;
    } else if (secondNumber) {
      previousOperator = currentOperator;
      currentOperator = value;
      console.log("calculating");
      firstNumber = calculate(firstNumber, previousOperator, secondNumber);
      secondNumber = '';
      display.textContent = firstNumber;


    }
  } else if (className === 'equal' && firstNumber && secondNumber) {
    firstNumber = calculate(firstNumber, currentOperator, secondNumber);
    secondNumber = '';
    display.textContent = firstNumber;
  }

}

function containsOperator(str) {
  // Regular expression pattern to match an operator following a number
  const pattern1 = /\d[-+/*]/;

  // Regular expression pattern to match an operator following a negative number
  const pattern2 = /(-\d*\.?\d*)([-+/*])/;

  // Check if either pattern is found in the string
  return pattern1.test(str) || pattern2.test(str);
}



function calculate(num1, operator, num2) {
  num1 = parseFloat(num1); // Convert to a floating-point number
  num2 = parseFloat(num2); // Convert to a floating-point number
  let result = '';
  switch (operator) {
    case '+':
      result = num1 + num2;
      return result.toString();
    case '-':
      result = num1 - num2;
      return result.toString();
    case '*':
      result = num1 * num2;
      return result.toString();
    case '/':
      if (num2 !== 0) { // Check for division by zero
        result = num1 / num2;
        return result.toString();
      } else {
        return "Error: Division by zero";
      }
    default:
      return "Error: Invalid operator";
  }
}
