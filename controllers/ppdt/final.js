const  Second  = require('../../models/ppdtModel')
const Data = require('../../models/dataModel')

const test = async (req, res) => {
    let picture = "";
    let totalQues = 0;
    let count = 0;
    let highscore = 0;
    let firstTime = 0;
    let imgnumber = 0;
    if (req.isAuthenticated()) {
      picture = req.user.picture;
      // To find number of attempts 
      await Second.find({ email: req.user.email }, function (err, data) {
        if (err) {
          console.log(err);
        }
        else{
          if (data.length == 0) {
            count = 1;
            firstTime = 1;
            imgnumber = 2;
          }
          else {
            console.log("count",data)
            count = data[0].count + 1;
            firstTime = 0;
            highscore = data[0].highscore;
            /*
            imgnumber = data[0].imagenumber;
            */
            imgnumber = 2;
          }
        }
      })
      res.render("ppdttest", { picture: picture, email: req.user.email, username: req.user.username,count: count, highscore: highscore, firstTime: firstTime, imgnumber: imgnumber });
      
    }
    else {
      res.redirect("/login");
    }
}



const savetest = async (req, res) => {
  console.log("req"+req.body);
  const data = await new Second(req.body);
  await data.save();
  const entry =await new Data({
    email: req.user.email,
    secondHighScore: req.body.highscore,
    secondCount: req.body.count,
  });
  await entry.save();
  setTimeout(() => {
    res.redirect("/landing");
  }, 1000);
}

 // Post Request To Update Progress for old user OIR Model First FINAL ONE ****
 const savereturn = async (req, res) => {
  if (req.isAuthenticated()) {
      await Second.findOneAndUpdate({ email: req.user.email }, req.body, function (err, docs) {
         if(err) {
           console.log(err);
         }
         else {
           console.log("successfully updated");
           console.log(req.body);
           }
      })
      await Data.findOneAndUpdate({ email: req.user.email }, ({ secondHighScore: req.body.highscore, secondCount: req.body.count }), function (err, lastdocs) {
        if(err){
          console.log(err);
        }
        else {
          console.log(lastdocs);
        }
      })
      setTimeout(() => {
        res.redirect("/ppdt/result");
      }, 1000);
    }
    else{
      res.redirect("/login");
    }
}
const ppdtresult = async (req, res) => {
   res.render("ppdtresult",{name: req.user.email,picture: req.user.picture,username: req.user.username})
}
module.exports = {test,savetest,savereturn,ppdtresult}