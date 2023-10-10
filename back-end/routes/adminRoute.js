let express = require('express')
const { registerAdmin, loginAdmin, logoutAdmin } = require('../controllers/adminController')

let router = express.Router()

//REGISTER AN ADMIN
router.route('/admin/register').post(registerAdmin)

//LOGIN ADMIN
router.route('/admin/login').post(loginAdmin)

//LOGOUT ADMIN
router.route('/admin/logout').post(logoutAdmin)

module.exports = router