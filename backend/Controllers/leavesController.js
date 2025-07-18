const Leaves = require("../model/Leaves");
const Employee = require('../model/Employee');

const addLeave = async(req,res)=>{
    try {
        const {userId , leaveType , startDate , toDate , reason} = req.body;
        console.log(req.body)
        if (!userId || !leaveType || !startDate || !toDate || !reason) {
            return res.status(400).json({
                success: false,
                error: "All fields (userId, leaveType, startDate, toDate, reason) are required.",
            });
        }
        const employeeExists = await Employee.findOne({userId});
        if(!employeeExists)
            return res.status(404).json({success : false , error:"employee not found ."})
        const newLeave = new Leaves({
            employeeId : employeeExists._id ,
            leaveType ,
            startDate ,
            endDate : toDate ,
            reason
        })

        await newLeave.save();

        return res.status(200).json({success : true});

    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false , error:"cannot get the employee salaries from server"});        
    }
}

const getEmployeeLeaves = async(req,res)=>{
    try {
        const {id} = req.params;
        const employee = await Employee.findOne({userId : id});
        if(!employee)
            return res.status(404).json({success : false , error:"employee not found :("})

        const leaves = await Leaves.find({employeeId : employee._id})
                                        .populate({
                                            path : 'employeeId',
                                            populate :[
                                                {path : 'department'},
                                                {path : 'userId' , select : '-password'}
                                            ]
                                        })
        
        
        return res.status(200).json({success : true , leaves});
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false , error:"cannot get the employee salaries from server"});        
    }
}

module.exports = {addLeave,getEmployeeLeaves};