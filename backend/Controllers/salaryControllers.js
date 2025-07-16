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

module.exports = {addSalary}