var quizWrapper = document.querySelector("#quiz_wrapper");
var startBtn = document.querySelector("#startBtn");
var quizPrompt = document.querySelector(".quiz_prompt");
var title = document.querySelector("#title");
var quizAnswers = document.querySelector(".quiz_answers");
var description = document.querySelector("#description");
// variable to hold questions/answers
var questionsArr = [
	["What JavaScript command would you use to print output to the browser console?", "A: console.log()", "B: alert()", "C: prompt()", "D: for loop"],
	["JavaScript arrays can contain: ", "A: strings", "B: numbers", "C: arrays", "D: all of these"],
	["What JavaScript control structure would you use to repeat code multiple times?", "A: if statement", "B: for loop", "C: switch", "D: function()"],
	["In JavaScript, strict equality is symbolized by: ", "A: ==", "B: .isEqual()", "C: !=", "D: ==="],
	["Math.random() returns a number: ", "A: between -10 and 10", "B: between 0 and 1", "C: between 0 and 9", "D: between 1 and 10"]
];

function newQuestion() {
	// remove previous info from page
	clearPage();
	quizWrapper.setAttribute("style", "text-align: left;");

	// chose a random question
	var whichQuestion = Math.trunc(Math.random() * questionsArr.length);
	
	// replace #title with question prompt
	var question = document.createElement("h2");
	question.textContent = questionsArr[whichQuestion][0];
	question.setAttribute("style", "padding: 8px;")
	quizPrompt.append(question);
	
	// make elements for each answer
	for(var i = 1; i < questionsArr[whichQuestion].length; i++) {
		var answer = document.createElement("article");
		answer.textContent = questionsArr[whichQuestion][i];
		answer.setAttribute("style", "padding: 8px;")
		quizAnswers.append(answer);
	}
}

// Code partially from GeeksforGeeks https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/
// function to clear elements to prepare for new elements
function clearPage() {
	var promptChild = quizPrompt.lastElementChild;
	var answersChild = quizAnswers.lastElementChild;

	while(promptChild) {
		quizPrompt.removeChild(promptChild);
		promptChild = quizPrompt.lastElementChild;
	}
	while(answersChild) {
		quizAnswers.removeChild(answersChild);
		answersChild = quizAnswers.lastElementChild;
	}
}