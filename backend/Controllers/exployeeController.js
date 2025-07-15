



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
    } catch (error) {
        
    }
}

module.exports = {addEmployee}