let jwt = require("jsonwebtoken")
let userSchema = require('../schema/userSchema')
exports.isAuthenticated =  (req,res,next)=>{
    

    // let {token} = req.signedCookies
    let {token} = req.cookies
    console.log( "TOKEN !!!" , req.cookies)
    if(!token)
    {
        res.status(400).json({
            message: "Must be Logged in first"
        })
    }
    
    let decoded = jwt.verify(token , "pleaseDontHack") 
    req.user =  userSchema.findById(decoded._id)
    next()
}