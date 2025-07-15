
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { fetchEmployees } from '../../Utils/EmployeeHelper';

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [searchId, setSearchId] = useState('');

//   useEffect(() => {
//   const fetchData = async () => {
//     const emps = await fetchEmployees();
//     console.log('Fetched employees:', emps[0]);
//     setEmployees(Array.isArray(emps) ? emps : []);
//   };
//   fetchData();
// }, []);

//   // Filter employees by employeeId

//   const filteredEmployees = employees;

//   return (
//     <div className="p-6 bg-white rounded shadow-md max-w-7xl mx-auto">
//       <h2 className="text-center font-semibold text-xl mb-6">Manage Employees</h2>

//       <div className="flex justify-between mb-4">
//         <input
//           type="text"
//           placeholder="Search By Employee ID"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 w-1/3"
//         />
//         <Link
//           to="/admin-dashboard/add-employee"
//           className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
//         >
//           Add New Employee
//         </Link>
//       </div>

//       <table className="min-w-full border border-gray-200">
//         <thead className="bg-gray-100 text-left text-sm font-medium text-gray-700">
//           <tr>
//             <th className="p-3 border border-gray-300">S No</th>
//             <th className="p-3 border border-gray-300">Image</th>
//             <th className="p-3 border border-gray-300">Name</th>
//             <th className="p-3 border border-gray-300">DOB</th>
//             <th className="p-3 border border-gray-300">Department</th>
//             <th className="p-3 border border-gray-300">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredEmployees.length === 0 ? (
//             <tr>
//               <td colSpan={6} className="p-4 text-center text-gray-500">
//                 No employees found.
//               </td>
//             </tr>
//           ) : (
//             filteredEmployees.map((emp, idx) => (
//               <tr
//                 key={emp._id}
//                 className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
//               >
//                 <td className="p-3 border border-gray-300">{idx + 1}</td>
//                 <td className="p-3 border border-gray-300">
//                   {emp.image ? (
//                     <img
//                       src={emp.image}
//                       alt={emp.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//                   )}
//                 </td>
//                 <td className="p-3 border border-gray-300">{emp.name}</td>
//                 <td className="p-3 border border-gray-300">
//                   {new Date(emp.dob).toLocaleDateString()}
//                 </td>
//                 <td className="p-3 border border-gray-300">
//                   {emp.department?.dep_name || 'N/A'}
//                 </td>
//                 <td className="p-3 border border-gray-300 space-x-2">
//                   <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
//                     View
//                   </button>
//                   <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
//                     Edit
//                   </button>
//                   <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
//                     Salary
//                   </button>
//                   <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//                     Leave
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeeList;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEmployees } from '../../Utils/EmployeeHelper';
import DataTable from 'react-data-table-component'
import { columns } from '../../Utils/EmployeeHelper'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
  const fetchData = async () => {
    const emps = await fetchEmployees();
    console.log('Fetched employees:', emps[0]);
    setEmployees(Array.isArray(emps) ? emps : []);
  };
  fetchData();
}, []);

  // Filter employees by employeeId

  const filteredEmployees = employees;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-7xl mx-auto">
      <h2 className="text-center font-semibold text-xl mb-6">Manage Employees</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search By Employee ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-1/3"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Add New Employee
        </Link>
      </div>



      <DataTable columns = {columns()} data={employees}/>
    </div>
  );
};

export default EmployeeList;
