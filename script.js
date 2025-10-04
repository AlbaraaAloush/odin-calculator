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
  return firstNumber / secondNumber;
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
    if (secondNumber === 0) {
      return "ERROR";
      
    }
    return divide(firstNumber, secondNumber);
  }
}

function handleClear() {
  inputDisplay.textContent = "";
  outputDisplay.textContent = "";
  calculator.reset();
}

function handleDigit(value) {
  if (calculator.operator === "") {
    calculator.setFirstNumber(value);
  } else {
    calculator.setSecondNumber(value);
  }
  updateInputDisplay(value);
}

function setOperator(value) {
  updateInputDisplay(value);
  calculator.operator = value;
}

function replaceOperator(value) {
  inputDisplay.textContent = inputDisplay.textContent.replace(
    calculator.operator,
    value
  );
  calculator.operator = value;
}
function handleOperator(value) {
  if (calculator.secondNumber === "") {
    if (calculator.operator === "") {
      setOperator(value);
    } else {
      replaceOperator(value);
    }
  } else {
    calculator.firstNumber = operate(
      Number(calculator.firstNumber),
      Number(calculator.secondNumber),
      calculator.operator
    );
    if (calculator.firstNumber === "ERROR") {
      inputDisplay.textContent = '';
      calculator.reset();
      outputDisplay.textContent = "ERROR";
    }
    inputDisplay.textContent = calculator.firstNumber + value;
    calculator.operator = value;
    calculator.secondNumber = "";
  }
}

function updateInputDisplay(value) {
  inputDisplay.textContent += value;
}

function updateOutputDisplay(value) {
  outputDisplay.textContent = value;
}

let calculatorButtons = document.querySelector(".calculator-buttons");
let inputDisplay = document.querySelector(".input-display");
let outputDisplay = document.querySelector(".output-display");

let calculator = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  result: "",
  reset() {
    this.firstNumber = "";
    this.secondNumber = "";
    this.operator = "";
    this.result = "";
  },
  setFirstNumber(value) {
    this.firstNumber += value;
  },
  setSecondNumber(value) {
    this.secondNumber += value;
  },
  setResult(value) {
    this.result = value;
  },
  calculate() {
    this.result = operate(
      Number(this.firstNumber),
      Number(this.secondNumber),
      this.operator
    );
  },
};

calculatorButtons.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const value = event.target.textContent;

  if (value === "CLEAR") {
    handleClear();
  } else if (isDigit(value)) {
    handleDigit(value);
  } else if (isOperator(value)) {
    handleOperator(value);
  } else if (value === "=") {
    calculator.calculate();
    outputDisplay.textContent = calculator.result;
    inputDisplay.textContent = "";
    calculator.reset();
  }
});
