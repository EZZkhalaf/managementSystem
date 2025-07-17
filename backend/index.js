const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connection = require('./database/db.js')
const authRouter = require('./Routes/auth.js')
const departmentRouter = require("./Routes/departments.js")
const employeeRouter = require("./Routes/employees.js")
const salaryRouter = require("./Routes/salary.js")
const leavesRouter = require("./Routes/leaves.js");


dotenv.config();

connection();

const app = express();
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173' ,
    credentials:true
}));

app.use(express.static("public/uploads"))

app.use("/api/auth" , authRouter)
app.use("/api/department" , departmentRouter)
app.use("/api/employee" , employeeRouter)
app.use("/api/salary" , salaryRouter)
app.use("/api/leave" ,leavesRouter)


app.listen(process.env.PORT , () =>{
    console.log(`server running on port ${process.env.PORT}`)
}) 