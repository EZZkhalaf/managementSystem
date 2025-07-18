import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEmpSalaries } from '../../Utils/SalaryHelper';

const ListSalary = () => {
  const [search, setSearch] = useState('');
  const [salaries,setSalaries] = useState([]);
    const filteredData = Array.isArray(salaries)
    ? salaries.filter((item) =>
        item.employeeId?.employeeId?.toLowerCase().includes(search.toLowerCase())
        )
  : [];  
  
  const {id} = useParams();
  
  let sno = 1;

    


  const fetchSalaries = async() =>{
    const data = await fetchEmpSalaries(id);
    console.log(data)
    setSalaries(data);
  }

  useEffect(()=>{
    fetchSalaries()
  },[])

  return (
<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
    
    {/* Header & Search */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <h2 className="text-4xl font-bold text-gray-800 text-center md:text-left">
        Salary History
      </h2>
      <input
        type="text"
        placeholder="Search by Emp ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>

    {/* Table */}
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full table-auto bg-white text-sm text-gray-700">
        <thead className="bg-blue-50 text-blue-900 uppercase text-xs font-semibold tracking-wider">
          <tr>
            <th className="px-5 py-3 border-b">S/N</th>
            <th className="px-5 py-3 border-b">Emp ID</th>
            <th className="px-5 py-3 border-b">Salary</th>
            <th className="px-5 py-3 border-b">Allowance</th>
            <th className="px-5 py-3 border-b">Deduction</th>
            <th className="px-5 py-3 border-b">Total</th>
            <th className="px-5 py-3 border-b">Pay Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-blue-50 transition-colors"
              >
                <td className="px-5 py-3 border-b text-center">{index + 1}</td>
                <td className="px-5 py-3 border-b text-center">{item.employeeId.employeeId}</td>
                <td className="px-5 py-3 border-b text-center">{item.basicSalary}</td>
                <td className="px-5 py-3 border-b text-center">{item.allowances}</td>
                <td className="px-5 py-3 border-b text-center">{item.deductions}</td>
                <td className="px-5 py-3 border-b text-center font-semibold">{item.netSalary}</td>
                <td className="px-5 py-3 border-b text-center">{item.payDate.slice(0, 10)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-6 text-gray-500 italic"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>


  );
}

export default ListSalary