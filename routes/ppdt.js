const router = require('express').Router();

const { ppdthome } = require('../controllers/ppdt/home')
const {test,savetest,savereturn,ppdtresult,changestatus} = require('../controllers/ppdt/final')
// PPDT HOME PAGE 
router.route('/home').get(ppdthome)

// PPDT TEST PAGE 
router.route('/test').get(test)
router.route('/result').get(ppdtresult)

router.route('/savetest').post(savetest)
router.route('/savereturn').post(savereturn)



router.route('/changestatus').post(changestatus)



// Router Exported
module.exports = router