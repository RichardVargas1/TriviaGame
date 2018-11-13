
var card = $("#quiz-area");
var countStartNumber = 30;

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

var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].gif + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[game.currentQuestion].gif + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[game.currentQuestion].gif + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// ON CLICK EVENTS FOR THE START OF THE TRIVIA

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
