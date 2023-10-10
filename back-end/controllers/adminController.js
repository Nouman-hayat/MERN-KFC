let adminSchema = require('../schema/adminSchema')

exports.registerAdmin = async (req,res)=>{
    try{

        if(req.body.secret !== "kfcadmin123")
        {
            res.status(400).json({
                message : "admin secret is incorrect"
            })
        }

        let admin = await adminSchema.create(req.body)
        res.admin = admin
        let token = admin.getJwtToken()

        res.status(200).cookie('token',token , {httpOnly:true}).json({
            message: "admin created",
            admin : {...admin , password : null}
        })

    }   
    catch(error){
        console.log(error)
        res.status(400).json({
            error 
        })
    }
}

exports.loginAdmin = async (req,res)=>{
    try{
        let {email , password } = req.body
        if(!email || !password)
        {
            res.status(400).json({
                message: "email or password is missing"
            })
        }
        let admin = await adminSchema.findOne({email})

        let isMatched = await admin.comparePassword(password)

        if(!isMatched)
        {
            res.status(400).json({
                message: "email or password is incorrect"
            })
        }
        req.admin = {...admin}
        admin.password = ""
        let token = admin.getJwtToken()
        res.status(200)
        .cookie('token',token,
        {
            // necessary for setting cookies when site has been deployed
            httpOnly:true ,
            maxAge:3600000*5,
            secure:true,
            sameSite:'none',
        })
            .json({
            message: 'logged in',
            admin 
        })
    }
    catch(error)
    {
        res.status(400).json({
            message: 'not yeet',
            error
        })
    }
}

exports.logoutAdmin = async (req,res)=>{
    try{
        res.clearCookie("token")
        req.admin = null
        res.status(200).json({
            message: "logged out"
        })
    }
    catch(err){

    }
}