require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

/*  const md5 = require("md5");  */
/* const bcrypt = require("bcrypt");
 const saltRounds = 10;   */
const app = express();
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.set("useCreateIndex", true);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

// Model for General  Quiz Data 
const Data = require('./models/dataModel.js')

//Model to save Question
const Question = require('./models/saveQuestion')

// First and Third Type + OIR TESTS
const {First,Third,OirTestOne,OirTestTwo,OirTestThree,OirTestFour,OirTestFive} = require('./models/quizModel')










// we need to change schema to encrypt 

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  googleId: String,
  picture: String

});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

/*  console.log(process.env.SECRET);     */
/* userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]}); */
// it must be declared above model
const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
let myEmail = "";
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/home",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      googleId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value
    }, function (err, user) {
      console.log(user);
      myEmail = user.email;
      return cb(err, user);
    });
  }
));
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', "email"]
  })
);

app.get('/auth/google/home',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/landing');
  });

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/landing", function (req, res) {
  let firstTime = 0;
  let count = 0;
  let firstHighScore = 0;
  let secondHighScore = 0;
  let thirdHighScore = 0;
  let firstCount = 0;
  let secondCount = 0;
  let thirdCount = 0;
  let picture = "";
  
  if (req.isAuthenticated()) {
    console.log(req.user);
    picture = req.user.picture;
    Data.find({
      email: req.user.email
    }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.log("length", data.length);
        /* checking whether it is first time user or returning user */
        if (data.length == 0) {
          firstTime = 0;
          console.log("first time User");
          res.render("landing", {
            email: req.user.email,
            username: req.user.username,
            picture: picture,
            typeOfUser: firstTime,
            count: count,
            firstHighScore: firstHighScore,
            firstCount: firstCount,
            secondHighScore: secondHighScore,
            secondCount: secondCount,
            thirdHighScore: thirdHighScore,
            thirdCount: thirdCount
          });
        } else {
          console.log("returning User");
          console.log(data);
          count = 1;
          firstTime = 1;
          /* Collectng Data from First Quiz */
        
        res.render("landing", {
          email: req.user.email,
          username: req.user.username,
          picture: picture,
          typeOfUser: firstTime,
          count: count,
          firstHighScore: data[0].firstHighScore,
          firstCount: data[0].firstCount,
          secondHighScore: data[0].secondHighScore,
          secondCount: data[0].secondCount,
          thirdHighScore: data[0].thirdHighScore,
          thirdCount: data[0].thirdCount
        });
        }
      }
    })


  } else {
    res.redirect("/login");
  }
});

app.get("/quizsetup", (req, res) => {
  res.render("quizsetup");
})

app.get("/questionlogic", (req, res) => {
  let question = "";
  Question.find({}, function (err, ques){
    if (err) {
      console.log(err);
    }
    else {
      console.log(ques);
      res.render("questionlogic",{ question: ques});
    }
   
  })
 
})

// OIRTEST SECTION
const oirTestRoute = require('./routes/oirtest')
app.use('/oir',oirTestRoute)












// Get Question for OIR TEST 
app.get("/findQuestion/:token", (req, res) => {
  let question = "";
  console.log("get request made");
  console.log(req.params.token);
  Question.find({}, function (err, ques){
    if (err) {
      console.log(err);
    }
    else {
      console.log(ques[req.params.token]);
      res.send(ques[req.params.token]);
    }
   
  })
})
// Post Request Handling for Saving questions to Database
app.post("/savequestion", (req, res) => {
  const ques = new Question(req.body);
  ques.save();
  res.send("Successfully Saved");
})
// OIR TEST ENDS
// ========================================================================================
// PPDT TEST STARTS
app.get("/ppdthome", (req, res) => {
  let picture = "";
  let username = "";
  let email = "";
  if (req.isAuthenticated()) {
    picture = req.user.picture;
    username= req.user.username;
    email=req.user.email;
    console.log(picture);
    res.render("ppdthome",
      {
        picture: picture,
        username: username,
        email: email
    });
  }  
  else {
    res.redirect("/login");
  }
  
})
// PPDT TEST
app.get("/ppdttest", (req, res) => {
  let picture = "";
  let totalQues = 0;
  let count = 0;
  let highscore = 0;
  let firstTime = 0;
  if (req.isAuthenticated()) {
    picture = req.user.picture;
    // To find number of attempts 
    Second.find({ email: req.user.email }, function (err, data) {
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
    res.render("ppdttest", { picture: picture, email: req.user.email, username: req.user.username,count: count, highscore: highscore, firstTime: firstTime });
    
  }
  else {
    res.redirect("/login");
  }
})

app.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});
app.get("/register", function (req, res) {
  res.render("register");
})
app.get("/login", function (req, res) {
  res.render("login");
})

// Profile Page Get Request 
app.get("/profile", (req, res) => {
  let picture = "";
  if (req.isAuthenticated()) {
    picture = req.user.picture;
    res.render("profile", {
      username: req.user.username,
      email: req.user.email,
      picture: picture
    });
  }
  else {
    res.redirect("/login");
  }
  
})



// Landing Page Line Chart and Pie Chart Data Collection
/*app.get("/firstQuiz/:token", (req, res) => {
  console.log("Token Info");
  console.log(req.params.token);
  First.find({ email: req.params.token }, function (err, one) {
     if(err){
       console.log(err);
    }
     else {
       res.send(one);
    }
   })
})
*/


// Save Data to General Model
app.post("/saveData", (req,res) => {
  if (req.isAuthenticated()) {
    console.log("post request made");
    const firstHighScore = req.body.firstHighScore;
    const firstCount = req.body.firstCount;
    console.log("first Count");
    console.log(firstCount);
    const entry = new Data({
      email: req.user.email,
      firstHighScore: firstHighScore,
      firstCount: firstCount,
    });
    entry.save();
  }
  else {
  res.redirect("/login");
  }
})


app.listen(3000, function () {
  console.log("server is running on port 3000");
});