import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const EditDepartment = () => {
  const {id} = useParams();
  const [department , setDepartment] = useState([]);
  const [loading , isLoading] = useState(false)

  const navigate = useNavigate()

  // fetching the department data first 
  useEffect(() => {
      const fetchDept = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/department/${id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });
  
          const data = await response.json();
          setDepartment(data.department);
          
  
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
        }
      };
  
      fetchDept();
    }, []);

    const handleChange = (e) =>{
      e.preventDefault();
      const {name , value } = e.target;
      setDepartment({...department , [name] : value})
    }

    const handleSubmit = async(e) =>{
      e.preventDefault()
      try {
        const response = await  fetch(`http://localhost:5000/api/department/${id}`, {
            method : "PUT" , 
            headers: {
              "Content-Type" : 'application/json',
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
              dep_name : department.dep_name,
              description : department.description
            })
          });

          const data = await response.json();
          console.log(data)
          if(!data.success){
            toast.error("error editing the department info")
            return
          }else if(data.success){
            setDepartment(data.department)
            toast.success("department updated successfully")
            navigate('/admin-dashboard/departments')
          }

        } catch (error) {
        toast.error("error editing the department info")
      }
    }

  return (
        <>{loading ? <div>loading.....</div> : 
          <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Add Department</h3>

              <form className="space-y-5" onSubmit={e => handleSubmit(e)  }>
                {/* Department Name */}
                <div>
                  <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name
                  </label>
                  <input
                    id="dep_name"
                    name="dep_name"
                    onChange={handleChange}
                    value = {department.dep_name}
                    type="text"
                    placeholder="Enter department name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    value={department.description}
                    rows="4"
                    placeholder="Enter description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Add Department
                  </button>
                </div>
              </form>
            </div>
          </div>
      }
        </>
  )
}

export default EditDepartment