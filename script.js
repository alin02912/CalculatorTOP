const buttons = document.querySelectorAll('.button')
buttons.forEach(button => button.addEventListener('click', buttonClicked))
const primaryDisplay = document.querySelector('.primaryDis p');
const secondaryDisplay = document.querySelector('.secondaryDis p')
let operator = null;
let reset = 0;
let decimal = 0;
let clicks = 0;

function buttonClicked(e) {
  let btnClk = e.explicitOriginalTarget.innerText;

  switch (btnClk) {
    case "Clear":
      clearDisplay();
      break;
    case "Backspace":
      backspaceDisplay();
      break;
    case "+":
      checkOperator("+");
      break;
    case "-":
      checkOperator("-");
      break;
    case "*":
      checkOperator("*");
      break;
    case "/":
      checkOperator("/");
      break;
    case "=":
      showResult();
      operator = null;
      break;
    case ".":
      checkDecimal(btnClk);
      break;
    default:
      clickCounter();
      changeDisplay(btnClk);
  }
}

function changeDisplay(btnClk) {
  if (clickCounter() >= 20) {
    return;
  }
  if (reset === 1) {
    primaryDisplay.textContent = btnClk;
    reset = 0;
  } else {
    primaryDisplay.textContent += btnClk;
  }

}

function clearDisplay() {
  primaryDisplay.textContent = '';
  secondaryDisplay.textContent = '';
  resetClicks();
  resetDecimal()

}

function backspaceDisplay() {
  primaryDisplay.textContent = primaryDisplay.textContent.substr(0, (primaryDisplay.textContent.length) - 1);
}

function copyToSecondaryDisplay() {
  secondaryDisplay.textContent = primaryDisplay.textContent;
  primaryDisplay.textContent = 0;
}

function checkOperator(op) {
  if (!operator) {
    copyToSecondaryDisplay()
    operator = op;
    resetDecimal()
    resetClicks()
  } else {
    showResult()
    resetDecimal()
    resetClicks()
    operator = op;
  }
}

function checkDecimal(btnClk) {
  if (!decimal) {
    decimal = 1;
    changeDisplay(btnClk)
  }
}

function resetDecimal() {
  decimal = 0;
}

function clickCounter() {
  clicks++;
  return clicks;
}

function resetClicks() {
  clicks = 0;
}

function showResult() {
  let operand1 = primaryDisplay.textContent;
  let operand2 = secondaryDisplay.textContent;
  if (operator === "+") {
    let result = addition(operand1, operand2);
    primaryDisplay.textContent = Math.round((Number(result) + Number.EPSILON) * 100) / 100;
    secondaryDisplay.textContent = Math.round((+result + Number.EPSILON) * 100) / 100;
  } else if (operator === "-") {
    let result = subtraction(operand2, operand1);
    primaryDisplay.textContent = Math.round((+result + Number.EPSILON) * 100) / 100;;
    secondaryDisplay.textContent = Math.round((+result + Number.EPSILON) * 100) / 100;;
  } else if (operator === "*") {
    let result = multiplication(operand1, operand2);
    primaryDisplay.textContent = Math.round((+result + Number.EPSILON) * 100) / 100;;
    secondaryDisplay.textContent = Math.round((+result + Number.EPSILON) * 100) / 100;;
  } else if (operator === "/") {
    let result = division(operand1, operand2);
    primaryDisplay.textContent = Math.round((+result + Number.EPSILON) * 100) / 100;;
    secondaryDisplay.textContent = Math.round((+result + Number.EPSILON) * 100) / 100;;
  }
  reset = 1;
  resetDecimal();
  resetClicks();
}

function addition(a, b) {
  return (parseFloat(a) + parseFloat(b));
}

function subtraction(a, b) {
  return (parseFloat(a) - parseFloat(b));
}

function multiplication(a, b) {
  return (parseFloat(a) * parseFloat(b));
}

function division(a, b) {
  return (parseFloat(b) / parseFloat(a));
}