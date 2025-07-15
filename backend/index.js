const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connection = require('./database/db.js')
const authRouter = require('./Routes/auth.js')
const departmentRouter = require("./Routes/departments.js")
const employeeRouter = require("./Routes/employees.js")
dotenv.config();


connection();

const app = express();
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173' ,
    credentials:true
}));

app.use("/api/auth" , authRouter)
app.use("/api/department" , departmentRouter)
app.use("/api/employee" , employeeRouter)



app.listen(process.env.PORT , () =>{
    console.log(`server running on port ${process.env.PORT}`)
}) 