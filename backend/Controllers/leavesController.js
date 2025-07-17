const Leaves = require("../model/Leaves");


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
        const newLeave = new Leaves({
            employeeId : userId ,
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

module.exports = {addLeave};