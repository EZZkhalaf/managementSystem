import React, { useEffect, useState } from 'react';
import  {fetchDept, fetchEmployee} from '../../Utils/EmployeeHelper'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
const EditEmployee = () => {
    const [departments , setDepartments] = useState([])
    const {id} = useParams()
    const [formData, setFormData] = useState({
            name: '',
            email: '',
            employeeId: '',
            dob: '',
            gender: '',
            maritalStatus: '',
            designation: '',
            department: '',
            depId : "",
            salary: '',
            password: '',
            role: '',
            image: null,
    });

    const navigate = useNavigate()

    //fetching the employee to esit
    const getEmployee = async()=>{
        const fatcat = await fetchEmployee(id)
        setFormData({
            name: fatcat.employee.userId?.name || '',
            maritalStatus: fatcat.employee.maritalStatus || '',
            designation: fatcat.employee.designation || '',
            department: fatcat.employee.department?.dep_name || '',
            depId : fatcat.employee.department?._id ||"",
            salary: fatcat.employee.salary || ''            
        });

    }
    const getDepartments = async()=>{
            const dep = await fetchDept()      
            setDepartments(dep)
        }
    useEffect(()=>{

        getEmployee()
        getDepartments()
    },[])
    
    const handleChange = (e) => {
        const { name, value} = e.target;
        
        setFormData({ ...formData, [name]: value });
        
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch(`http://localhost:5000/api/employee/edit/${id}` , {
                method : "put" , 
                headers : {
                    "Content-Type" : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}` 
                },
                body : JSON.stringify({
                    name : formData.name ,
                    maritalStatus: formData.maritalStatus,
                    designation: formData.designation,
                    department: formData.depId,
                    salary: formData.salary
                }) 
                
            })

            const data = await response.json();
            if(data.success){
                toast.success("updated the info successfully")
                navigate("/admin-dashboard/employees")
            }else{
                toast.error("cannot update the employee info")
            }
        } catch (error) {
            toast.error("something went wrong ...")
            console.log(error)
        }
    }

return (
    <form onSubmit={e => handleSubmit(e)} className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="maritalStatus">
            Marital Status
          </label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Separated">Separated</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="designation">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="salary">
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="col-span-2">
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
        </div>
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

);
}

export default EditEmployee