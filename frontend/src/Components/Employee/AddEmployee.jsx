import React, { useEffect, useState } from 'react';
import  {fetchDept} from '../../Utils/EmployeeHelper'


const AddEmployee = () => {
      const [departments , setDepartments] = useState([])
      const [formData, setFormData] = useState({
            name: '',
            email: '',
            employeeId: '',
            dob: '',
            gender: '',
            maritalStatus: '',
            designation: '',
            department: '',
            salary: '',
            password: '',
            role: '',
            image: null,
    });
  

    //fetching the department to select
    useEffect(()=>{

        const getDepartments = async()=>{
            const dep = await fetchDept()      
            setDepartments(dep) 
        }
        getDepartments()
    },[])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
        setFormData({ ...formData, [name]: files[0] });
        } else {
        setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const formDataObject = new FormData();
        Object.key(formData).forEach( key =>{
            formDataObject.append(key , formData[key])
        })
        try {
            const response = await fetch("http://localhost:5000/api/employee/add" , {
                method : "POST" , 
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}` 
                },
                body : JSON.stringify({
                    formDataObject 
                })
            })

            const data = await response.json() ;
            if(data.success){
            toast.success("employee added successfully")
            navigate("/admin-dashboard/employees")
            }else{
                toast.error("something went wrong please try again")
            }
        
        } catch (error) {
            toast.error("something went wrong ...")
            console.log(error)
        }
    }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Employee</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" name="name" placeholder="Insert Name" onChange={handleChange}
            className="w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" placeholder="Insert Email" onChange={handleChange}
            className="w-full border rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Employee ID</label>
          <input type="text" name="employeeId" placeholder="Employee ID" onChange={handleChange}
            className="w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input type="date" name="dob" onChange={handleChange}
            className="w-full border rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select name="gender" onChange={handleChange}
            className="w-full border rounded-md p-2">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marital Status</label>
          <select name="maritalStatus" onChange={handleChange}
            className="w-full border rounded-md p-2">
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Designation</label>
          <input type="text" name="designation" placeholder="Designation" onChange={handleChange}
            className="w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select name="department" onChange={handleChange}
            className="w-full border rounded-md p-2">
            <option value="">Select Department</option>
            {departments.map(dep => (
                <option key ={dep._id}>{dep.dep_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Salary</label>
          <input type="number" name="salary" placeholder="Salary" onChange={handleChange}
            className="w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" name="password" placeholder="******" onChange={handleChange}
            className="w-full border rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select name="role" onChange={handleChange}
            className="w-full border rounded-md p-2">
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange}
            className="w-full border rounded-md p-2" />
        </div>
      </div>

      <button type="submit"
        className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition">
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployee;
