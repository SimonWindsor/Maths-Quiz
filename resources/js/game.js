// Variables for numbers, answers, answer checking and problem logging
let firstNumber;
let secondNumber;
let correctAnswer;
let minNumber;
let maxNumber;
let mathProblem = '';
let answerInput = '';
let totalQuestions;
let numCorrect;
let answerChecker = [];
let questionLog = [];

// Variables for determining game mode
let plus = false;
let takeAway = false;
let friendsOfTen = false;

// Audio variable sfor use during game
const correctSound = new Audio("resources/audio/powerup.mp3");
const incorrectSound = new Audio("resources/audio/lose.mp3");
const errorSound = new Audio("resources/audio/error.mp3");
const pingSound = new Audio("resources/audio/ping.mp3");
const resultsSound = new Audio("resources/audio/results.mp3");

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
const questions = document.getElementsByClassName('question');
const score = document.getElementById('score');
const okButton = document.getElementById('ok-button');

// For game controls such as numeric buttons and game container
const gameContainer = document.getElementById('game-container');
const numberButtons = document.getElementsByClassName('number-btn');
const enterButton = document.getElementById('enter');
const clearButton = document.getElementById('clear');
const problemPanel = document.getElementById('problem');
const inputPanel = document.getElementById('input');
const quitButton = document.getElementById('quit');

// Open and close credits popup
document.getElementById('open-credits').addEventListener('click', () => {
  document.getElementById('credits').hidden = false;
  document.querySelector('footer').style.display = 'none';
  gameSelector.hidden = true;
});
document.getElementById('close-credits').addEventListener('click', () => {
  document.getElementById('credits').hidden = true;
  document.querySelector('footer').style.display = 'flex';
  gameSelector.hidden = false;
});

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
  gameSelector.style.visibility = 'hidden';
  gameContainer.style.visibility = 'visible';
  // Hide footer, as some devices it will show over buttons during game
  document.querySelector('footer').style.display = 'none';
  totalQuestions = 0;
  numCorrect = 0;
  answerChecker = [];
  questionLog = [];

  // Determine game mode, font-size needs to be adjusted
  if(plusSelect.checked) {
    plus = true;
    takeAway = false;
    friendsOfTen = false;
    problemPanel.style.fontSize = '6rem';
  } else if(takeAwaySelect.checked) {
    plus = false;
    takeAway = true;
    friendsOfTen = false;
    problemPanel.style.fontSize = '6rem';
  } else if(friendsOfTenSelect.checked) {
    plus = false;
    takeAway = false;
    friendsOfTen = true;
    problemPanel.style.fontSize = '5rem';
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
  // If a user enters 0 as first number, no other numbers should be added
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
      numCorrect++;
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
  } else
    errorSound.play();
}

// Displays game results after game
function showResults() {
  gameContainer.style.visibility = 'hidden';
  // Clears results imgs and score from previous game
  for(let i = 0; i < questions.length; i++)
    questions[i].innerHTML = '';
  score.innerHTML = '';
  resultsPanel.style.visibility = 'visible';
  resultsSound.play();
  
  // For using with the resultPing timing function below
  let i = 0;
  // Times the individual question results being diplayed
  const resultPing = () => {
    if(i === answerChecker.length) {
      score.innerHTML = `${numCorrect} / 10`;
      pingSound.play();
      clearInterval(ping);
    } else {
      if(answerChecker[i])
        questions[i].innerHTML = '<img src="resources/images/correctemoji.png" />';
      else
        questions[i].innerHTML = '<img src="resources/images/incorrectemoji.png" />';
    }
    i++;
  }

  // Calls the timer
  const ping = setInterval(resultPing, 600);
}

// Returns to game selection after a game is finished or quit
function restart() {
  resultsPanel.style.visibility = 'hidden';;
  // To make game controls disappear when quit button ("GO BACK") is pressed
  gameContainer.style.visibility = 'hidden';
  gameSelector.style.visibility = 'visible';
  // Return footer to display
  document.querySelector('footer').style.display = 'flex';
  for(let i = 0; i < difficultyRadios.length; i++)
    difficultyRadios[i].classList.add('disabled');
  // Clear user input as to prevent it appearing in a new game
  inputPanel.innerHTML = '';
  answerInput = '';
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