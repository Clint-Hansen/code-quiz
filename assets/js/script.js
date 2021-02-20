let timeRemain = document.querySelector(".time-left");
let startButton = document.querySelector("#start-btn");
let nextButton = document.querySelector("#next-btn");

let questionText = document.querySelector('.quiz-title');
let introText = document.querySelector(".question-content")
let answerList = document.querySelector(".answer-content")


let questions = [
    {
        question: 'How do you find the number with the highest value of x and y?',
        correct: 'Math.max(x,y)',
        choice: 
            [
            {answer: 'Math.highest(x,y)', correct: true},
            {answer: 'Math.abs(x,y)', }, 
            {answer: 'Math.ceil(x,y)'},
            {answer: 'Math.max(x,y)'},
            ]
    },
    {
        question: 'What is the correct way to start a for loop?',
        correct: 'for (i = 0; i < 6; i++)',
        choice: 
            [
            {answer: 'for (i = 0; i < 6; i++)'},
            {answer: 'for (i++; i = 0; i < 6)'},
            {answer: '(i = 0; i < 6; i++) for'},
            {answer: 'for i = 0(; i < 6; i++)'},
            ]
    },
    {
        question: 'How do you start an array?',
        correct: 'myArray = [....]',
        choice:
            [
            {answer: 'myArray = {....}'},
            {answer: 'myArray = "..."'},
            {answer: '.startArray.myArray'},
            {answer: 'myArray = [....]'},
            ]
        
    },
    {
        question: 'What is 3 + 1?',
        correct: '4',
        choice:
        [
            {answer: '2'},
            {answer: '4'},
            {answer: '8'},
            {answer: '3'},
        ]
        
    },
    {
        question: 'What is 1 + 1?',
        correct: '2',
        choice:
        [
            {answer: '2'},
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
QuestionIndex = 0;

getNextQuestion();
};

function getNextQuestion() {
revealQuestion(randomQuestions[QuestionIndex])
};

function revealQuestion(theQuestion) {
questionText.textContent = theQuestion.question;
theQuestion.choice.forEach(answerSelection => {
let answerButton = document.createElement('p');
answerButton.textContent = answerSelection.answer;
answerButton.className = "answer-text";
answerButton.addEventListener('click', questionChoice)
answerList.appendChild(answerButton);
})
}; 
    



function questionChoice(event) {
    let answerSelected = event.target;
    if (answerSelected.textContent === questions.correct) {
        console.log("That was right")
    }
    else {
        console.log("That was wrong!")
    }

}