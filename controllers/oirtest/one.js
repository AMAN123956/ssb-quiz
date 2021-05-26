const { First, Third, OirTestOne, OirTestTwo, OirTestThree, OirTestFour, oirTestFive } = require('../../models/quizModel')
const Question  = require('../../models/saveQuestion')
console.log(Question)
// PRACTICE SETS FOR OIR TEST
// @desc NO NEED TO TRACK PROGRESS
// OIR TEST ONE PAGE
const one = async (req, res) => {
  
    let picture = "";
    let totalQues = 0;
    let count = 0;
    let highscore = 0;
    let firstTime = 0;
    if (req.isAuthenticated()) {
      picture = req.user.picture;
      // To find number of attempts 
      await OirTestOne.find({ email: req.user.email }, function (err, data) {
        if (err) {
          console.log(err);
        }
        else {
          if (data.length == 0) {
            count = 1;
            firstTime = 1;
          }
          else {
            count = data[0].count + 1;
            firstTime = 0;
            highscore = data[0].highscore;
          }
        }
      })
      await Question.find({}, function (err, ques) {
        if (err) {
          console.log(err);
        }
        else {
        
          console.log("total questions");
          totalQues = ques.length;
          console.log(totalQues);
          console.log(count);
          res.render("oirtestone", { picture: picture, email: req.user.email, username: req.user.username, totalQues: totalQues, count: count, highscore: highscore, firstTime: firstTime });
        }
      })
   
    }
    else {
      res.redirect("/login");
    }
  
 
}


// POST REQUEST TO SAVE PROGRESS FOR OIRTESTONE
// Post Request To Save Progress for new user OIRTESTONE Model  First Practice
const saveone = async (req, res) => {
  console.log("post happend");
  console.log(req.body);
  const data = await new OirTestOne(req.body);
  data.save();
  setTimeout(() => {
    res.redirect("/oir/home");
  }, 1000);
  
}

// Post Request To Update Progress for old user OIRTESTONE Model First PRACTICE
const savereturnone = async (req, res) => {
    if (req.isAuthenticated()) {
        await OirTestOne.findOneAndUpdate({ email: req.user.email }, req.body, function (err, docs) {
           if(err) {
             console.log(err);
           }
           else {
             console.log("successfully updated");
             console.log(req.body);
             }
        })
        setTimeout(() => {
          res.redirect("/oir/home");
        }, 1000);
      }
      else{
        res.redirect("/login");
      } 
}

module.exports = {one,saveone,savereturnone}