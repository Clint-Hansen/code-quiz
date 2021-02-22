let highScoresEl = document.querySelector(".highscores-container")
let timeRemain = document.querySelector(".time-left");
let startButton = document.querySelector("#start-btn");

let questionText = document.querySelector('.quiz-title');
let introText = document.querySelector(".question-content")
let answerList = document.querySelector(".answer-content")
let theTimer = timeRemain.textContent;
let gameOver = false;
let startGameFlag = false;
let highScoreBtn = document.querySelector('.view-highscores')
let questionCount = 0;

let questions = [
    {
        question: 'How do you find the number with the highest value of x and y?',
        choice: 
            [
            {answer: 'Math.highest(x,y)'},
            {answer: 'Math.abs(x,y)'}, 
            {answer: 'Math.ceil(x,y)'},
            {answer: 'Math.max(x,y)', correct: true},
            ]
    },
    {
        question: 'What is the correct way to start a for loop?',
        choice: 
            [
            {answer: 'for (i = 0; i < 6; i++)', correct: true},
            {answer: 'for (i++; i = 0; i < 6)'},
            {answer: '(i = 0; i < 6; i++) for'},
            {answer: 'for i = 0(; i < 6; i++)'},
            ]
    },
    {
        question: 'How do you start an array?',
        choice:
            [
            {answer: 'myArray = {....}'},
            {answer: 'myArray = "..."'},
            {answer: '.startArray.myArray'},
            {answer: 'myArray = [....]', correct: true},
            ]
        
    },
    {
        question: 'Which of these values is NOT considered false?',
        choice:
        [
            {answer: '0'},
            {answer: '"0"', correct: true},
            {answer: 'null'},
            {answer: '""'},
        ]
        
    },
    {
        question: 'Which statement correctly stores data into the Web Storage API?',
        choice:
        [
            {answer: 'localStorage.setItem("lunch", "sandwich");', correct: true},
            {answer: 'localStorage.getItem("lunch", "sandwich");'},
            {answer: 'getItem.localStorage.("lunch", "sandwich");'},
            {answer: 'setItem.localStorage("lunch", "sandwich");'},
        ]   
    }
]

startButton.addEventListener('click', gameStart);
highScoreBtn.addEventListener('click', displayHighscores);



function gameStart() {
    gameOver = false;
    startGameFlag = true;
    highScoreBtn.classList.add('hidden')
    startButton.classList.add('hidden');
    answerList.classList.remove('hidden');
    introText.classList.add('hidden');
    randomQuestions = questions.sort(() => Math.random() - .5);
    questionIndex = 0;

    getNextQuestion();
};

function getNextQuestion() {
    if(gameOver == false){
        revealQuestion(randomQuestions[questionIndex])
        questionCount++;
    }
};

function revealQuestion(theQuestion) {
    clearQuestionList();
    questionText.textContent = theQuestion.question;
    theQuestion.choice.forEach(answerSelection => {
    let answerButton = document.createElement('p');
    answerButton.textContent = answerSelection.answer;
    answerButton.className = "answer-text";
    if (answerSelection.correct) {
    answerButton.dataset.correct = answerSelection.correct;
}
answerButton.addEventListener('click', questionChoice)
answerList.appendChild(answerButton);
})
}; 
    
function questionChoice(event) {
    let answerSelected = event.target;
    let correct = answerSelected.dataset.correct;
    Array.from(answerList.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    setTimeout(() => { getNextQuestion(); }, 1000);

    if (typeof correct === "undefined") {
        theTimer -=10;
    }
    
    if (questionCount + 1 > questions.length) {
        setTimeout(() => {gameOver = gameEnd(); }, 1000);
        
    }

    if (randomQuestions.length > questionIndex + 1) {
        questionIndex++;
    }
    
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('answer-correct')
    }
    else {
        element.classList.add("answer-wrong");
    }
    
}

function clearStatusClass(element) {
    element.classList.remove("answer-correct");
    element.classList.remove("answer-wrong");
}

function clearQuestionList() {
    answerList.innerHTML = "";
}

function gameTimer() {
    theTimer -= 1;
    if (theTimer <= 0) {
        theTimer = 0;
        reloadGame();
        setTimeout(() => {location.reload(); }, 2000);
    }
    timeRemain.innerHTML = theTimer;
}

var intervalId = window.setInterval(function(){
    if (startGameFlag) {
        gameTimer();
    }
    }, 1000);
  
function reloadGame() {
    clearQuestionList();
    questionText.textContent = "You ran out of time.  Please try again!"
}

function gameEnd() {
   saveHighscore();
   endScreen();
    return true;
}

function saveHighscore() {
    let name = prompt("Please enter your initials to save your high-score!");
    let score = theTimer;
    let highscore = 0;
    localStorage.setItem("highscore", 0);
    if (score > (localStorage.getItem("highscore"))) {
        localStorage.setItem("highscore", name + ' : ' + score);
    }
}  

function displayHighscores() {
    let getScore = localStorage.getItem("highscore");
    console.log(getScore);
    let showScore = document.createElement("p");
    showScore.innerText = getScore;
    highScoresEl.appendChild(showScore);
}

function endScreen() {
    clearQuestionList();
    questionText.textContent = "The Quiz is Over!"
    startGameFlag = false;
    setTimeout(() => {location.reload(); }, 3000);
}