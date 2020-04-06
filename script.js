var highcoreBtn = document.querySelector(".highscoreBtn");
var quizWrapper = document.querySelector(".quiz_wrapper");
var startBtn = document.querySelector(".startBtn");
var quizPrompt = document.querySelector(".quiz_prompt");
var title = document.querySelector(".title");
var quizAnswers = document.querySelector(".quiz_answers");
var description = document.querySelector(".description");
var clock = document.querySelector(".clock");
var quizInput = document.querySelector(".quiz_input");
var correctness = document.querySelector(".correctness");

// variable to hold questions/answers
var questionsArr = [
	["What JavaScript command would you use to print output to the browser console?", "console.log()", "alert()", "prompt()", "for loop"],
	["JavaScript arrays can contain: ", "all of these" , "strings", "numbers", "arrays"],
	["What JavaScript control structure would you use to repeat code multiple times?", "for loop", "if statement", "switch", "function()"],
	["In JavaScript, strict equality is symbolized by: ", "===" , "==", ".isEqual()", "!="],
	["Math.random() returns a number: ", "between 0 and 1", "between -10 and 10", "between 0 and 9", "between 1 and 10"],
	["Objects contain elements in the form: ", "key: value", "index: value", "function: call", "if: else"],
	["In JavaScript, the \"this\" operator references: ", "the parent object or variable", "the parent function", "the previous variable", "the HTML code"]
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
	countdown();
}

function newQuestion(e) {
	if(!e.target.matches("button")) {
		return;
	}
	
	if(questionNumber >= QUIZ_LENGTH) {
		stopCountdown(e);
		return;
	}
	
	// remove previous info from page
	clearPage();
	checkAnswer(e);
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
		answer.textContent = i + ":  " + questionsArr[whichQuestion][whichAnswer];
		answer.setAttribute("class", "answerBtn btn");
		if(whichAnswer === 1) {
			answer.setAttribute("data-correct", "true");
		} else {
			answer.setAttribute("data-correct", "false");
		}
		quizAnswers.append(answer);
	}
	
	questionNumber++;
}

function countdown() {
	if(t === 0) {
		stopCountdown();
		return;
	}
	
	t--;
	oneSec = setTimeout(function() {
		countdown();
	}, 1000);

	clock.textContent = t;
}

function stopCountdown(e) {
	finishQuiz(e);
	clearTimeout(oneSec);
}

function checkAnswer(e) {
	var correctIncorrect;
	if(e.target.classList[0] === "answerBtn") {
		if(e.target.getAttribute("data-correct") === "true") {
			correctIncorrect = document.createElement("h3");
			correctIncorrect.textContent = "Correct Answer!";
			correctIncorrect.setAttribute("class", "description");
			correctness.append(correctIncorrect);
			
		} else {
			correctIncorrect = document.createElement("h3");
			correctIncorrect.textContent = "Incorrect Answer!";
			correctIncorrect.setAttribute("class", "description");
			correctness.append(correctIncorrect);
			
			t -= 10;
			clock.textContent = t;
		}
	}
}

function finishQuiz(e) {
	clearPage();
	checkAnswer(e);
	var score = t;
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

	var input = document.querySelector(".submitBtn");
	input.addEventListener("click", function(e) {
		var player = {
			name: document.querySelector("#inputInitials").value,
			score: t,
		}

		if(player.name === "") {
			alert("Initials cannot be blank");
		} else {
			var playerArray = [];
			if(localStorage.getItem("playerArray") !== null) {
				playerArray = (JSON.parse(localStorage.getItem("playerArray")));
			}

			playerArray.push(player);
			localStorage.setItem("playerArray", JSON.stringify(playerArray));

			showHighscores(e);
		}
	});
}

function showHighscores(e) {
	e.preventDefault();
	clearPage();

	var title = document.createElement("h1");
	title.textContent = "High Scores:";
	title.setAttribute("class", "title");
	quizPrompt.append(title);

	if(localStorage.getItem("playerArray") !== null) {
		var playerArray = JSON.parse(localStorage.getItem("playerArray"));

		for(var i = 0; i < (playerArray.length - 1); i++) {
			for(var j = 0; j < (playerArray.length - 1); j++) {
				if(playerArray[j].score < playerArray[j + 1].score) {
					var temp = playerArray[j];
					playerArray[j] = playerArray[j + 1];
					playerArray[j + 1] = temp;
				}
			}
		}

		playerArray.forEach(player => {
			var playerSlot = document.createElement("article");
			playerSlot.setAttribute("class", "player_slot");
			quizAnswers.append(playerSlot);

			var playerName = document.createElement("p");
			playerName.setAttribute("class", "player_info");
			playerName.textContent = player.name;
			var playerScore = document.createElement("p");
			playerScore.setAttribute("class", "player_info");
			playerScore.textContent = player.score;

			playerSlot.append(playerName);
			playerSlot.append(playerScore);
		});
	}

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

	localStorage.clear();
}

function inputButtons(e) {
	e.preventDefault();

	switch(e.target.classList[0]) {
		case "startBtn":
			newQuiz(e);
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
	var correctChild = correctness.lastElementChild;

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
	while(correctChild) {
		correctness.removeChild(correctChild);
		correctChild = correctness.lastElementChild;
	}
}

highcoreBtn.addEventListener("click", showHighscores);
quizAnswers.addEventListener("click", newQuestion);
quizInput.addEventListener("click", inputButtons);