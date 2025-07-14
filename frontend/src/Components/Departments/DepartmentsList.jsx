import React, { useEffect, useState } from 'react'
import AddDepartment from './AddDepartment'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../Utils/DeptHelper'
import { toast } from 'react-toastify'



const DepartmentsList = () => {
    const [departments , setDepartments] = useState([])


    //for updating the dep list after the deletion 
    const onDepartmentDelete = async(id) => {
      const dep = departments.filter(d => d._id !== id)
      setDepartments(dep)
    }

    useEffect(() => {
      const fetchDept = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/department", {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });

          const resData = await response.json();

          if (resData.success) {
            let sno = 1;
            const data = resData.departments.map((dep) => ({
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              // action: (<DepartmentButtons _id = {dep._id} onDepartmentDelete = {onDepartmentDelete}/>)
            }));

            setDepartments(data);
          } else {
            toast.error("Failed to fetch departments");
          }

        } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
        }
      };

      fetchDept();
    }, []);
    return (
        <>{}
       <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">
                Add New Department
            </h1>
            </div>

            {/* Search and Action */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name"
                className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Add Button */}
            <Link
                to="/admin-dashboard/add-department"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 text-center"
            >
                Add Department
            </Link>
            </div>

            <DataTable
              columns={columns(onDepartmentDelete)}
              data={departments}
              pagination
              highlightOnHover
              striped
            />
        </div>
        </>
  )
}

export default DepartmentsList