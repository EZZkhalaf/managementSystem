const Employee = require('../model/Employee');
const Salary = require('../model/Salary')

const addSalary = async(req,res) => {
    try {
         const {employee , basicSalary , allowances , deductions , payDate} = req.body;

         const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

         const newSalary = new Salary({
            employeeId:employee , 
            basicSalary ,
            allowances , 
            deductions ,
            netSalary : totalSalary ,
            payDate
         });

         await newSalary.save();

         return res.status(200).json({success : true});
    } catch (error) {
        console.log(error)
         return res.status(500).json({success : false , error:"cannot add salary to server"});       
    }
}

const getEmployeeSalaries = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, error: "Employee ID is required in params." });
    }

    let salaries = await Salary.find({ employeeId: id }).populate("employeeId", "employeeId");

    // If no salaries found, try finding employee by userId
    if (!salaries || salaries.length === 0) {
      const employee = await Employee.findOne({ userId: id });

      if (!employee) {
        return res.status(404).json({
          success: false,
          error: "No employee found with the given ID or userId."
        });
      }

      salaries = await Salary.find({ employeeId: employee._id }).populate("employeeId", "employeeId");

      if (!salaries || salaries.length === 0) {
        return res.status(404).json({
          success: false,
          error: "No salaries found for the employee."
        });
      }
    }

    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error("getEmployeeSalaries error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while fetching employee salaries."
    });
  }
};

module.exports = {addSalary , getEmployeeSalaries}