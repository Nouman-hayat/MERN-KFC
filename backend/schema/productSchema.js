const mongoose = require("mongoose")

let productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true , "Please enter Product Title"],
        minLength: [3 , "Title Min Length should be atleast 3"]
    },
    slug: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("product" , productSchema)