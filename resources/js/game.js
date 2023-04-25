let firstNumber;
let secondNumber;
let correctAnswer;
let maxNumber;
let mathProblem = '';
let answerInput = '';
let totalQuestions = 0;
let answerChecker = [];

let plus = false;
let takeAway = false;
let friendsOfTen = false;

// let correctSound = new Audio("powerup.mp3");
// let incorrectSound = new Audio("lose.mp3");

const gameSelector = document.getElementById('game-selector');
const plusSelect = document.getElementById('adding');
const takeAwaySelect = document.getElementById('subtracting');
const friendsOfTenSelect = document.getElementById('friends-of-ten');
const easySelect = document.getElementById('easy');
const mediumSelect = document.getElementById('medium');
const hardSelect = document.getElementById('hard');
const goButton = document.getElementById('go-button');
const gameRadios = document.getElementsByName('game-mode');
const difficultyRadios = document.getElementsByName('difficulty');

const resultsPanel = document.getElementById('results-container');
const results = document.getElementById('results');
const okButton = document.getElementById('ok-button');

const numberButtons = document.getElementsByClassName('number-btn');
const enterButton = document.getElementById('enter');
const clearButton = document.getElementById('clear');
const problemPanel = document.getElementById('problem');
const inputPanel = document.getElementById('input');

for(let i = 0; i < gameRadios.length; i++) {
  gameRadios[i].addEventListener('click', disableDifficulty);
}

goButton.addEventListener('click', createGame);
okButton.addEventListener('click', restart);

// Add event listener for all number buttons
for(let i = 0; i < numberButtons.length; i++)
  numberButtons[i].addEventListener('click', numberInput);

// Add event listeners for enter and clear buttons
clearButton.addEventListener('click', clearInput);
enterButton.addEventListener('click', checkAnswer);

function disableDifficulty(event) {
  if(event.target.value === 'friends-of-ten') {
    for(let i = 0; i < difficultyRadios.length; i++)
      difficultyRadios[i].classList.add('disabled');
  }
  else {
    for(let i = 0; i < difficultyRadios.length; i++)
      difficultyRadios[i].classList.remove('disabled');
  }
}

// Creates a game on submission of "game-select" form
function createGame() {
  gameSelector.classList.add('hide');
  totalQuestions = 0;
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
  totalQuestions++;
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
    if(Number(answerInput) === correctAnswer) {
      // correctSound.play();
      alert('Well Done!');
      answerChecker.push(true);
    }
    else {
      // incorrectSound.play();
      alert('Wrong, sorry.')
      answerChecker.push(false);
    }
    clearInput();

    if(totalQuestions < 10)
      createProblem();
    else
      showResults();
  }
}

function showResults() {
  resultsPanel.classList.remove('hide');
  results.innerHTML = answerChecker;
}

function restart() {
  resultsPanel.classList.add('hide');
  gameSelector.classList.remove('hide');
  uncheckAll();
}

function uncheckAll() {
  plusSelect.checked = false;
  takeAwaySelect.checked = false;
  friendsOfTenSelect.checked = false;
  easySelect.checked = false;
  mediumSelect.checked = false;
  hardSelect.checked = false;
}