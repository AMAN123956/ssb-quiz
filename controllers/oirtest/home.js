const { First,Third,OirTestOne, OirTestTwo, OirTestThree, OirTestFour, OirTestFive } = require('../../models/quizModel')

const oirhome = async (req, res) => {
    let oneHighScore = 0;
    let oneCount = 0;
    let twoHighScore = 0;
    let twoCount = 0;
    let threeHighScore = 0;
    let threeCount = 0;
    let fourHighScore = 0;
    let fourCount = 0;
    let fiveHighscore = 0;
    let fiveCount = 0;
    let oneStatus = "Not Attempted";
    let twoStatus = "Not Attempted";
    let threeStatus = "Not Attempted";
    let fourStatus = "Not Attempted";
    let fiveStatus = "Not Attempted";
    let finalHighScore = 0;
    let finalCount = 0;
    let finalStatus = "Not Attempted";
    if (req.isAuthenticated()) {
        console.log(req.user);
        // OIRTEST ONE
        await OirTestOne.find({ email: req.user.email }, function (err, one) {
            if (err) console.log(err);
            else {
                if (one.length == 0) {
                    oneHighScore = 0;
                    oneCount = 0;
                    oneStatus = "Not Attempted";
                }
                else {
                    console.log("OIR TEST ONE")
                    console.log(one);
                    oneHighScore = one[0].highscore;
                    if (oneHighScore >= 30) oneStatus = "PASS";
                    else oneStatus = "FAIL";
                    oneCount = one[0].count;
                    console.log("oneHighScore", oneHighScore);
                }

            }
        })
        /// OIRTEST TWO
        await OirTestTwo.find({ email: req.user.email }, function (err, two) {
            if (err) console.log(err);
            else {
                if (two.length == 0) {
                    twoHighScore = 0;
                    twoCount = 0;
                    twoStatus = "Not Attempted";
                }
                else {
                    console.log("OIR TEST Two")
                    console.log(two);
                    twoHighScore = two[0].highscore;
                    if (twoHighScore >= 30) twoStatus = "PASS";
                    else twoStatus = "FAIL";
                    twoCount = two[0].count;
                    console.log("twoHighScore", twoHighScore);
                }

            }
        })
        /// OIRTEST THREE
        await OirTestThree.find({ email: req.user.email }, function (err, three) {
            if (err) console.log(err);
            else {
                if (three.length == 0) {
                    threeHighScore = 0;
                    threeCount = 0;
                    threeStatus = "Not Attempted";
                }
                else {
                    console.log("OIR TEST Three")
                    console.log(three);
                    threeHighScore = three[0].highscore;
                    if (threeHighScore >= 30) threeStatus = "PASS";
                    else threeStatus = "FAIL";
                    threeCount = three[0].count;
                    console.log("threeHighScore", threeHighScore);
                }

            }
        })
        /// OIRTEST FOUR
        await OirTestFour.find({ email: req.user.email }, function (err, four) {
            if (err) console.log(err);
            else {
                if (four.length == 0) {
                    fourHighScore = 0;
                    fourCount = 0;
                    fourStatus = "Not Attempted";
                }
                else {
                    console.log("OIR TEST Four")
                    console.log(four);
                    fourHighScore = four[0].highscore;
                    if (fourHighScore >= 30) fourStatus = "PASS";
                    else fourStatus = "FAIL";
                    fourCount = four[0].count;
                    console.log("fourHighScore", fourHighScore);
                }

            }
        })
        /// OIRTEST Five
        await OirTestFive.find({ email: req.user.email }, function (err, five) {
            if (err) console.log(err);
            else {
                if (five.length == 0) {
                    fiveHighScore = 0;
                    fiveCount = 0;
                    fiveStatus = "Not Attempted";
                }
                else {
                    console.log("OIR TEST Five")
                    console.log(five);
                    fiveHighScore = five[0].highscore;
                    if (fiveHighscore >= 30) fiveStatus = "PASS";
                    else fiveStatus = "FAIL";
                    fiveCount = five[0].count;
                    console.log("fiveHighScore", fiveHighScore);
                }

            }
        })

        // FINAL First Model
        await First.find({ email: req.user.email }, function (err, final) {
            if (err) console.log(err);
            else {
                if (final.length == 0) {
                    finalHighScore = 0;
                    finalCount = 0;
                    finalStatus = "Not Attempted";
                }
                else {
                    console.log("OIR TEST Final")
                    console.log(final);
                    finalHighScore = final[0].highscore;
                    if (finalHighScore >= 30) finalStatus = "PASS";
                    else finalStatus = "FAIL";
                    finalCount = final[0].count;
                    console.log("finalHighScore", finalHighScore);
                }

            }
        })



        setTimeout(() => {
            console.log(oneHighScore, oneCount, oneStatus);
            console.log(fiveHighscore, fiveCount, fiveStatus);
            res.render("oirtesthome",
                {
                    picture: req.user.picture,
                    username: req.user.username,
                    email: req.user.email,
                    oneHighScore: oneHighScore,
                    oneCount: oneCount,
                    oneStatus: oneStatus,
                    twoHighScore: twoHighScore,
                    twoCount: twoCount,
                    twoStatus: twoStatus,
                    threeHighScore: threeHighScore,
                    threeCount: threeCount,
                    threeStatus: threeStatus,
                    fourHighScore: fourHighScore,
                    fourCount: fourCount,
                    fourStatus: fourStatus,
                    fiveHighScore: fiveHighScore,
                    fiveCount: fiveCount,
                    fiveStatus: fiveStatus,
                    finalHighScore: finalHighScore,
                    finalCount: finalCount,
                    finalStatus: finalStatus
                });
        }, 1000);
    }
    else {
        res.redirect("/login");
    }

}


module.exports = { oirhome }