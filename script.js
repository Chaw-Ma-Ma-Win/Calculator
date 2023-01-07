// const screen = document.querySelector('.screen');
// let buttons = Array.from(document.getElementsByTagName('button'));

// buttons.map(button =>{
//   button.addEventListener('click', (e)=>{
//     switch (e.target.innerText) {
//       case 'Clear':
//         screen.innerText = "";
//         break;
//       case '<-':
//         if (screen.innerText) {
//           screen.innerText = screen.innerText.slice(0, -1)
//         }
//         break;
//       case '=':

//       default:
//         break;
//     }
//   })
// })

let currentNumber = '';
let previousNumber = '';
let opera = '';

const previousShowNum = document.querySelector('.previousNumber');
const currentShowNum = document.querySelector('.currentNumber');

const equal = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.clear');

const numberButton = document.querySelectorAll('.num');
const operaButton = document.querySelectorAll('.opera');

function handelNum(number) {
  if (previousNumber !== '' && currentNumber !== '' && opera === '') {
    previousNumber = '';
    currentShowNum.textContent = currentNumber;
  }
  if (currentNumber.length <= 10) {
    currentNumber += number;
    currentShowNum.textContent = currentNumber;
  }
}

numberButton.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    handelNum(e.target.textContent);
  })
);

function handelOpera(op) {
  if (previousNumber === '') {
    previousNumber = currentNumber;
    operatorCheck(op);
  } else if (currentNumber === '') {
    operatorCheck(op);
  } else {
    calculate();
    opera = op;
    currentShowNum.textContent = '0';
    previousShowNum.textContent = previousNumber + '' + opera;
  }
}

function operatorCheck(text) {
  opera = text;
  previousShowNum.textContent = previousNumber + '' + opera;
  currentNumber = '';
  currentShowNum.textContent = '0';
}

operaButton.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    handelOpera(e.target.textContent);
  })
);

equal.addEventListener('click', () => {
  if (currentNumber != '' && previousNumber != '') {
    calculate();
  }
});

function calculate() {
  previousNumber = Number(previousNumber);
  currentNumber = Number(currentNumber);

  if (opera === '+') {
    previousNumber += currentNumber;
  } else if (opera === '-') {
    previousNumber -= currentNumber;
  } else if (opera === '*') {
    previousNumber *= currentNumber;
  } else if (opera === '/') {
    if (currentNumber <= 0) {
      previousNumber = "Can't divide";
      displayResult();
      return;
    }
    previousNumber /= currentNumber;
  }
  previousNumber = roundNumber(previousNumber);
  previousNumber = previousNumber.toString();
  displayResult();
}
function roundNumber(num) {
  return Math.round(num * 10000) / 10000;
}
function displayResult() {
  if (previousNumber.length <= 10) {
    currentShowNum.textContent = previousNumber;
  } else {
    currentShowNum.textContent = previousNumber.slice(0, 10) + '...';
  }
  previousShowNum.textContent = '';
  opera = '';
  currentNumber = '';
}

clear.addEventListener('click', clearCalc);

function clearCalc() {
  currentNumber = '';
  previousNumber = '';
  opera = '';
  currentShowNum.textContent = '0';
  previousShowNum.textContent = '';
}

decimal.addEventListener('click', () => {
  addDecimal();
});

function addDecimal() {
  if (currentNumber.includes('.')) {
    currentNumber += '.';
    currentShowNum.textContent = currentNumber;
  }
}
