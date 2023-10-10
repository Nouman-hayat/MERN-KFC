const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

let adminSchema = new mongoose.Schema({
    email : {
        type: String,
        required : [true , "Email is required"],
        unique: true
    },
    password : {
        type: String,
        required : [true , "Password is required"]
    }
})

adminSchema.pre('save', async function(){
    if(this.isModified('password'))
    this.password = await bcrypt.hash(this.password , 10)
})

adminSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

adminSchema.methods.getJwtToken =   function (){
    return   jwt.sign({id: this._id} , "iAmAdmin" , {expiresIn: "8h"})
}


module.exports =  mongoose.model("admin" , adminSchema)