var startButton = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");
var viewHS = document.querySelector("#viewHS");
var ROW = document.querySelector("#ROW");
var scoreEl = document.querySelector("#score")
var wrapper = document.querySelector("#wrapper")
var highscores = [];

var questionsO ={
                  0: "Arrays in JavaScript can be used to store:", 
                  1: "A very useful tool used during development and debugging for printing content to the debugger is:", 
                  2: "The condition in an if / else statement is enclosed with:", 
                  3: "String values must be enclosed within ___ when being assigned to variables.", 
                  4: "Commonly used data types in JavaScript DO not include:"
                };
var answersO ={
                0: ["Numbers and Strings","Other Arrays","Booleans","All of the above"],
                1: ["console.log","Terminal/Bash","for Loops","JavaScript"],
                2: ["Quotes","Curly Brackets","Parenthesis","Square Brackets"],
                3: ["Commas","Curly Brackets","Quotes","Parenthesis"],
                4: ["Strings","Alerts","Booleans","Numbers"]
              };
var key = ["A3","A0","A2","A2","A1"];

// Timer function
var timeLeft = 31;
var hasFinished = false;
function startTiming() {
  var clock = setInterval(function(){
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(clock);
      ranOutOfTime(hasFinished);
    }
  },1000)}

//Next Question
function nextQuestion() {
  for(i=0;i<4;i++){
    document.getElementById("A"+i).remove();
  }
  if(questionNum < 5){quizzingStart();}
  else if(questionNum === 5){ 
    endOfQuiz();
  }
}

//When time runs out
function ranOutOfTime(hasFinished){
  if(hasFinished !== true) {endOfQuiz();}
}

//End of quiz
function endOfQuiz(){
  hasFinished = true;
  var score = timeLeft;
  question.textContent = "All done!"
  answers.textContent = "Your final score is " + score + ".";
  scoreEl.style.visibility = "hidden";
  timer.style.visibility = "hidden";
  //makes form area
  var finalForm = document.createElement("form");
  var input = document.createElement("input");
  var submitButton = document.createElement("button");
  wrapper.appendChild(finalForm);
  finalForm.setAttribute("id","finalForm");
  finalForm.appendChild(input);
  input.setAttribute("id","name");
  input.setAttribute("maxlength",3);
  finalForm.appendChild(submitButton);
  submitButton.setAttribute("id","submitButton");
  submitButton.textContent = "Submit";
  //prevents enter from refreshing page
  input.addEventListener("keydown",function(event){if(event.key === "Enter"){event.preventDefault();}})
  
  submitButton.addEventListener("click", function(event){
    event.preventDefault();
    addToStorage(score);})
}

//Adding score & name to storage, then sorts
function addToStorage(score){
  var name = document.getElementById("name");
   if (window.localStorage.getItem("highscores") !== null){
    highscores = JSON.parse(window.localStorage.getItem("highscores"));
   }
   if (name !== null){
    var currentSession = {
      name: name.value,
      score: score
     }
     highscores.push(currentSession);
     highscores.sort((a,b) => b.score-a.score);
     localStorage.setItem("highscores", JSON.stringify(highscores));
   }
   toHSScreen();
}

//High Score Screen
function toHSScreen(){
  scoreEl.remove();
  wrapper.innerHTML = "<table class='center' id='thetable'></table>";
  table = document.querySelector("#thetable");

  table.insertRow().setAttribute("id","toprow")
  toprow.insertCell(0).innerHTML = "<h2>Initials</h2>";
  toprow.insertCell(1).innerHTML = "<h2>Score</h2>";

  for (i=0;i<highscores.length;i++) {
    var rows = table.insertRow(i+1);
    var cell1 = rows.insertCell(0);
    var cell2 = rows.insertCell(1);
    cell1.innerHTML = highscores[i].name;
    cell2.innerHTML = highscores[i].score;
  }
  var goBackB = document.createElement("button");
  var clearLSB = document.createElement("button")
  goBackB.setAttribute("id","goBack");
  clearLSB.setAttribute("id","clear")
  clearLSB.textContent = "Clear high scores"
  goBackB.textContent = "Start Over"
  wrapper.appendChild(goBackB);
  wrapper.appendChild(clearLSB);
  goBackB.addEventListener("click", function(){;location.reload();})
  clearLSB.addEventListener("click", function(){
    var reset = confirm("Are you sure you want to clear high scores?");
    if(reset === true){localStorage.clear(); location.reload();}
  })
}

//Main quiz
var questionNum = 0;
var score = 0;
function quizzingStart() {
//show question
  question.textContent = questionsO[questionNum];
  for(i=0; i<4; i++) {
//show possible answers
    var posAnswers = document.createElement("button");
    answers.appendChild(posAnswers);
    posAnswers.textContent = answersO[questionNum][i];
    posAnswers.setAttribute("id", "A"+i);
    posAnswers.setAttribute("class", "buttins");
    posAnswers.addEventListener("click", function(){
//answer checking
      if(this.id === key[questionNum]){
        timeLeft += 5;
        ROW.textContent = "Correct";
        document.body.style.backgroundColor = "green";
        setTimeout(function(){ROW.textContent = "";}, 500);
        setTimeout(function(){document.body.style.backgroundColor = "transparent";},500);
        questionNum++;
        nextQuestion();
      }
      else{
        timeLeft -= 5;
        ROW.textContent = "Try again!";
        document.body.style.backgroundColor = "red";
        setTimeout(function(){ROW.textContent = "";}, 500);
        setTimeout(function(){document.body.style.backgroundColor = "transparent";},500);
      }
    })
  }
}

startButton.addEventListener("click", function(){
  startButton.remove();
  viewHS.remove();
  scoreEl.style.visibility = "visible";
  startTiming();
  quizzingStart();
});
viewHS.addEventListener("click", function(){
  startButton.remove();
  viewHS.remove();
  addToStorage();
})