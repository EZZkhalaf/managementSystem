const  User  = require("../model/User");
const  Department  = require("../model/Department");
const  Leaves  = require("../model/Leaves");
const  Employee  = require("../model/Employee");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//the functionallity will; change later 
const register = async(req,res) => {
    try {
        const {name , email , password , role} = req.body;
        const emailExists = await User.findOne({email});
        if(emailExists) return res.status(400).json({success : false , error : "email exists"})
            
            const salt = 10;
            const hashedPass = await bcrypt.hash(password,salt);

        const newUser = new User({
                name,
                email,
                password: hashedPass,
                role,
        })

        await newUser.save()


        
        res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
        });

    } catch (error) {
        console.log(error)
    }
}


const login = async(req,res) =>{
    try {
        const {email , password} = req.body;
        const user  = await User.findOne({email});
        if(!user) return res.status(404).json({success : false , error : "user not found"})

        const passwordCorrect = await bcrypt.compare(password , user.password);

        if(!passwordCorrect) return res.status(400).json({success : false , error : "password is incorrect "})

        const token = jwt.sign({_id : user._id , role : user.role},
            process.env.JWT_SECRET , {expiresIn : "10d"}
        )

        return res.status(200).json({
            success:true ,
            token , 
            user : {
                _id : user._id , 
                name : user.name ,
                role : user.role
            }
        })
        
    } catch (error) {
        console.log(error)
    }
}

const verify = (req,res) => {
    return res.status(200).json({success : true , user : req.user})
}

const getSummary = async(req,res) =>{
    try {

            // Count totals
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    // Count leaves by status
    const totalLeaves = await Leaves.countDocuments();
    const leaveApproved = await Leaves.countDocuments({ status: "Approved" });
    const leavePending = await Leaves.countDocuments({ status: "Pending" });
    const leaveRejected = await Leaves.countDocuments({ status: "Rejected" });

    return res.status(200).json({
        success: true,
        data: {
            totalEmployees,
            totalDepartments,
            totalLeaves,
            leaveApproved,
            leavePending,
            leaveRejected
        }
    });
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false , error:"cannot get the employee salaries from server"});        
    }
}
module.exports = {login , register , verify , getSummary}