const additionA = document.getElementById('first-number');
const additionB = document.getElementById('second-number');
const amount = document.getElementById('amount');
let body = document.body;
const container = body.querySelector('.container');

const randomNumberInRange = (min, max) => { 
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let a = randomNumberInRange(6, 9);
let b = randomNumberInRange(11, 14) - a;
let c = a + b;
additionA.innerHTML = a;
additionB.innerHTML = b;
amount.innerHTML = '?';


const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const px = 39;
const firstArrowCenter = (px * a) / 2; 
const firstArrowBend = -60; 
const firstArrowEnd = px * a;
const secondArrowCenter = ((px * a) + ((px * a) + (px * b))) / 2;
const secondArrowBend = -60 / 2; 
const secondArrowEnd = (px * b) + (px * a); // 

//рендер первой стрелки
const firstArrowRender = () => {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.moveTo(0, 85); 
  ctx.quadraticCurveTo(firstArrowCenter, firstArrowBend, firstArrowEnd, 85);
  ctx.stroke();
};
firstArrowRender();

const secondArrowRender = () => {
  ctx.beginPath();
  ctx.moveTo(firstArrowEnd, 85);
  ctx.quadraticCurveTo(secondArrowCenter, secondArrowBend, secondArrowEnd, 85);
  ctx.stroke();
};

const inputA = document.createElement('input');
inputA.setAttribute("type", "text");
inputA.classList.add('number');
container.append(inputA);
inputA.focus();
inputA.style.left = ((firstArrowCenter - inputA.clientWidth / 2) + 'px');
inputA.style.top = (firstArrowBend + 10 + 'px');

const inputB = document.createElement('input');
const inputC = document.createElement('input');
inputC.setAttribute("type", "text");
inputC.setAttribute("maxlength", "2");
inputC.classList.add('addition-input');

//рендер второго инпута и второй стрелки
const secondInputRender = () => {
  let inputs = document.querySelectorAll('input');
  for (let input of inputs) {

    if (!input.disabled) {
      return;
    } else if (input.disabled) {
      inputB.setAttribute("type", "text");
      inputB.classList.add('number');
      container.append(inputB);
      inputB.focus();
      inputB.style.left = ((secondArrowCenter - inputB.clientWidth + 15) + 'px');
      inputB.style.top = (firstArrowBend / 1.5 + 'px');
      
      secondArrowRender();
    }
  }
};

//проверка на правильность введенных чисел
const check =(span, input, number) => { 
  if (input.value != number) {
    input.classList.add('input-error');
    span.classList.add('span-error');
  } else {
    input.disabled = true;
    input.classList.remove('input-error');
    span.classList.remove('span-error');
    secondInputRender();
  }
  
  if (inputA.disabled === true && inputB.disabled === true) {
    amount.after(inputC); 
    amount.remove();
    inputC.focus();
  }
};
  
inputA.oninput = () => check(additionA, inputA, a);
inputB.oninput = () => check(additionB, inputB, b);
inputC.oninput = () => {
  if (inputC.value == c) {
    inputC.disabled = true;
    inputC.classList.remove('input-error');
//    inputC.style.border = ('none');
  } else {
    inputC.classList.add('input-error');
  }
};
