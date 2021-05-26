// OIRTEST ONE HAS COUNTER SET TO ZERO
// REMEMBER
let correctAnswer = []
let counter = 0;
let userSelectedOption = [
    {
        selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
    option: -1
},
{
    selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
        option: -1
    },
    {
        selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
    option: -1
},
{
    selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
        option: -1
    },
    {
        selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
    option: -1
},
{
    selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
        option: -1
    },
    {
        selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
    option: -1
},
{
    selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
        option: -1
    },
    {
        selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
    option: -1
},
{
    selectedOption: "none",
        option: -1
},
{
    selectedOption: "none",
        option: -1
}


];
console.log(userSelectedOption);
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

let correctOptionNumber = Math.floor(Math.random()*(5-1)+1);
console.log(correctOptionNumber);
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
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
// total Questions 
const total = document.getElementById("total").innerHTML;
// Circles at the top to track user's progress
const circle = document.querySelectorAll(".circle");
console.log(circle);
/* Question and Option Code */
const question = document.getElementById("question");
const firstOption = document.getElementById("oOne");
const secondOption = document.getElementById("oTwo");
const thirdOption = document.getElementById("oThree");
const fourthOption = document.getElementById("oFour");
// Span Tags Of Options
const firstOptionText = document.getElementById("firstOptionText");
const secondOptionText = document.getElementById("secondOptionText");
const thirdOptionText = document.getElementById("thirdOptionText");
const fourthOptionText = document.getElementById("fourthOptionText");
/* Radio Button */
let ele = document.getElementsByName('options'); 
getFirstQuestion();
if (counter == 0) {
    previousBtn.style.display = "none";
}
else {
    previousBtn.style.display = "block";
}
nextBtn.addEventListener("click", (e) => {
   for(let i=0;i<ele.length;i++){
       ele[i].checked=false;
   }
   correctOptionNumber =  Math.floor(Math.random()*(5-1)+1);
   console.log(correctOptionNumber);
    counter=counter+1;
    getQuestion();
})

previousBtn.addEventListener("click", (e) => {
    counter=counter-1;
    correctOptionNumber = Math.floor(Math.random()*(5-1) + 1);
    getQuestion();
})

function hello(value,number){
    console.log("checked");
    userSelectedOption[counter] = {
        selectedOption: value,
        option: number
    }
    console.log(userSelectedOption);
    circle[counter].style.background = "green";
}

async function getQuestion(){
    const res = await fetch(`/findQuestion/${counter}`);
    const data = await res.json();
    correctAnswer[counter] = data.correctAnswer;
    console.log(data);
    console.log("correct answer");
    console.log(correctAnswer);
    console.log("counter", counter);
    if (counter == 0) {
        previousBtn.style.display = "none";
        nextBtn.style.display = "inline-block";
    }
    else if (counter == 2) {
        nextBtn.style.display = "none";
        previousBtn.style.display = "inline-block";
    }
    else {
        previousBtn.style.display = "inline-block";
        nextBtn.style.display = "inline-block";
    }
   
    question.innerHTML = data.question;
  
        firstOption.value = data.firstOption;
        firstOptionText.innerHTML = data.firstOption;
        secondOption.value = data.secondOption;
        secondOptionText.innerHTML = data.secondOption;
        thirdOption.value = data.thirdOption;
        thirdOptionText.innerHTML = data.thirdOption;
        fourthOption.value = data.fourthOption;
        fourthOptionText.innerHTML = data.fourthOption;
         
        if(userSelectedOption[counter].option!=-1){

            let choosenOne = userSelectedOption[counter].option;
            console.log(choosenOne);
            if(choosenOne == 1){
                firstOption.checked = true;
            }
            else if(choosenOne == 2){
                secondOption.checked=true;
            }
            else if(choosenOne == 3){
                thirdOption.checked = true;
            }
            else if(choosenOne == 4){
                fourthOption.checked = true;
            }
            
        }
        else{
            firstOption.checked=false;
            secondOption.checked=false;
            thirdOption.checked=false;
            fourthOption.checked=false;
        }
   
       
    
   
}

/* Get First Question */
async function getFirstQuestion(){
    const res = await fetch(`/findQuestion/${counter}`);
    const data = await res.json();
    correctAnswer[counter] = data.correctAnswer;
    console.log(data);
    console.log("correct answer");
    console.log(correctAnswer);
    console.log("counter",counter);
    question.innerHTML = data.question;
  
        firstOption.value = data.firstOption;
        firstOptionText.innerHTML = data.firstOption;
        secondOption.value = data.secondOption;
        secondOptionText.innerHTML = data.secondOption;
        thirdOption.value = data.thirdOption;
        thirdOptionText.innerHTML = data.thirdOption;
        fourthOption.value = data.fourthOption;
        fourthOptionText.innerHTML = data.fourthOption;
}



/* On Click of Submit Btn 
   1.Display result section
   2.Hide Quiz-Box Section
*/


submitBtn.addEventListener("click", (e) => {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    let attempted = 0;
let score = 0;
for (let i = 0; i < userSelectedOption.length; i++){
    if (userSelectedOption[i].option != -1) {
        attempted += 1;
    }
    else {
        attempted += 0;
    }
    
}

for (let i = 0; i < userSelectedOption.length; i++){
    if (correctAnswer[i] == userSelectedOption[i].selectedOption) {
        score += 10;
    }
    else{
        score += 0;
    }
    }
    
let totalScore = total * 10;
let perc = 0;
perc = Math.floor(score*100 / totalScore);
scoreBox.innerHTML = score;
attemptedQuestion.innerHTML = attempted;
correctQuestion.innerHTML = score / 10;
inCorrectQuestion.innerHTML = attempted - (score / 10);
totalQues.innerHTML = total;
percentage.innerHTML = perc;
 if (perc >= 70) {
     remarks.innerHTML = "PASS";
     remarks.style.color = "green";
    }  
 else {
     remarks.innerHTML = "FAIL";
     remarks.style.color = "red";
    }
    console.log(attempted);
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

