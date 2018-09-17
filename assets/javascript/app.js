// One object holding in my questions for my trivia game.
var questions = [{
    "question": "Which of the following football teams were given the \"America's Team\" nickname?",
    "choice1": "Houston Texans",
    "choice2": "Baltimore Ravens",
    "choice3": "New York Jets",
    "choice4": "Dallas Cowboys",
    "answer": "4"
},  {
    "question": "Who was the first actor to portray James Bond \"on screen\"?",
    "choice1": "Daniel Craig",
    "choice2": "Timothy Dalton",
    "choice3": "Sean Connery",
    "choice4": "Barry Nelson",
    "answer": "4"
},  {
    "question": "What was Elvis Presley's natural hair color?",
    "choice1": "Blonde",
    "choice2": "Brown",
    "choice3": "Black",
    "choice4": "Red",
    "answer": "1"
},  {
    "question": "How many valves does a trumpet have?",
    "choice1": "3",
    "choice2": "4",
    "choice3": "5",
    "choice4": "2",
    "answer": "1"
},  {
    "question": "Which of the following restaurants do not sell donuts?",
    "choice1": "Dunkin' Donuts",
    "choice2": "Shipley Do-Nuts",
    "choice3": "Krispy Kreme",
    "choice4": "Kolache Factory",
    "answer": "4"
},  {
    "question": "What year did mankind land on the moon?",
    "choice1": "1902",
    "choice2": "1969",
    "choice3": "1777",
    "choice4": "2003",
    "answer": "2"
},   {
    "question": "What color is not on the rainbow?",
    "choice1": "Red",
    "choice2": "Orange",
    "choice3": "Yellow",
    "choice4": "Black",
    "answer": "4"
}]

// Variables for questions and score keeping.
var currentQuestion = 0;
var score = 0;
var totalQuestions = questions.length;

// variables will be used to capture HTML IDs.
var container = document.getElementById('quizContainer');
var questionEl = document.getElementById('question');
var choice1 = document.getElementById('choice1');
var choice2 = document.getElementById('choice2');
var choice3 = document.getElementById('choice3');
var choice4 = document.getElementById('choice4');
var nextButton = document.getElementById('nextButton');
var resultCont = document.getElementById('result');

function loadQuestion (questionIndex) {
    var q = questions[questionIndex];
    questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
    choice1.textContent = q.choice1;
    choice2.textContent = q.choice2;
    choice3.textContent = q.choice3;
    choice4.textContent = q.choice4;
};

function loadNextQuestion () {
    var selectedChoice = document.querySelector('input[type=radio]:checked');
    if(!selectedChoice){
        alert('please select your answer!');
        return;
    }
    var answer = selectedChoice.value;
    if(questions[currentQuestion].answer === answer) {
        // Adds one point if the user gets a question right.
        score += 1;
    }
    selectedChoice.checked = false;
    currentQuestion++;
    // Subtracts one point from the final score if the user gets a question wrong.
    if(currentQuestion === totalQuestions - 1) {
        nextButton.textCurrent = 'Finish';
    }
    if(currentQuestion === totalQuestions) {
        container.style.display = 'none';
        resultCont.style.display = '';
        resultCont.textContent = 'Final Score: ' + score;
        return;
    }
    loadQuestion(currentQuestion);
}

loadQuestion(currentQuestion);''

// I tried to go off from the "interval assignment," for my timer. 
// But I could not figure out how to end my game and take the user to be shown their final score.
// I wanted to display 30 seconds for each quiz question. I could not get it right.
// So I just totalled up to 210 seconds for the overall trivia game, and just pushed an alert saying "Game Over."
// The user can stil take the quiz, even with the timer still running. It just won't stop the game.
var timer = 210;
var intervalId;

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    
    timer--;

    $("#timeNumber").html("<h2> " + timer + "</h2>");

    if (timer === 0) {

    stopQuiz();


    alert("The Trivia Quiz is Over!");
    }
}

function stopQuiz() {

    clearInterval(intervalId);
}


run();