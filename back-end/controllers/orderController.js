const orderSchema = require('../schema/orderSchema')

//PLACE ORDER
exports.placeOrder = async (req,res)=>{
    try{
        let order = await orderSchema.create(req.body)
        res.status(200).json({
            message: "order placed successfully",
            dumbCookie : req.cookies
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            message: "nope",
            error: e.errors
        })
    }
}

//GET ALL ORDERS
exports.getAllOrders = async (req,res)=>{
    try{
        let orders  = await orderSchema.find()
        res.status(200).json({
            orders
        })
    }
    catch(e)
    {
        res.status(400).json({
            message: "something went wrong . Please try again",
            e
        })
    }
}

//GET ONE ORDER
exports.getOneOrder = async (req,res)=>{
    try
    {
        let order = await orderSchema.findById({_id: req.params.id})

        if(!order)
        res.status(400).json({
            message : "Resource not found"
        })

        res.status(200).json({
            order
        })
    }
    catch(e)
    {
        res.status(400).json({
            message: "Error occured",
            error : e
        })
    }
}

//GET ACTVE ORDERS OF A USER
exports.getActiveOrders = async (req,res)=>{
    try{
        let orders = await orderSchema.find({"user._id": req.params.id})

        if(orders.length==0)
        {
            res.status(200).json({
                message: "No active orders found"
            })
            return
        }

        res.status(200).json({
            message: "Orders retrieved",
            orders
        })
    }
    catch(e)
    {
        res.status(400).json({
            message: "Error occured",
            error : e
        })
    }
}

//UPDATE ORDER STATUS TO DISPATCH
exports.updateToDispatch = async (req,res)=>{
    try{
        let order = await orderSchema.findByIdAndUpdate(req.params.id , {...req.body , status: "dispatched"})

        if(!order)
        res.status(400).json({message: "order not found"})

        res.status(200).json({
            message: "order status updated"
        })
    }
    catch(e)
    {
        res.status(400).json({
            message: "error occured",
            error : e
        })
    }
}

//DELETE AN ORDER (COMPLETE ORDER)
exports.deleteOrder = async (req,res) =>{
    try{
        let order = await orderSchema.findByIdAndDelete(req.params.id)
        if(!order)
        {
            res.status(400).json({message: "order not found"})
            return
        }
    
        res.status(200).json({message: "order has been cancelled . Sorry : ) "})
    }
    catch(e){
        res.status(400).json({
            message: "mission ",
            error : e
        })
    }
}