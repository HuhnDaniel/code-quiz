var highcoreBtn = document.querySelector(".highscoreBtn");
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
	["Math.random() returns a number: ", "A: between -10 and 10", "B: between 0 and 1", "C: between 0 and 9", "D: between 1 and 10"],
	["Objects contain elements in the form: ", "A: key: value", "B: index: value", "C: function: call", "D: if: else"],
	["In JavaScript, the \"this\" operator references: ", "A: the parent object or variable", "B: the parent function", "C: the previous variable", "D: the HTML code"]
];
var QUIZ_LENGTH = 5;
var TIME = 75;
var INITIAL_QUESTION = 0;
var questionNumber;
var USED_STRING = ""; // collects indexes of used questions
var questionsUsed;
var oneSec;
var t;

function newQuiz(e) {
	t = TIME;
	questionNumber = INITIAL_QUESTION;
	questionsUsed = USED_STRING;
	newQuestion(e);
	countdown(t);
}

function newQuestion(e) {
	if(!e.target.matches("button")) {
		return;
	}

	if(questionNumber >= QUIZ_LENGTH) {
		stopCountdown();
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
	
	// replace #title with question prompt (randomized)
	var question = document.createElement("h2");
	question.textContent = questionsArr[whichQuestion][0];
	question.setAttribute("style", "padding: 8px;");
	quizPrompt.append(question);
	
	// make elements for each answer (randomized)
	var answersUsed = "";
	for(var i = 1; i < questionsArr[whichQuestion].length; i++) {
		do {
			var whichAnswer = Math.ceil(Math.random() * (questionsArr[whichQuestion].length - 1));
		}
		while(answersUsed.includes(whichAnswer));
		answersUsed += whichAnswer;

		var answer = document.createElement("button");
		answer.textContent = questionsArr[whichQuestion][whichAnswer];
		answer.setAttribute("class", "answerBtn btn");
		quizAnswers.append(answer);
	}
	
	questionNumber++;
}

function countdown() {
	if(t === 0) {
		finishQuiz(t);
		return;
	}
	
	t--;
	oneSec = setTimeout(function() {
		countdown(t);
	}, 1000);

	clock.textContent = t;
}

function stopCountdown() {
	finishQuiz(t);
	clearTimeout(oneSec);
}

function finishQuiz(score) {
	clearPage();
	quizWrapper.setAttribute("style", "text-align: center;");
	
	var congrats = document.createElement("h2");
	congrats.textContent = "Congratulations! You have finished the quiz!";
	congrats.setAttribute("style", "padding: 8px;");
	quizPrompt.append(congrats);
	
	var scorePara = document.createElement("article");
	scorePara.textContent = "Your final score was " + score + "!";
	scorePara.setAttribute("class", "description")
	quizAnswers.append(scorePara);
	
	var initialsForm = document.createElement("form");
	initialsForm.innerHTML = "<label for=\"inputInitials\">Input initials:</label>\n\
							  <input type=\"text\" id=\"inputInitials\" name=\"inputInitials\" />\n\
							  <button class=\"submitBtn btn\">Submit</button>";
	initialsForm.setAttribute("style", "padding: 8px;");
	quizInput.append(initialsForm);
}

function showHighscores(e) {
	e.preventDefault();
	clearPage();

	var title = document.createElement("h1");
	title.textContent = "High Scores:";
	title.setAttribute("class", "title");
	quizPrompt.append(title);

	var backBtn = document.createElement("button");
	backBtn.textContent = "Restart Quiz";
	backBtn.setAttribute("class", "backBtn btn");
	quizInput.append(backBtn);

	var clearBtn = document.createElement("button");
	clearBtn.textContent = "Clear List";
	clearBtn.setAttribute("class", "clearBtn btn");
	quizInput.append(clearBtn);
}

function startPage() {
	clearPage();
	t = 0;
	clock.textContent = t;

	var title = document.createElement("h1");
	title.textContent = "JavaScript Code Quiz";
	title.setAttribute("class", "title");
	quizPrompt.append(title);

	var description = document.createElement("article");
	description.textContent = "Race against the clock to answer questions about JavaScript fundamentals.  The faster you finish, the higher your score!  Watch out for incorrect answers though, you will lose time for them!";
	description.setAttribute("class", "description");
	quizAnswers.append(description);

	var start = document.createElement("button");
	start.textContent = "Start Quiz!";
	start.setAttribute("class", "startBtn btn");
	quizInput.append(start);
}

function clearList() {
	var answersChild = quizAnswers.lastElementChild;

	while(answersChild) {
		quizAnswers.removeChild(answersChild);
		answersChild = quizAnswers.lastElementChild;
	}
}

function inputButtons(e) {
	e.preventDefault();

	switch(e.target.classList[0]) {
		case "startBtn":
			newQuiz(e);
			break;

		case "submitBtn":
			showHighscores(e);
			break;

		case "backBtn":
			startPage();
			break;

		case "clearBtn":
			clearList();
			break;
	}
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

highcoreBtn.addEventListener("click", showHighscores);
quizAnswers.addEventListener("click", newQuestion);
quizInput.addEventListener("click", inputButtons);