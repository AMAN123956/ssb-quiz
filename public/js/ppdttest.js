// OIRTEST ONE HAS COUNTER SET TO ZERO
// REMEMBER
let correctAnswer = ["good","excellent"];
let enteredAnswer = [];

// Random Number Generation For Correct Option 
const startQuiz = document.getElementById("startQuiz");
const instructionBox = document.querySelector(".instruction-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-section");
// imageBox
const imageBox = document.querySelector(".image-box")
// text box 
const textBox = document.querySelector(".text-box")
//Default textBox should be hidden and image Box should be shown for 1 min 
//and then image box to be hidden and text box to be shown

// Time Over Box
const timeOverBox = document.querySelector(".time-over")
timeOverBox.style.display = "none";

startQuiz.addEventListener("click", (e) => {
    instructionBox.style.display = "none";
    quizBox.style.display = "block";
    textBox.style.display = "none";
    timeOverBox.style.display = "none";
    setTimeout(() => {
        imageBox.style.display = "none";
        textBox.style.display = "block";
        var fiveMinutes = 60 * 3,
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    },10000)
   
})


// highscore from database
const highest = document.getElementById("highest").innerHTML;
// input box whose value is to be set 
const highScore = document.querySelectorAll(".highScore");
console.log(highScore);
// type of user
const type = document.getElementById("typeOfUser").innerHTML;
console.log("type",type)
// first time user form
const firstOIR = document.getElementById("firstPPDT");
// returning user form
const returnOIR = document.getElementById("returnPPDT");
console.log(firstOIR);
const submitBtn = document.getElementById("submit");



/* On Click of Submit Btn 
   1.Display result section
   2.Hide Quiz-Box Section
*/
 // new user
 if (type == 1) {
    console.log("it runs")
    firstOIR.style.display = "block";
    returnOIR.style.display = "none";
}
// old user
else {
    firstOIR.style.display = "none";
    returnOIR.style.display = "block";
}

submitBtn.addEventListener("click", (e) => {
    console.log("it runs")
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    
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

           // timer = duration;
            quizBox.style.display = "none";
            timeOverBox.style.display = "block";
        }
    }, 1000);
}

// Random Img Generation 
let random_img = Math.floor(Math.random() * 5)
console.log(random_img)
let img = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLiXlW5FkfnFj3oNJezcNVjg6d8rLlP37mbQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjfCqAa4pNRwtpjYR4qkMH3BVWHeRvn9Achw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReZDsH9snQGWoI-buFC2Lws7aQXwomq0jMOw&usqp=CAU',
    'https://tpc.googlesyndication.com/simgad/12606574341937875200?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qkc6DCHlREmPoQngmzAoxKMvAM_5g',
    ''
]
/* Image number Input Box */
const imageNumber = document.getElementById("image-number");
imageNumber.value = random_img;

const testImg = document.getElementById("test-img");
testImg.src=img[random_img]