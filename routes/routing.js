const express = require('express')
const router = express.Router()
const jwtAuth = require('../utilities/jwtAuth')
const phoneNumberController = require('../controllers/phoneNumberController')

router.post('/verify-mobile',phoneNumberController.verifyMobileNumber)
router.post('/register',jwtAuth.verifyToken, phoneNumberController.verifyOtpAndRegister)
router.all('{*splat}',phoneNumberController.invalid)

module.exports = router