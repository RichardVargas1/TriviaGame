
var gameBody = $("#quiz-area");
var timerStart = 30;

// One object holding in my questions for my trivia game.
var questions = [{
  question: "Which of the following football teams were given the \"America's Team\" nickname?",
  answers: ["Houston Texans", "Baltimore Ravens", "New York Jets", "Dallas Cowboys"],
  correctAnswer: "Dallas Cowboys",
  gif: ""
}, {
  question: "Who was the first actor to portray James Bond \"on screen\"?",
  answers: ["Daniel Craig", "Timothy Dalton", "Sean Connery", "Barry Nelson"],
  correctAnswer: "Barry Nelson",
  gif: ""
}, {
  question: "What was Elvis Presley's natural hair color?",
  answers: ["Blonde", "Brown", "Black", "Red"],
  correctAnswer: "Blonde",
  gif: ""
}, {
  question: "How many valves does a trumpet have?",
  answers: ["3", "4", "5", "2"],
  correctAnswer: "3",
  gif: ""
}, {
  question: "Which of the following restaurants do not sell donuts?",
  answers: ["Dunkin' Donuts", "Shipley Do-Nuts", "Krispy Kreme", "Kolache Factory"],
  correctAnswer: "Kolache Factory",
  gif: ""
}, {
  question: "What year did mankind land on the moon?",
  answers: ["1902", "1969", "1776", "2003"],
  correctAnswer: "1969",
  gif: ""
}, {
  question: "What color is not on the rainbow?",
  answers: ["Red", "Orange", "Yellow", "Black"],
  correctAnswer: "Black",
  gif: ""
}, {
  question: "Which of the following universities are not located in Texas?",
  answers: ["UofH", "UT Austin", "A&M", "UCLA"],
  correctAnswer: "UCLA",
  gif: ""
}];
// =========================================================================================================
// I will come back at a later time to add in some gifs for my questions.

var gameTimer;

var triviaGame = {

  questions: questions,
  currentQuestion: 0,
  counter: timerStart,
  correctAnswerChoice: 0,
  incorrectAnswerChoice: 0,

  countdown: function() {
    triviaGame.counter--;
    $("#counter-number").text(triviaGame.counter);
    if (game.counter === 0) {
      triviaGame.timeUp();
    }
  },

  loadQuestion: function() {

    gameTimer = setInterval(triviaGame.countdown, 1000);

    gameBody.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      gameBody.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    triviaGame.counter = timerStart;
    $("#counter-number").text(triviaGame.counter);
    triviaGame.currentQuestion++;
    triviaGame.loadQuestion();
  },

  timeUp: function() {

    clearInterval(gameTimer);

    $("#counter-number").html(triviaGame.counter);

    gameBody.html("<h2>Out of Time!</h2>");
    gameBody.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    gameBody.append("<img src='" + questions[this.currentQuestion].gif + "' />");

    if (triviaGame.currentQuestion === questions.length - 1) {
      setTimeout(triviaGame.results, 3 * 1000);
    }
    else {
      setTimeout(triviaGame.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(gameTimer);

    gameBody.html("<h2>Quiz Finished. Here are your results.</h2>");

    $("#counter-number").text(triviaGame.counter);

    gameBody.append("<h3>Questions You Got Right: " + triviaGame.correctAnswerChoice + "</h3>");
    gameBody.append("<h3>Questions You Got Wrong: " + triviaGame.incorrectAnswerChoice + "</h3>");
    gameBody.append("<h3>Unanswered Questions: " + (questions.length - (triviaGame.incorrectAnswerChoice + triviaGame.correctAnswerChoice)) + "</h3>");
    gameBody.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(gameTimer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    gtriviaGame.incorrectAnswerChoice++;

    clearInterval(gameTimer);

    gameBody.html("<h2>Nope!</h2>");
    gameBody.append("<h3>The Correct Answer was: " + questions[triviaGame.currentQuestion].correctAnswer + "</h3>");
    gameBody.append("<img src='" + questions[triviaGame.currentQuestion].gif + "' />");

    if (triviaGame.currentQuestion === questions.length - 1) {
      setTimeout(triviaGame.results, 3 * 1000);
    }
    else {
      setTimeout(triviaGame.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(gameTimer);

    triviaGame.correctAnswerChoice++;

    gameBody.html("<h2>You Are Correct!</h2>");
    gameBody.append("<img src='" + questions[triviaGame.currentQuestion].gif + "' />");

    if (triviaGame.currentQuestion === questions.length - 1) {
      setTimeout(triviaGame.results, 3 * 1000);
    }
    else {
      setTimeout(triviaGame.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = timerStart;
    this.correctAnswerChoice = 0;
    this.incorrectAnswerChoice = 0;
    this.loadQuestion();
  }
};

// ON CLICK EVENTS FOR THE START OF THE TRIVIA

$(document).on("click", "#start-over", function() {
  triviaGame.reset();
});

$(document).on("click", ".answer-button", function(e) {
  triviaGame.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  triviaGame.loadQuestion();
});
