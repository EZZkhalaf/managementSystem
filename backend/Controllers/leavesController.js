const Leaves = require("../model/Leaves");
const Employee = require('../model/Employee');

const addLeave = async(req,res)=>{
    try {
        const {userId , leaveType , startDate , toDate , reason} = req.body;
        // console.log(req.body)
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
        console.log("ssssssssssssssssssssss",id)
        let leaves;
        const employee = await Employee.findOne({userId : id});
        if (employee) {
        // Found employee, query leaves by their ObjectId
        leaves = await Leaves.find({ employeeId: employee._id }).populate({
            path: 'employeeId',
            populate: [
            { path: 'department' },
            { path: 'userId', select: '-password' },
            ],
        });
        } else {
        // No employee found by userId — maybe id is already employeeId
        leaves = await Leaves.find({ employeeId: id }).populate({
            path: 'employeeId',
            populate: [
            { path: 'department' },
            { path: 'userId', select: '-password' },
            ],
        });
        }
            // return res.status(404).json({success : false , error:"employee not found :("})
        
        
        return res.status(200).json({success : true , leaves});
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false , error:"cannot get the employee salaries from server"});        
    }
}

const getLeaves = async(req,res)=>{
    try {
        const leaves = await Leaves.find().populate({
            path : 'employeeId' , 
            populate : [
                {path : 'department' , select : 'dep_name'},
                {path : 'userId' , select : "name"}
            ]
        })

        return res.status(200).json({success : true , leaves})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false , error:"cannot get the employee salaries from server"});        
    }
}

const getLeave = async(req,res)=>{
    try {
        const {id} = req.params;

        const leave = await Leaves.findOne({_id : id}).populate({
            path : 'employeeId' , 
            populate : [
                {path : 'department' , select : 'dep_name'},
                {path : 'userId' , select : "name , profileImage"}
            ]
        })

        if(!leave) 
            return res.status(404).json({success:false , error:"leave details not found :("})

        return res.status(200).json({success : true , leave})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false , error:"cannot get the leave details from server"});        
    }
}


const changeLeaveStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  // Basic input validation
  if (!status || !["Approved", "Rejected", "Pending"].includes(status)) {
    return res.status(400).json({ success: false, error: "Invalid status value." });
  }

  try {
    const updatedLeave = await Leaves.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return the updated document
    );

    if (!updatedLeave) {
      return res.status(404).json({ success: false, error: "Leave record not found." });
    }

    return res.status(200).json({ success: true, leave: updatedLeave });
  } catch (error) {
    console.error("Change leave status error:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while updating the leave status.",
    });
  }
};


module.exports = {addLeave,getEmployeeLeaves , getLeaves , getLeave ,changeLeaveStatus };