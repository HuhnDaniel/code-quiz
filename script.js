var quizWrapper = document.querySelector(".quiz_wrapper");
var startBtn = document.querySelector(".startBtn");
var quizPrompt = document.querySelector(".quiz_prompt");
var title = document.querySelector(".title");
var quizAnswers = document.querySelector(".quiz_answers");
var description = document.querySelector(".description");
var clock = document.querySelector(".clock");
var quizInput = document.querySelector(".quiz_input");

// variable to hold questions/answers
var questionsArr = [
	["What JavaScript command would you use to print output to the browser console?", "A: console.log()", "B: alert()", "C: prompt()", "D: for loop"],
	["JavaScript arrays can contain: ", "A: strings", "B: numbers", "C: arrays", "D: all of these"],
	["What JavaScript control structure would you use to repeat code multiple times?", "A: if statement", "B: for loop", "C: switch", "D: function()"],
	["In JavaScript, strict equality is symbolized by: ", "A: ==", "B: .isEqual()", "C: !=", "D: ==="],
	["Math.random() returns a number: ", "A: between -10 and 10", "B: between 0 and 1", "C: between 0 and 9", "D: between 1 and 10"]
];
var QUIZ_LENGTH = 5;
var TIME = 75;
var questionNumber = 1;
var questionsUsed = ""; // collects indexes of used questions

function newQuiz(e) {
	newQuestion(e);
	countdown(TIME);
}

function newQuestion(e) {
	if(e.target.matches("button") === false) {
		return;
	}

	if(questionNumber >= QUIZ_LENGTH) {
		finishQuiz();
		return;
	}
	
	// remove previous info from page
	clearPage();
	quizWrapper.setAttribute("style", "text-align: left;");
	
	// chose a random question (non repeated)
	do {
		var whichQuestion = Math.trunc(Math.random() * questionsArr.length);
	}
	while(questionsUsed.includes(whichQuestion));
	questionsUsed += whichQuestion;
	
	// replace #title with question prompt
	var question = document.createElement("h2");
	question.textContent = questionsArr[whichQuestion][0];
	question.setAttribute("style", "padding: 8px;")
	quizPrompt.append(question);
	
	// make elements for each answer
	for(var i = 1; i < questionsArr[whichQuestion].length; i++) {
		var answer = document.createElement("button");
		answer.textContent = questionsArr[whichQuestion][i];
		answer.setAttribute("class", "answerBtn btn");
		quizAnswers.append(answer);
	}
	
	questionNumber++;
}

function countdown(t) {
	clock.textContent = t;
	console.log(t);

	if(t === 0) {
		var score = t
		finishQuiz();
		return;
	}

	t--;
	setTimeout(function() {
		countdown(t);
	}, 1000);
}

function finishQuiz(score) {
	clearPage();
	quizWrapper.setAttribute("style", "text-align: center;");
	
	var congrats = document.createElement("h2");
	congrats.textContent = "Congratulations! You have finished the quiz!";
	quizPrompt.append(congrats);
}

// Code partially from GeeksforGeeks https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/
// function to clear elements to prepare for new elements
function clearPage() {
	var promptChild = quizPrompt.lastElementChild;
	var answersChild = quizAnswers.lastElementChild;
	var inputChild = quizInput.lastElementChild;

	while(promptChild) {
		quizPrompt.removeChild(promptChild);
		promptChild = quizPrompt.lastElementChild;
	}
	while(answersChild) {
		quizAnswers.removeChild(answersChild);
		answersChild = quizAnswers.lastElementChild;
	}
	while(inputChild) {
		quizInput.removeChild(inputChild);
		inputChild = quizInput.lastElementChild;
	}
}

startBtn.addEventListener("click", newQuiz);
quizAnswers.addEventListener("click", newQuestion);