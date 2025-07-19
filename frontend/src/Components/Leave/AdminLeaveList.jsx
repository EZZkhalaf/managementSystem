import React from 'react'
import { useState } from 'react'
import { adminTableColumns, customStyles, fetchAllLeaves } from '../../Utils/LeavesHelper'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'

const AdminLeaveList = () => {
    const [search , setSearch] = useState("")
    const [leaves , setLeaves] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");


    const fetchLeaves = async()=>{
        const data = await fetchAllLeaves();
        setLeaves(data);
    }
    const filteredLeaves = leaves.filter((leave) => {
      const departmentName = leave?.department|| "";
      const leaveStatus = leave?.status || "";

      const departmentMatch = departmentName.toLowerCase().includes(search.toLowerCase());
      const statusMatch =
        statusFilter === "All" ||
        leaveStatus.toLowerCase() === statusFilter.toLowerCase();

      return departmentMatch && statusMatch;
    });


    console.log(leaves)

    useEffect(()=>{
        fetchLeaves();
    },[])


  return (
    <div className="mt-8 px-4 md:px-8">
      {/* Search + Filter Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by Department Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "Approved", "Rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    statusFilter === status
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
        <DataTable
          columns={adminTableColumns()}
          data={filteredLeaves}
          responsive
          pagination
          customStyles={customStyles}
        />

      </div>
    </div>
);

}

export default AdminLeaveList