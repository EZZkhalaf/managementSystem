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
  : [];  const {id} = useParams();
  
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
            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold mb-4 md:mb-0 text-center md:text-left text-gray-800">
                    Salary History
                </h2>
                <input
                    type="text"
                    placeholder="Search by Emp ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                />
                </div>

                <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                    <tr>
                        <th className="px-4 py-3 border">SNO</th>
                        <th className="px-4 py-3 border">EMP ID</th>
                        <th className="px-4 py-3 border">Salary</th>
                        <th className="px-4 py-3 border">Allowance</th>
                        <th className="px-4 py-3 border">Deduction</th>
                        <th className="px-4 py-3 border">Total</th>
                        <th className="px-4 py-3 border">Pay Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <tr key={index} className="...">
                            <td className="px-4 py-2 border">{index + 1}</td>
                            <td className="px-4 py-2 border">{item.employeeId.employeeId}</td>
                            <td className="px-4 py-2 border">{item.basicSalary}</td>
                            <td className="px-4 py-2 border">{item.allowances}</td>
                            <td className="px-4 py-2 border">{item.deductions}</td>
                            <td className="px-4 py-2 border">{item.netSalary}</td>
                            <td className="px-4 py-2 border">{item.payDate.slice(0,10)}</td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-4 text-gray-400 italic">
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