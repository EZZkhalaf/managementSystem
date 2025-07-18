import React from 'react'
import { useState } from 'react';
import { changeStatus, fetchLeave } from '../../Utils/LeavesHelper';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const LeaveDetails = () => {
    const {id} = useParams();
  const [leave , setLeave] = useState(null);

  const fetchingLeave = async()=>{
    const data = await fetchLeave(id);
    setLeave(data)
  }
  console.log(leave)

  useEffect(()=>{
    fetchingLeave();
  },[])

//   const statusChanging = async(status)=>{
//     const data = await changeStatus( id, status) ;
//     setLeave(data)
//   }

  return (
<div className="bg-white max-w-4xl mx-auto px-6 py-10 rounded-2xl shadow-xl">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
    Leave Details
  </h2>

  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
    {/* Profile Image */}
    <div className="flex-shrink-0">
      <img
        src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
        alt="Profile"
        className="w-40 h-40 rounded-full object-cover border border-gray-300 shadow"
      />
    </div>

    {/* Details */}
    <div className="w-full text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      <p><span className="font-semibold">Name:</span> {leave.employeeId.userId.name}</p>
      <p><span className="font-semibold">Employee ID:</span> {leave.employeeId.employeeId}</p>
      <p><span className="font-semibold">Leave Type:</span> {leave.leaveType}</p>
      <p><span className="font-semibold">Reason:</span> {leave.reason}</p>
      <p><span className="font-semibold">Department:</span> {leave.employeeId.department.dep_name}</p>
      <p><span className="font-semibold">Start Date:</span> {leave.startDate}</p>
      <p><span className="font-semibold">End Date:</span> {leave.endDate}</p>

      <div className="sm:col-span-2">
        {leave.status === "Pending" ? (
          <div className="mt-2 flex gap-4">
            <button 
            onClick={() => statusChanging("Approved")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
              Approve
            </button>
            <button 
            onClick={() => statusChanging(  "Rejected")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
              Reject
            </button>
          </div>
        ) : (
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                leave.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : leave.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {leave.status}
            </span>
          </p>
        )}
      </div>
    </div>
  </div>
</div>


  );
}

export default LeaveDetails