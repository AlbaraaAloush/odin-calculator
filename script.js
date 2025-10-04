function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    return "ERROR";
  } else {
    return firstNumber/secondNumber;
  }
}

function isDigit(value) {
  return Number.isInteger(Number(value));
}

function isOperator(value) {
  return value === "+" || value === "-" || value === "*" || value === "÷";
}

function operate(firstNumber, secondNumber, operator) {
  if (operator === "+") {
    return add(firstNumber, secondNumber);
  } else if (operator === "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operator === "*") {
    return multiply(firstNumber, secondNumber);
  } else if (operator === "÷") {
    return divide(firstNumber, secondNumber);
  }
}

let calculatorButtons = document.querySelector(".calculator-buttons");
let inputDisplay = document.querySelector(".input-display");
let outputDisplay = document.querySelector(".output-display");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";

calculatorButtons.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const value = event.target.textContent;
    if (value === "CLEAR") {
      inputDisplay.textContent = "";
      outputDisplay.textContent = "";
      firstNumber = "";
      secondNumber = "";
      operator = "";
      result = "";
    } else if (isDigit(value)) {
      outputDisplay.textContent = '';
      if(operator === '') {
        inputDisplay.textContent += value;
        firstNumber+= value;
      } else {
        inputDisplay.textContent += value;
        secondNumber+= value;
      }
    } 
    else if (isOperator(value)) {
        if(secondNumber === '') {
          if(operator === ''){
            inputDisplay.textContent += value;
            operator = value;
          } else {
            inputDisplay.textContent = inputDisplay.textContent.replace(operator, value);
            operator = value;
          }
        } else {
          firstNumber = operate(Number(firstNumber), Number(secondNumber), operator);
          inputDisplay.textContent = firstNumber + value;
          operator = value;
          secondNumber = '';
        }
    }
     else if (value === "=") {
      result = operate(Number(firstNumber), Number(secondNumber), operator);
      outputDisplay.textContent = result;
      inputDisplay.textContent = "";
      firstNumber = "";
      secondNumber = "";
      operator = "";
    }
  }
});
