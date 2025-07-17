import React, { useState } from 'react';
import { useAuthContext } from '../../Context/authContext';
import { addLeave } from '../../Utils/LeavesHelper';
import { useNavigate } from 'react-router-dom';

const AddLeave = () => {
  const {user} = useAuthContext();
  const [leave, setLeave] = useState({
    userId: user?.user._id || "", 
    leaveType: "",
    startDate: "",
    toDate: "",
    reason: "",
  });

  const handleChange = (e) =>{
    const {name , value} = e.target;
    setLeave((prev)=>({ ...prev  , [name] : value}));
  }

  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    await addLeave(leave , navigate);

  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl "
      >
        <h2 className="text-2xl font-semibold mb-6">Request for Leave</h2>

        {/* Leave Type Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Leave Type</label>
          <select
            value={leave.leaveType}
            name='leaveType'
            onChange={(e) => handleChange(e)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="">Select Leave </option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>

        {/* Date Pickers */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">From Date</label>
            <input
              type="date"
              name="startDate"
              value={leave.startDate}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">To Date</label>
            <input
              type="date"
              name="toDate"
              value={leave.toDate}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            placeholder="Reason"
            value={leave.reason}
            name="reason"
            onChange={(e) => handleChange(e)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
