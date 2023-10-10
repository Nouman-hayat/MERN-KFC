const express = require("express")
let router = express.Router()

const { processPayment } = require("../controllers/paymentController")
const {isAuthenticated} = require('../middleware/auth')

router.route("/payment").post( isAuthenticated , processPayment )

module.exports = router