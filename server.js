const express = require("express");
const app = express()
const route = require("./Route/index.js")
const dotenv = require("dotenv");
const cors = require("cors");
const {connectDB} = require("./config/index.js");
dotenv.config();

app.use(cors()); //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

app.use(express.json()); //it is used to parse incoming JSON data in the request body. This middleware is necessary when dealing with JSON data in POST requests,
// connectDB()
app.use("/api", route)
app.listen(process.env.PORT || 9000, function () {
    console.log(process.env.PORT || 9000)
})

// mongoose.connect(process.env.DB_URL);
connectDB();