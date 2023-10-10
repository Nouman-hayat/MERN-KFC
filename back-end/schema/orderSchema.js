const mongoose = require("mongoose")


let orderItemSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required : [true, 'Item title is missing']
    },
    price: {
        type: Number, 
        required: [true , 'Item price is missing']
    },
    quantity:{
        type: Number,
        required : [true, 'Item quantity is missing']
    }
    }
)

let orderSchema = new mongoose.Schema(
    {
        items: [orderItemSchema],
        bill: {
            type : Number,
            required: [true, "Bill is missing"]
        },
        user:{
            _id: mongoose.Types.ObjectId,
            email : String,
            name: String
        },
        location:{
            city: {
                type: String,
                required : true
            },
            area: {
                type: String,
                required: true
            }
        },
        status: {
            type : String,
            default: "processing"
        }
    }
)

module.exports = mongoose.model('order',orderSchema)

