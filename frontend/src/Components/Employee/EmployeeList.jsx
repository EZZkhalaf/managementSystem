
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEmployees } from '../../Utils/EmployeeHelper';
import DataTable from 'react-data-table-component'
import { columns } from '../../Utils/EmployeeHelper'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [filteredEmployees , setFillteredEmployees] = useState([])

  useEffect(() => {
  const fetchData = async () => {
    const emps = await fetchEmployees();
    setEmployees(Array.isArray(emps) ? emps : []);
    setFillteredEmployees(Array.isArray(emps) ? emps : []);
  };
  fetchData();
}, []);

  // Filter employees by employeeId
  const handleChange=(e)=>{
    e.preventDefault();
    const records = employees.filter(emp => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))

    setFillteredEmployees(records)
  }

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-full overflow-x-auto">

      <h2 className="text-center font-semibold text-xl mb-6">Manage Employees</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search By Employee ID"
          // value={employees.userId.name}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 rounded px-3 py-2 w-1/3"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Add New Employee
        </Link>
      </div>




        {/* <DataTable
        columns={columns()}
        data={employees}
        responsive
        pagination
        />
         */}
<div className="p-6 bg-white rounded shadow-md w-full overflow-x-auto">
  <div className="min-w-[900px]">
    <DataTable
      columns={columns()}
      data={filteredEmployees}
      responsive
      pagination
    />
  </div>
</div>

    </div>
  );
};

export default EmployeeList;
