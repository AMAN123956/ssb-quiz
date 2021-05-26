const { First, Third, OirTestOne, OirTestTwo, OirTestThree, OirTestFour, oirTestFive } = require('../../models/quizModel')
const Question = require('../../models/saveQuestion')
const Data = require('../../models/dataModel')

// FINAL SECTION

// @desc FINAL OIR TEST THAT NEEDS TO BE SAVED TO GENERAL DATA TO SHOW PROGRESS
// OIR TEST PAGES FINAL **** 
const finalOir = async (req, res) => {
    let picture = "";
    let totalQues = 0;
    let count = 0;
    let highscore = 0;
    let firstTime = 0;
    if (req.isAuthenticated()) {
      picture = req.user.picture;
      // To find number of attempts 
      await First.find({ email: req.user.email }, function (err, data) {
        if (err) {
          console.log(err);
        }
        else{
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
          res.render("oirtest", { picture: picture, email: req.user.email, username: req.user.username, totalQues: totalQues, count: count, highscore: highscore, firstTime: firstTime });
        }
      })
     
    }
    else {
      res.redirect("/login");
    }
}

// Post Request To Save Progress for new user OIR Model First FINAL ONE****
const savefinalOir = async (req, res) => {
    console.log(req.body);
    const data = new First(req.body);
    data.save();
    const entry = new Data({
      email: req.user.email,
      firstHighScore: req.body.highscore,
      firstCount: req.body.count,
    });
    entry.save();
    setTimeout(() => {
      res.redirect("/landing");
    }, 1000);
}

  // Post Request To Update Progress for old user OIR Model First FINAL ONE ****
const savefinalreturnOir = async (req, res) => {
    if (req.isAuthenticated()) {
        await First.findOneAndUpdate({ email: req.user.email }, req.body, function (err, docs) {
           if(err) {
             console.log(err);
           }
           else {
             console.log("successfully updated");
             console.log(req.body);
             }
        })
        await Data.findOneAndUpdate({ email: req.user.email }, ({ firstHighScore: req.body.highscore, firstCount: req.body.count }), function (err, lastdocs) {
          if(err){
            console.log(err);
          }
          else {
            console.log(lastdocs);
          }
        })
        setTimeout(() => {
          res.redirect("/landing");
        }, 1000);
      }
      else{
        res.redirect("/login");
      }
}

module.exports = {finalOir,savefinalOir,savefinalreturnOir}