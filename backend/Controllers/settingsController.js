const  User  = require("../model/User");
const bcrypt = require("bcrypt")

const changePassword = async(req,res)=>{
    try {
        const {userId,oldPassword , newPassword} = req.body;

        if (!userId || !oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: "All fields are required to change the password.",
            });
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                error: "user id not found ",
            });
        }

        const isMatch = await bcrypt.compare(oldPassword , user.password);
        if(!isMatch)
            return res.status(400).json({success : false , error:"the old password is incorrect"})

        const newHashedPAssword = await bcrypt.hash(newPassword , 10);

        const newUser = await User.findByIdAndUpdate({_id :userId} , { 
            password : newHashedPAssword
        })

        return res.status(200).json({success : true , message : "password changed successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false , error:"cannot get the employee salaries from server"});        
    }
}

module.exports = {changePassword}