let jwt = require("jsonwebtoken")
let adminSchema = require("../schema/adminSchema")

exports.isAdmin =(req,res,next)=>{

    let {token} = req.cookies //get token from req object

    if(!token)
    {
        res.status(400).json({
            message: 'Not logged In'
        })
    }

    let decoded = jwt.verify(token , 'iAmAdmin')

    let admin = adminSchema.findById(decoded._id)

    if(!admin)
    {
        res.status(400).json({
            message : "Account not found"
        })
    }

    req.admin = admin

    next()
}