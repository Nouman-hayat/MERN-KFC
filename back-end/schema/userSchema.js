let mongoose = require("mongoose")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const orderItemSchema = require("./orderSchema")

let userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: [true , "Email is Required"],
        validate:{
            validator: (value)=>{
                //EMAIL VALIDATION REGEX
                return /\S+@\S+\.\S+/.test(value)
            },
            message:props=> ` invalid Email Address`
        }
    },
    password:{
        type: String,
        required: [true , 'Password is required'],
        minLength: [8 , "Password min length should be atleast 8 characters"],
        maxLength: [18, "Password max length is 18 characters"],
    },
    firstName : {
        type: String,
        required: [true , "First name is required"],
        minLength: [3,"min length is 3 characters"],
        maxLength: [20,"max length is 20 characters"]
    },
    lastName:{
        type: String,
        minLength: [2, 'last name min length is 2 characters '],
        maxLength: [15 , 'last name max length is 15 characters'],
        required: [ true , "last name is required"]
    },
    address:{
        type:String,
        required: [true , "Address is required"],
        minLength: [5 , 'Address min length is 5 characters'],
        maxLength : [120 , "Address max length is 60 characters"]
    },
    country:{
        type: String,
        required: [true, "Country name is required"],
        lowercase: true,
        enum : ['pakistan' , 'ksa'],
        default: 'pakistan',
        message: "Invalid Country choose Pakistan or KSA"
    },
    province: {
        type: String,
        required: [true , "Province is required"],
        lowercase: true,
        enum: ["punjab", "kpk"],
        message:"Invalid Province"
    },
    city:{
        type: String,
        required: [true, "City is required"],
        lowercase: true
    },
    prefix:{
        type: String,
        required: [true , "Prefix is required"],
        enum:["+92", "+002"],
        message:"Invalid Prefix"
    },
    phone:{
        type: String,
        required: [true , "Phone number is required"],
    },
    zip:{
        type: String,
        required: [true , "zip is required"]
    }/*,
    activeOrders: [
        {
            items:[orderItemSchema],
            bill: Number
        }
    ] */



})

userSchema.pre('save' , async function(){
    if(this.isModified('password'))
    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

userSchema.methods.getJwtToken =  function (){
    return  jwt.sign({id: this._id} , "pleaseDontHack" , {expiresIn: "1h"})
}

module.exports = mongoose.model("user" , userSchema)