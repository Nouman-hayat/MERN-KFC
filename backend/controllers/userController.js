let userSchema = require("../schema/userSchema")

//GET ALL USERS
exports.getAllUsers = async (req,res)=>{
    try{
        let users = await userSchema.find()
        res.status(200).json({
            users: users
        })
    }
    catch(e){
        res.status(400).json({
            error: e.errors
        })
    }
}

//GET SPECIFIC USER
exports.getUser = async (req,res)=>{
    try{
        let user =  await userSchema.findById(req.params.id) 
        res.status(200).json({
            user,
            message:"user sent"
        })
    }
    catch(e){

    }

}

//CREATE A USER

exports.createUser = async (req,res)=>{
    try{
        let newUser = await userSchema.create(req.body)
        res.status(201).json({
            message: `${newUser} created `
        })
    }
    catch(e){
        if (e.code === 11000)
        {
            res.status(400).json({
                error : "Email already exists" ,
                emailExists : true 
            })
        }
        else
        {
            res.status(400).json({
                error: e.errors
            })

        }
    }
}


//LOGIN A USER

exports.loginUser =  async (req,res)=>{
    try{

        let {email , password} = req.body

        if(!email || !password)
        {
            res.status(400).json({
                message: "Enter email and password"
            })
  
        }

        let user = await userSchema.findOne({email})

        if(!user)
        {
            res.status(400).json({
                message: "User not found .Please Retry"
            })
        }
        let isMatched = await user.comparePassword(password)
        if(!isMatched) // if password is not correct run this
        {
            res.status(400).json({
                message: "Password or email Incorrect"
            })
        }
        let token = user.getJwtToken()
        res.status(200).cookie("token", token , 
            {
                httpOnly:true ,
                secure:true,
                sameSite:'none',
            }
        )
        .json({
            user
        })
    }catch(e){
        res.status(400).json({
            error : e,
            message: "cannot login"
        })
    }
    
}


//LOGOUT USER
exports.logoutUser = async (req,res)=>{
    res.clearCookie("token")
    req.user = null
    res.status(200).json({
        message: "logged out"
    })
}