let firstNumber;
let secondNumber;
let maxNumber = 5;
let mathProblem = '';
let answerInput = '';
const numberButtons = document.getElementsByClassName('number-btn');
const enterButton = document.getElementById('enter');
const clearButton = document.getElementById('clear');
const problemPanel = document.getElementById('problem');
const inputPanel = document.getElementById('input');

for(let i = 0; i < numberButtons.length; i++)
  numberButtons[i].addEventListener('click', numberInput);

clearButton.addEventListener('click', clearInput);

enterButton.addEventListener('click', checkAnswer);

function createProblem() {
  firstNumber = Math.floor(Math.random() * (maxNumber + 1));
  secondNumber = Math.floor(Math.random() * (maxNumber + 1));
  mathProblem = `${firstNumber} + ${secondNumber}`;
  problemPanel.innerHTML = mathProblem;
}

function numberInput(event) {
  zeroSelect = answerInput[0] === '0';
  if(!zeroSelect && answerInput.length < 8)
    answerInput = answerInput + event.target.value;
  inputPanel.innerHTML = answerInput;
}

function clearInput() {
  answerInput = '';
  inputPanel.innerHTML = answerInput;
}

function checkAnswer() {
  if(Number(answerInput) === firstNumber + secondNumber)
    alert('Well Done!');
  else
    alert('Wrong, sorry.')
  clearInput();
  createProblem();
}

// For testing for now
const disappear = document.getElementById('disappear');

// For testing for now
disappear.addEventListener('click', goAway)

// For testing for now
function goAway() {
  document.getElementById('testdiv').hidden = true;
  createProblem();
}