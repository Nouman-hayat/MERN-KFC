const express = require("express")
let router = express.Router()
const {getAllUsers , createUser, getUser, loginUser, logoutUser} = require("../controllers/userController")
const { isAuthenticated } = require("../middleware/auth")


//GET ALL Users
router.route("/users").get( getAllUsers)

//GET SPECIFIC USER
router.route("/users/userID/:id").get(getUser)

//CREATE USER
router.route("/users/create").post(createUser)

//LOGIN USER
router.route("/users/login").post(loginUser)

//LOGOUT USER
router.route("/users/logout").post(logoutUser)
module.exports = router