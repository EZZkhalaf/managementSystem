const Department = require("../model/Department");


const addDept = async(req,res) =>{
 try {
    const {dep_name , description} = req.body;
    const dept = new Department({
        dep_name ,
        description
    });

    await dept.save();
    return res.status(200).json({success : true , department : dept})
 } catch (error) {
    console.log(error)
    return res.status(500).json("internal server error ")
 }
}

const getDepts = async(req,res)=>{
   try {
      const departments = await Department.find();
      return res.status(200).json({success:true , departments})
   } catch (error) {
      throw new Error(error)
      console.log(error)
   }
}
module.exports = {addDept , getDepts}