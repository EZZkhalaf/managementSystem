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
      return res.status(500).json("internal server error ")
      console.log(error)
   }
}

const getDept = async(req,res)=>{
   try {
      const {id} = req.params;
      const department = await Department.findOne({_id : id})
      if(!department) return res.status(404).json({success:false , error : "department not found"})

      return res.status(200).json({success:true , department})
   } catch (error) {
      return res.status(500).json("internal server error ")
      console.log(error)
   }
}


const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    const department = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ success: false, error: "Department ID not found" });
    }

    return res.status(200).json({ success: true, department });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const deleteDepartment = async(req,res)=>{
   try {
      const {_id} = req.params;
      const department = await Department.findByIdAndDelete(_id)
      if (!department) {
         return res.status(404).json({ success: false, error: "Department not found" });
      }
      return res.status(200).json({success : true , message : "department deleted successfully"})
   } catch (error) {
      console.log(error)
      return res.status(500).json({success : false , error:"internal server error "})
   }
}
module.exports = {addDept , getDepts , getDept , editDepartment , deleteDepartment}