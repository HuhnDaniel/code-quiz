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

// starts quiz when start button is clicked
function startQuiz() {
	quizWrapper.setAttribute("style", "text-align: left;");

	// replace #title with question prompt
	var question = document.createElement("h2");
	question.textContent = questionsArr[0][0];
	title.setAttribute("style", "display: none;");
	quizPrompt.append(question);

	// make elements for each answer
	description.setAttribute("style", "display: none;");
	for(var i = 1; i < questionsArr[0].length; i++) {
		var answer = document.createElement("article");
		answer.textContent = questionsArr[0][i];
		quizAnswers.append(answer);
	}

	startBtn.setAttribute("style", "display: none");
}