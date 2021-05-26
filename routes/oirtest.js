const router = require('express').Router();
const { OirTestOne, OirTestTwo, OirTestThree, OirTestFour, OirTestFive } = require('../models/quizModel')
const { oirhome }  = require('../controllers/oirtest/home')
const { one ,saveone,savereturnone} = require('../controllers/oirtest/one')
const { two, savetwo, savereturntwo } = require('../controllers/oirtest/two.js')
const { three, savethree, savereturnthree } = require('../controllers/oirtest/three')
const { four, savefour, savereturnfour } = require('../controllers/oirtest/four')
const { five, savefive, savereturnfive } = require('../controllers/oirtest/five')
// Final Oir Test 
const {finalOir,savefinalOir,savefinalreturnOir} = require('../controllers/oirtest/final')
router.route('/home').get(oirhome)

// OIRTEST ONE
router.route('/oirtestone').get(one)
router.route('/saveonefirstoir').post(saveone)
router.route('/saveonereturnoir').post(savereturnone)
// OIRTEST TWO
router.route('/oirtesttwo').get(two)
router.route('/savetwofirstoir').post(savetwo)
router.route('/savetworeturnoir').post(savereturntwo)
// OIRTEST THREE
router.route('/oirtestthree').get(three)
router.route('/savethreefirstoir').post(savethree)
router.route('/savethreereturnoir').post(savereturnthree)
// OIRTEST FOUR
router.route('/oirtestfour').get(four)
router.route('/savefourfirstoir').post(savefour)
router.route('/savefourreturnoir').post(savereturnfour)
//OIRTEST FIVE
router.route('/oirtestfive').get(five)
router.route('/savefivefirstoir').post(savefive)
router.route('/savefivereturnoir').post(savereturnfive)

//OIRTEST FINAL
router.route('/oirtest').get(finalOir)
router.route('/savefirstoir').post(savefinalOir)
router.route('/savereturnoir').post(savefinalreturnOir)




/* Router Exported */
module.exports = router