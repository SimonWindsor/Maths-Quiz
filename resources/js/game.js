// Variables for numbers, answers, answer checking and problem logging
let firstNumber;
let secondNumber;
let correctAnswer;
let minNumber;
let maxNumber;
let mathProblem = '';
let answerInput = '';
let totalQuestions = 0;
let answerChecker = [];
let questionLog = [];

// Variables for determining game mode
let plus = false;
let takeAway = false;
let friendsOfTen = false;

// Creating audio for use during game
const correctSound = new Audio("resources/audio/powerup.mp3");
const incorrectSound = new Audio("resources/audio/lose.mp3");
const errorSound = new Audio("resources/audio/error.mp3");;

// For game selection screen
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

//  For the screen displaying results
const resultsPanel = document.getElementById('results-container');
const results = document.getElementById('results');
const okButton = document.getElementById('ok-button');

// For game controls such as numeric buttons
const numberButtons = document.getElementsByClassName('number-btn');
const enterButton = document.getElementById('enter');
const clearButton = document.getElementById('clear');
const problemPanel = document.getElementById('problem');
const inputPanel = document.getElementById('input');
const quitButton = document.getElementById('quit');

// For to enable/disable difficulty selection depending on slected game mode
for(let i = 0; i < gameRadios.length; i++) {
  gameRadios[i].addEventListener('click', disableDifficulty);
}

// Buttons for creating and finishing a game
goButton.addEventListener('click', checkValidSetting);
okButton.addEventListener('click', restart);

// Add event listener for all number buttons
for(let i = 0; i < numberButtons.length; i++)
  numberButtons[i].addEventListener('click', numberInput);

// Add event listeners for enter, clear and quit buttons
clearButton.addEventListener('click', clearInput);
enterButton.addEventListener('click', checkAnswer);
quitButton.addEventListener('click', restart);

// If friends of ten is selected, difficulty is disabled
function disableDifficulty(event) {
  for(let i = 0; i < difficultyRadios.length; i++) {
    if(event.target === friendsOfTenSelect)
      difficultyRadios[i].classList.add('disabled');
    else
      difficultyRadios[i].classList.remove('disabled');
  }
}

/* Checks the user has selected friends of ten, or plus or takeaway WITH a
  difficulty level. Plays error sound if not valid, other wise starts game */
function checkValidSetting() {
  let valid = false;
  if(friendsOfTenSelect.checked)
    valid = true;
  else if(plusSelect.checked || takeAwaySelect.checked) {
    for(let i = 0; i < difficultyRadios.length; i++) {
      if(difficultyRadios[i].checked)
      valid = true;
    }
  }
  if(valid)
    createGame();
  else
    errorSound.play();
}

// Creates a game on submission of "game-select" form
function createGame() {
  gameSelector.classList.add('hide');
  totalQuestions = 0;
  answerChecker = [];
  questionLog = [];

  // Determine game mode
  if(plusSelect.checked) {
    plus = true;
    takeAway = false;
    friendsOfTen = false;
    problemPanel.style.fontSize = '8rem';
    problemPanel.style.lineHeight = '12rem';
  } else if(takeAwaySelect.checked) {
    plus = false;
    takeAway = true;
    friendsOfTen = false;
    problemPanel.style.fontSize = '8rem';
    problemPanel.style.lineHeight = '12rem';
  } else if(friendsOfTenSelect.checked) {
    plus = false;
    takeAway = false;
    friendsOfTen = true;
    problemPanel.style.fontSize = '7rem';
    problemPanel.style.lineHeight = '10.5rem';
  }

  // Determine difficulty
  if(easySelect.checked) {
    minNumber = 0;
    maxNumber = 5;
  }
  else if(mediumSelect.checked){ 
    minNumber = 5;
    maxNumber = 10;
  }
  else if(hardSelect.checked) {
    minNumber = 10;
    maxNumber = 15;
  }

  createProblem();
}

// Creates a maths question to be displayed
function createProblem() {
  totalQuestions++;
  let alreadyAsked = true;
  // Check question has not already been asked
  while(alreadyAsked) {
    if(!friendsOfTen) {
      firstNumber = Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
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
    if(!questionLog.includes(mathProblem))
      alreadyAsked = false;
  }
  /* So question isn't asked later, push question to questionLog and display in
    the problem panel */
  questionLog.push(mathProblem);
  problemPanel.innerHTML = mathProblem;
}

// Displays user input
function numberInput(event) {
  zeroSelect = answerInput[0] === '0';
  if(!zeroSelect && answerInput.length < 8)
    answerInput = answerInput + event.target.value;
  inputPanel.innerHTML = answerInput;
}

// Clears user input in the input panel
function clearInput() {
  answerInput = '';
  inputPanel.innerHTML = answerInput;
}

// Checks if user input is correct answer
function checkAnswer() {
  if(answerInput != '') {
    if(Number(answerInput) === correctAnswer) {
      correctSound.play();
      answerChecker.push(true);
    }
    else {
      incorrectSound.play();
      answerChecker.push(false);
    }
    clearInput();

    if(totalQuestions < 10)
      createProblem();
    else
      showResults();
  }
}

// Displays game results after game
function showResults() {
  resultsPanel.classList.remove('hide');
  results.innerHTML = answerChecker;
}

// Returns to game selection after a game is finished or quit
function restart() {
  resultsPanel.classList.add('hide');
  gameSelector.classList.remove('hide');
  for(let i = 0; i < difficultyRadios.length; i++)
    difficultyRadios[i].classList.add('disabled');
  uncheckAll();
}

// To uncheck all radio buttons. This is called upon load also
function uncheckAll() {
  plusSelect.checked = false;
  takeAwaySelect.checked = false;
  friendsOfTenSelect.checked = false;
  easySelect.checked = false;
  mediumSelect.checked = false;
  hardSelect.checked = false;
}