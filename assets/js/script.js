
let timeRemain = document.querySelector(".time-left");
let startButton = document.querySelector("#start-btn");
let nextButton = document.querySelector("#next-btn");

let questionText = document.querySelector('.quiz-title');
let introText = document.querySelector(".question-content")
let answerList = document.querySelector(".answer-content")


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
        question: 'What is 3 + 1?',
        choice:
        [
            {answer: '2'},
            {answer: '4', correct: true},
            {answer: '8'},
            {answer: '3'},
        ]
        
    },
    {
        question: 'What is 1 + 1?',
        choice:
        [
            {answer: '2', correct: true},
            {answer: '4'},
            {answer: '8'},
            {answer: '3'},
        ]
        
        
}
]

startButton.addEventListener('click', gameStart);



function gameStart() {
startButton.classList.add('hidden');
answerList.classList.remove('hidden');
introText.classList.add('hidden');
randomQuestions = questions.sort(() => Math.random() - .5);
questionIndex = 0;

getNextQuestion();
};

function getNextQuestion() {
    revealQuestion(randomQuestions[questionIndex])
};

function revealQuestion(theQuestion) {
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