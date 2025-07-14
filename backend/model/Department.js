const mongoose = require("mongoose");


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

const Department =  mongoose.model("Department" , deptSchema);

module.exports = Department;