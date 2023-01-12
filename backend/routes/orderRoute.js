const express = require("express")
let router = express.Router()
const { placeOrder, getAllOrders, deleteOrder, getOneOrder, updateToDispatch, getActiveOrders } = require("../controllers/orderController")
const { isAuthenticated } = require("../middleware/auth")

//PLACE ORDER
router.route("/order").post(isAuthenticated,placeOrder)

//GET ALL ORDERS
router.route("/order/getAll").get(getAllOrders)

//GET ONE ORDER
router.route("/order/getOne/:id").get(getOneOrder)

//UPDATE ORDER STATUS FROM PROCESSING TO DISPATCHED
router.route("/order/update/dispatch/:id").put(updateToDispatch)

//GET ALL ACTIVE ORDERS OF A USER
router.route("/order/user/activeOrders/:id").get(getActiveOrders)


//WHEN ORDER IS TO BE CANCELLED
router.route("/order/cancel/:id").delete(deleteOrder)

module.exports = router