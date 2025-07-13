const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connection = require('./database/db.js')
dotenv.config();


connection();

const app = express();
app.use(cors());
app.use(express.json())



app.listen(process.env.PORT , () =>{
    console.log(`server running on port ${process.env.PORT}`)
}) 