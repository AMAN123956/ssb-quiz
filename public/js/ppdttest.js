// OIRTEST ONE HAS COUNTER SET TO ZERO
// REMEMBER
let correctAnswer = ["good","excellent"];
let enteredAnswer = [];

// Random Number Generation For Correct Option 
const startQuiz = document.getElementById("startQuiz");
const instructionBox = document.querySelector(".instruction-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-section");
startQuiz.addEventListener("click", (e) => {
    instructionBox.style.display = "none";
    quizBox.style.display = "block";
    var fiveMinutes = 60 * 5,
    display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
})


// highscore from database
const highest = document.getElementById("highest").innerHTML;
// input box whose value is to be set 
const highScore = document.querySelectorAll(".highScore");
console.log(highScore);
// type of user
const type = document.getElementById("typeOfUser").innerHTML;
// first time user form
const firstOIR = document.getElementById("firstOIR");
// returning user form
const returnOIR = document.getElementById("returnOIR");

const submitBtn = document.getElementById("submit");
const attemptedQuestion = document.getElementById("attemptedQuestion");
const correctQuestion = document.getElementById("correctQuestion");
const inCorrectQuestion = document.getElementById("inCorrectQuestion");
const totalQues = document.getElementById("totalQuestion");
const scoreBox = document.getElementById("scoreBox");
const percentage = document.getElementById("percentage");
const remarks = document.getElementById("remarks");

// Circles at the top to track user's progress
const circle = document.querySelectorAll(".circle");
console.log(circle);

/* On Click of Submit Btn 
   1.Display result section
   2.Hide Quiz-Box Section
*/


submitBtn.addEventListener("click", (e) => {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    const userAnswer = document.getElementById("user-answer").value;
    let score = 0;
    enteredAnswer.push(userAnswer.split(" "));
    console.log(enteredAnswer[0]);
    for (let i = 0; i < enteredAnswer[0].length; i++){
        for (let j = 0; j < correctAnswer.length; j++){
            if (enteredAnswer[0][i] == correctAnswer[j]) {
                score += 2;
            }
            else {
                score += 0;
            }
        }
    }


    
let totalScore = ((Number(correctAnswer.length))*2);
let perc = 0;
perc = Math.floor(score*100 / totalScore);
scoreBox.innerHTML = score;
totalQues.innerHTML = Number(correctAnswer.length);
correctQuestion.innerHTML = score / 2;
inCorrectQuestion.innerHTML = (enteredAnswer[0].length) - (score / 2);
percentage.innerHTML = perc;
 if (perc >= 70) {
     remarks.innerHTML = "PASS";
     remarks.style.color = "green";
    }  
 else {
     remarks.innerHTML = "FAIL";
     remarks.style.color = "red";
    }
    
    console.log(score);

   // new user
    if (type == 1) {
        firstOIR.style.display = "block";
        returnOIR.style.display = "none";
    }
    // old user
    else {
        firstOIR.style.display = "none";
        returnOIR.style.display = "block";
    }

    if (type != 1) {
        if (score > highest) {
            highScore[1].value = Number(score);
           
            console.log("thisruns");
        }
        else {
            highScore[1].value = highest;
        }
    }
    else {
        highScore[0].value = score;
    }
});


/* Variables to save Score,Correct Answer,Incorrect Answers */
// Countdown Timer
// Set the date we're counting down to
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

