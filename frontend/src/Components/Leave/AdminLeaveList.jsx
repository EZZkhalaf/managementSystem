import React from 'react'
import { useState } from 'react'
import { adminTableColumns, customStyles, fetchAllLeaves } from '../../Utils/LeavesHelper'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'

const AdminLeaveList = () => {
    const [search , setSearch] = useState("")
    const [filter , setFilter] = useState("")
    const [leaves , setLeaves] = useState([]);
    const fetchLeaves = async()=>{
        const data = await fetchAllLeaves();
        setLeaves(data);
    }

    useEffect(()=>{
        fetchLeaves();
    },[])

    // return (
    //     <div className='mt-5'>
    //         {/* Search + Filter Buttons */}
    //         <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
    //         <input
    //             type="text"
    //             placeholder="Search By Dep Name"
    //             value={search}
    //             // onChange={(e) => setSearch(e.target.value)}
    //             className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-1/3"
    //         />

            
    //         </div>
    //         <DataTable
    //             columns={adminTableColumns()}
    //             data={leaves}
    //             responsive
    //             pagination
    //             // customStyles={customStyles}
    //         />
    //     </div>
    // )

    return (
  <div className="mt-8 px-4 md:px-8">
    {/* Search + Filter Buttons */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by Department Name"
        value={search}
        // onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
      />

      {/* Optional: Add filter/sort buttons here */}
      {/* <div className="flex gap-2">
        <button className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition">Filter</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition">Reset</button>
      </div> */}
    </div>

    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
      <DataTable
        columns={adminTableColumns()}
        data={leaves}
        responsive
        pagination
        customStyles={customStyles}
      />
    </div>
  </div>
);

}

export default AdminLeaveList