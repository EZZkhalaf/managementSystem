import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeList = () => {
  return (
        <div>
            <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">
                Manage employees
            </h1>
            </div>

            {/* Search and Action */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name"
                // value={newName}
                className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                // onChange={(e) => setNewName(e.target.value)}
            />

            {/* Add Button */}
            <Link
                to="/admin-dashboard/add-employee"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 text-center"
            >
                Add  employee
            </Link>
            </div>
        </div>
    )
}

export default EmployeeList