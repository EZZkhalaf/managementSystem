const Employee = require("../model/Employee")
const bcrypt = require("bcrypt");
const multer = require("multer")
const User = require("../model/User");

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
      console.log(employees)
      return res.status(200).json({success:true , employees})
   } catch (error) {
       console.log(error)
      return res.status(500).json("internal server error ")
   }
}

const getEmployee = async(req,res)=>{
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id).populate('department').populate("userId" , {password : 0});

        if(!employee) return res.status(404).json({success:false , error:"employee not found"})
    
        return res.status(200).json({success : true , employee})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json("internal server error ") 
    }
}

const editEmployee = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name ,
            maritalStatus,
            designation,
            department,
            salary } = req.body;

        const employee = await Employee.findById(id);
        if(!employee) return res.status(404).json({success : false , error:"employee not found"})
        
        const user = await User.findById(employee.userId);
        if(!user) return res.status(404).json({success : false , error:"user not found"})

        const updatedUser = await User.findByIdAndUpdate({_id :employee.userId} , {
            name 
        })

        const updatedEmployee = await Employee.findByIdAndUpdate({_id : id} , {
            maritalStatus ,
            designation , 
            department , 
            salary
        })

        if(!updatedEmployee || !updatedUser){
            return res.status(404).json({success : false , error:"not found the user "})
        }
        
        return res.status(200).json({success : true , error:"nemployee updated successfully"})


    } catch (error) {
        console.log(error)
        return res.status(500).json("internal server error ")       
    }
}
module.exports = {addEmployee , upload , getEmployees , getEmployee , editEmployee}