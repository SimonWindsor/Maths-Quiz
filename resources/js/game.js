let firstNumber;
let secondNumber;
let correctAnswer;
let maxNumber;
let mathProblem = '';
let answerInput = '';
let plus = false;
let takeAway = false;
let friendsOfTen = false;

const gameSelector = document.getElementById('game-selector');
const plusSelect = document.getElementById('adding');
const takeAwaySelect = document.getElementById('subtracting');
const friendsOfTenSelect = document.getElementById('friends-of-ten');
const easySelect = document.getElementById('easy');
const mediumSelect = document.getElementById('medium');
const hardSelect = document.getElementById('hard');
const goButton = document.getElementById('go');

const numberButtons = document.getElementsByClassName('number-btn');
const enterButton = document.getElementById('enter');
const clearButton = document.getElementById('clear');
const problemPanel = document.getElementById('problem');
const inputPanel = document.getElementById('input');

goButton.addEventListener('click', createGame);

// Add event listener for all number buttons
for(let i = 0; i < numberButtons.length; i++)
  numberButtons[i].addEventListener('click', numberInput);

// Add event listeners for enter and clear buttons
clearButton.addEventListener('click', clearInput);
enterButton.addEventListener('click', checkAnswer);

// Creates a game on submission of "game-select" form
function createGame() {
  gameSelector.classList.add('hide');
  answerChecker = [];

  // Determine game mode
  if(plusSelect.checked) {
    plus = true;
    takeAway = false;
    friendsOfTen = false;
  } else if(takeAwaySelect.checked) {
    plus = false;
    takeAway = true;
    friendsOfTen = false;
  } else if(friendsOfTenSelect.checked) {
    plus = false;
    takeAway = false;
    friendsOfTen = true;
  }

  // Determine difficulty
  if(easySelect.checked)
    maxNumber = 5;
  else if(mediumSelect.checked)
    maxNumber = 10;
  else if(hardSelect.checked)
    maxNumber = 15;

  createProblem();
}

function createProblem() {
  if(!friendsOfTen) {
    firstNumber = Math.floor(Math.random() * (maxNumber + 1));
    secondNumber = Math.floor(Math.random() * (maxNumber + 1));
  }
  if(plus) {
    mathProblem = `${firstNumber} + ${secondNumber}`;
    correctAnswer = firstNumber + secondNumber;
  } else if(takeAway) {
    const largest = Math.max(firstNumber, secondNumber);
    const smallest = Math.min(firstNumber, secondNumber);
    mathProblem = `${largest} - ${smallest}`;
    correctAnswer = largest - smallest;
  } else if(friendsOfTen) {
    const number = Math.floor(Math.random() * (10 + 1));
    mathProblem = `${number} + _ = 10`;
    correctAnswer = 10 - number;
  }
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
  if(answerInput != '') {
    if(Number(answerInput) === correctAnswer)
      alert('Well Done!');
    else
      alert('Wrong, sorry.')
    clearInput();
    createProblem();
  }
}