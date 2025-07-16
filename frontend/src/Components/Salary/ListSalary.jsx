import React, { useState } from 'react';

const ListSalary = () => {
  const [search, setSearch] = useState('');

  const salaryData = [
    {
      sno: 1,
      empId: 'yousaf222',
      salary: 1000,
      allowance: 50,
      deduction: 40,
      total: 1010,
      payDate: '2024-09-11',
    },
    // Add more salary records here if needed
  ];

  const filteredData = salaryData.filter((item) =>
    item.empId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold mb-2 md:mb-0 text-center md:text-left">
            Salary History
          </h2>
          <input
            type="text"
            placeholder="Search By Emp ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm">
                <th className="px-4 py-2 border">SNO</th>
                <th className="px-4 py-2 border">EMP ID</th>
                <th className="px-4 py-2 border">SALARY</th>
                <th className="px-4 py-2 border">ALLOWANCE</th>
                <th className="px-4 py-2 border">DEDUCTION</th>
                <th className="px-4 py-2 border">TOTAL</th>
                <th className="px-4 py-2 border">PAY DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.sno} className="text-center text-sm">
                    <td className="px-4 py-2 border">{item.sno}</td>
                    <td className="px-4 py-2 border">{item.empId}</td>
                    <td className="px-4 py-2 border">{item.salary}</td>
                    <td className="px-4 py-2 border">{item.allowance}</td>
                    <td className="px-4 py-2 border">{item.deduction}</td>
                    <td className="px-4 py-2 border">{item.total}</td>
                    <td className="px-4 py-2 border">{item.payDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
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