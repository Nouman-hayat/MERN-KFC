const mongoose = require("mongoose")

let categorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true , "Category title is required"]
    }
})

module.exports = mongoose.model('categorie' , categorySchema)