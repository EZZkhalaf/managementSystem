import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDept, fetchEmployeesForDepartment } from '../../Utils/SalaryHelper';


const AddSalary = () => {
     const [departments , setDepartments] = useState([])
     const [employees , setEmployees] = useState([])
    const {id} = useParams()
    const [formData, setFormData] = useState({
            employee: '',            
            department: '',           
            basicSalary: 0,
            allowances : 0 ,
            deductions : 0 ,
            payDate : null
            
    });

    const navigate = useNavigate()

    //fetching the employee to esit

    const getDepartments = async()=>{
            const dep = await fetchDept() 
            // console.log(dep)     
            setDepartments(dep)
        }
    const fetchData = async () => {
        const emps = await fetchEmployeesForDepartment(formData.department);
        // console.log(emps)
        setEmployees(Array.isArray(emps) ? emps : []);
        console.log(employees)
    };
    useEffect(()=>{

        
        getDepartments()
    },[])
    
    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: e.target.value });
        
    };

    const handleChangeDepartment = (e) => {
        const { name, value} = e.target;
        setFormData({ ...formData, department: value });
        fetchData();
        
    };
    const handleChangeEmployee = (e)=>{
        const { name, value} = e.target;
        setFormData({ ...formData, employee: e.target.value }); 
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch('http://localhost:5000/api/salary/' , {
                method : "post" , 
                headers : {
                    "Content-Type" : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}` 
                },
                body :JSON.stringify(formData)  
                
            })

            const data = await response.json();
            console.log(data)
            if(data.success){
                toast.success("added the salary successfully")
                navigate("/admin-dashboard/employees")
            }else{
                toast.error("cannot add the employee salary")
            }
        } catch (error) {
            toast.error("something went wrong ...")
            console.log(error)
        }
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className="max-w-2xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Add Salary</h2>

        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">


                <label className="block mb-1 font-medium" htmlFor="department">
                        Department
                </label>
                <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChangeDepartment}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="" disabled>Select Department</option>
                    {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                        {dept.dep_name}
                    </option>
                    ))}
                </select>
            </div>


            <div className="col-span-2">
                <label className="block mb-1 font-medium" htmlFor="employee">
                        employees
                </label>
                <select
                    id="employee"
                    name="employee"
                    value={formData.employee}
                    onChange={handleChangeEmployee}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="" disabled>Select employee</option>
                    {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                        {emp.name}
                    </option>
                    ))}
                </select>
            </div>

            <div>
            <label className="block mb-1 font-medium" htmlFor="maritalStatus">
                Basic Salary
            </label>
            <input
                type="number"
                id="basicSalary"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                placeholder="Enter Basic Salary"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />

            </div>

            <div>
            <label className="block mb-1 font-medium" htmlFor="designation">
                Allowance
            </label>
            <input
                type="number"
                id="allowances"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                placeholder="Enter allowances"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            </div>


             <div>
            <label className="block mb-1 font-medium" htmlFor="designation">
                Deductions
            </label>
            <input
                type="number"
                id="deductions"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                placeholder="Enter Deductions"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            </div>
                    
            <div>
            <label className="block mb-1 font-medium" htmlFor="salary">
                Pay Date
            </label>
            <input
                type="date"
                id="payDate"
                name="payDate"
                value={formData.payDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            </div>

            {/* <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="department">
                Department
            </label>
            <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
                <option value="" disabled>Select Department</option>
                {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                    {dept.dep_name}
                </option>
                ))}
            </select>
            </div> */}
        </div>

        <div className="mt-4">
            <button
            type="submit"
            className="w-full p-2 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
            >
            Add Employee New Info
            </button>
        </div>
        </form>
    )
}

export default AddSalary