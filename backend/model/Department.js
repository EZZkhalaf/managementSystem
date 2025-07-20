const mongoose = require("mongoose");
const Employee = require("./Employee");
const Leaves = require("./Leaves")

const deptSchema = new mongoose.Schema({
    dep_name : {
        type : String ,
        required : true
    },
    description : {
        type:String
    }

},{
    timestamps:{
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});


deptSchema.pre("deleteOne" , {document : true , query : false} , async (next) =>{
    try {
        const employees = await Employee.find({department : this._id})
        const empIds = employees.map( e => e._id);

        await Employee.deleteMany({department : this._id})
        await Leaves.deleteMany({employeeId : {$in : empIds}})
        await Salary.deleteMany({employeeId : {$in : empIds}})
        next();
    }  catch (error) {
        next(error)
    }
})
const Department =  mongoose.model("Department" , deptSchema);

module.exports = Department;