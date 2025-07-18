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


const getEmployeeSalaries = async(req,res)=>{
    try {
        const {id} = req.params;
        let salaries;
        salaries = await Salary.find({employeeId : id}).populate("employeeId" , "employeeId")
        
        if(!salaries || salaries.length < 1){
            const emp2 = await Employee.findOne({userId : id});
            salaries = await Salary.find({employeeId : emp2._id}).populate("employeeId" , "employeeId")
        }
        console.log(salaries)
        return res.status(200).json({success:true , salaries})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false , error:"cannot get the employee salaries from server"});        
    }
}
module.exports = {addSalary , getEmployeeSalaries}