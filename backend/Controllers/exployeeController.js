const Employee = require("../model/Employee")
const bcrypt = require("bcrypt");
const multer = require("multer")
const User = require("../model/User");
const mongoose = require('mongoose')


const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null ,"public/uploads")
    },
    filname : (req,file,cb)=>{
        cb(null , Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage : storage})

const addEmployee = async(req,res)=>{
    
    try {
        const {
            name , 
            email ,
            employeeId ,
            dob ,
            gender ,
            maritalStatus,
            designation ,
            department ,
            salary ,
            password , 
            role 
        } =  req.body

        const user = await User.findOne({email});
        if (user) {
            
        return res.status(400).json({ success: false, error: "User already exists" });
        }        
        const hashedPass = await bcrypt.hash(password , 10);
        
        const newUser = new User({
            name ,
            email, 
            password : hashedPass ,
            role ,
            profileImage : req.file ? req.file.filename : ""
        })
        
        console.log("testing")
        await newUser.save();

        const newEmp = new Employee({
            userId : newUser._id,
            employeeId ,
            dob ,
            gender ,
            maritalStatus,
            designation,
            department ,
            salary
        })
        
        await newEmp.save();
        return res.status(200).json({success : true , message : "employee created successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false , error:"internal server error "})
    }
}



const getEmployees = async(req,res)=>{
    try {
      const employees = await Employee.find().populate('department').populate("userId" , {password : 0});
      return res.status(200).json({success:true , employees})
   } catch (error) {
       console.log(error)
      return res.status(500).json("internal server error ")
   }
}

// const getEmployee = async(req,res)=>{
//     try {
//         let employee;
//         const {id} = req.params;
//          employee = await Employee.findById(id).populate('department').populate("userId" , {password : 0});

        
//         if(!employee) {
//             employee = await Employee.findOne({userId : id})
//             .populate('department')
//             .populate("userId" , {password : 0});
//             if(!employee)
//                 return res.status(404).json({success:false , error:"employee  not found"})

//             return res.status(200).json({success : true , employee})

//         }
    
//         return res.status(200).json({success : true , employee})
        
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json("internal server error ") 
//     }
// }



const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Try finding by employee ID
    let employee = await Employee.findById(id)
      .populate('department')
      .populate('userId', { password: 0 });

    // If not found, try finding by userId
    if (!employee) {
      employee = await Employee.findOne({ userId: id }).populate('department').populate('userId', { password: 0 });

      if (!employee) {
        return res.status(404).json({
          success: false,
          error: 'Employee not found',
        });
      }
    }
    console.log(employee)

    // Success
    return res.status(200).json({
      success: true,
      employee,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary  } = req.body;

    console.log(department)

    if (!id || !name || !maritalStatus || !designation || !department || !salary ) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "Associated user not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name },
      { new: true }
    );

    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      { maritalStatus, designation, department, salary },
      { new: true }
    );
  
    if (!updatedUser || !updatedEmployee) {
      return res.status(500).json({ success: false, error: "Failed to update employee or user" });
    }

    return res.status(200).json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    console.error("Edit Employee Error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {addEmployee , upload , getEmployees , getEmployee , editEmployee}