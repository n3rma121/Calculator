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
      // console.log("calculating");
      firstNumber = calculate(firstNumber, previousOperator, secondNumber);
      secondNumber = '';
      display.textContent = firstNumber;


    }
  } else if (className === 'equal' && firstNumber && secondNumber) {
    if(value === '%'){
      firstNumber = calculate(firstNumber, currentOperator, 0);
    }else{
          firstNumber = calculate(firstNumber, currentOperator, secondNumber);

    }
    secondNumber = '';
    display.textContent = firstNumber;
  }
  else if(className === "ac"){
    display.textContent = '';
    firstNumber = '';
    currentOperator = '';
    secondNumber = '';
  }
  else if(className === 'del'){
    if(display.textContent.length > 0){
      display.textContent = display.textContent.slice(0,-1);
      if(!currentOperator){
        firstNumber = display.textContent;
      }else{
        secondNumber = display.textContent.slice(firstNumber.length);
      }
    }
    
  }
 else if (className === 'percentage') {
    if (!currentOperator) {
        // If no operator has been selected, treat the percentage as a percentage of the first number
        if (display.textContent !== '') {
            firstNumber = parseFloat(display.textContent) / 100; // Convert firstNumber to a percentage
            display.textContent = firstNumber;
        }
    } else {
        // If an operator has been selected, treat the percentage as a percentage of the second number
        if (secondNumber !== '') {
            secondNumber = parseFloat(secondNumber) / 100; // Convert secondNumber to a percentage
            display.textContent = firstNumber + currentOperator + secondNumber;
        }
    }
}

  else if(className === 'plus-minus'){
    if(!currentOperator && firstNumber !== ''){
      firstNumber = parseFloat(firstNumber) * -1;
      display.textContent = firstNumber;
    }
  }
else if (className === 'dot') {
    if (!currentOperator && !display.textContent.includes('.')) {
        display.textContent += '.';
    } else if (currentOperator && !secondNumber.includes('.')) {
        secondNumber += '.';
        display.textContent += '.';
    }
}
}


function containsOperator(str) {
  // Regular expression pattern to match an operator following a number
  const pattern1 = /\d[-+/*%]/;

  // Regular expression pattern to match an operator following a negative number
  const pattern2 = /(-\d*\.?\d*)([-+/*%])/;

  // Check if either pattern is found in the string
  return pattern1.test(str) || pattern2.test(str);
}



function calculate(num1, operator, num2) {
  num1 = parseFloat(num1); // Convert to a floating-point number
  num2 = parseFloat(num2); // Convert to a floating-point number
  let result = '';
  switch (operator) {
  case '%':
      result = num1 * 0.01;
      return result;
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
