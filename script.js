var startButton = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");

var questionsO ={
                  0: "Arrays in JavaScript can be used to store:", 
                  1: "A very useful tool used during development and debugging for printing content to the debugger is:", 
                  2: "The condition in an if / else statement is enclosed with:", 
                  3: "String values must be enclosed within ___ when being assigned to variables.", 
                  4: "Commonly used data types in JavaScript DO not include:"
                };
var answersO ={
                0: ["Numbers and Strings","Other Arrays","Booleans","All of the above"],
                1: ["JavaScript","Terminal/Bash","for Loops","console.log"],
                2: ["Quotes","Curly Brackets","Parenthesis","Square Brackets"],
                3: ["Commas","Curly Brackets","Quotes","Parenthesis"],
                4: ["Strings","Alerts","Booleans","Numbers"]
              };
var key = ["A0","A3","A2","A2","A1"];

//console.log(answersO[1][0]);

// Timer function
var timeLeft = 31;
function startTiming() {
  var clock = setInterval(function(){
    timeLeft--;
    timer.textContent = timeLeft;

//    console.log("time left: " + timeLeft);

    if (timeLeft <= 0) {
      clearInterval(clock);
      //ADD END QUIZ
    }
  },1000)}

function nextQuestion() {
  for(i=0;i<4;i++){
    document.getElementById("A"+i).remove();
  }
  quizzingStart();
}


//todo: nextQuestion() which clears the buttons & question elements, checks whether the answer is right, then calls quizzing() again
// OR, just replaces the text within the buttons & which one is considered right, and loops quizzing until all questions have been asked


var questionNum = 0;
var score = 0;
var scratch;
//Main quiz
function quizzingStart() {
  startTiming();
  startButton.setAttribute("style","display:none");
//show question
  question.textContent = questionsO[questionNum];
  for(i=0; i<4; i++) {
//show possible answers
    var posAnswers = document.createElement("button");
    answers.appendChild(posAnswers);
    posAnswers.textContent = answersO[questionNum][i];
    posAnswers.setAttribute("id", "A"+i);
    posAnswers.addEventListener("click", function(){
//answer checking
      if(this.id === key[questionNum]){
        score += 10;
        timeLeft += 5;
        questionNum++;
        document.body.style.backgroundColor = "green";
        var timeouting = setTimeout(function(){document.body.style.backgroundColor = "transparent";},500).then(clearTimeout(timeouting));
        nextQuestion();
      }
      else{
        timeLeft -= 5;
        document.body.style.backgroundColor = "red";
        var timeouting = setTimeout(function(){document.body.style.backgroundColor = "transparent";},500).then(clearTimeout(timeouting));
      }
    })
  }
}

startButton.addEventListener("click", function(){
  quizzingStart();
});
//EXAMPLE viewHS.addEventListener("click", function(){ viewHS() }})