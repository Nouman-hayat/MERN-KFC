const express = require("express")
let app = express()

//CONNECT TO DATABASE
let connectDb = require("./config/connectDB")
connectDb()

//CLOUDINARY CONFIG 
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'djyta4tsr', 
    api_key: '579297719626592', 
    api_secret: 'vLrR33rs7xssXDX_syf8EA6Xrvk' 
  });

//COOKIE PARSER
let cookieParser = require("cookie-parser")
app.use(cookieParser())

//USE CORS
let cors = require("cors")
app.use(cors({
    origin:['http://localhost:3001' , 'http://localhost:3000' 
    , "https://kfc-awm.netlify.app" , "https://kfc-admin.netlify.app"],
    credentials: true
}))

var bodyParser = require('body-parser')
app.use(bodyParser({limit : '20mb'}))

//JSON MIDDLEWARE
app.use(express.json())

//LISTEN AT PORT
const PORT = process.env.PORT || 8000
app.listen(PORT , console.log(`server running on ${PORT}`))

//PRODUCT MIDDLEWARE
let productRoute = require("./routes/productRoute")
app.use("/kfc" , productRoute)

//USER ROUTE
let userRoute = require("./routes/userRoute")
app.use("/kfc" , userRoute )

//ORDER ROUTE
let orderRoute = require("./routes/orderRoute")
app.use("/kfc", orderRoute)

//ADMIN ROUTE
let adminRoute = require("./routes/adminRoute")
app.use('/kfc',adminRoute)

let paymentRoute = require('./routes/paymentRoute')
app.use("/kfc",paymentRoute)
