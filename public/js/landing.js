/*  Pie Chart Management */
const typeOfUser = document.getElementById("typeOfUser").innerHTML;
console.log(typeOfUser);
const pieChart = document.getElementById("pieChart");
const firstUserText = document.getElementById("firstUserText");


/* Line Chart Management */
const firstUserLineText = document.getElementById("firstUserLineText");
const lineChart = document.getElementById("lineChart");

if (typeOfUser == 0) {
    pieChart.style.display = "none";
    firstUserText.style.display = "block";
/* Line Chart */
    lineChart.style.display = "none";
    firstUserLineText.style.display = "block";
}
else {
    pieChart.style.display = "block";
    firstUserText.style.display = "none";
/* Line Chart */
   lineChart.style.display = "block";
   firstUserLineText.style.display = "none";
}

/* Post Requset Management */
const firstBtn = document.getElementById("firstBtn");
firstBtn.addEventListener("click", (e) => {
    alert("clicked");
})


const userEmail = document.getElementById("userEmail").innerHTML;
/*
getData();
let firstHighScore = 0;
let dataOne = 0;
let count = 0;
let first = 1;
async function getData() {
    const res = await fetch(`/firstQuiz/${userEmail}`);
    dataOne = await res.json();
    console.log(dataOne[0].highscore);
    firstHighScore = dataOne[0].highscore;
    firstCount = dataOne[0].count;
    const firstData = { firstHighScore, firstCount };
        console.log(firstData);
        const options = {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(firstData)

    };
    fetch(`/saveData`,options);
}
*/