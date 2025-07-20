import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import {
  FaBuilding,
  FaUsers,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaRegFileAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminSummary = () => {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalLeaves: 0,
    leaveApproved: 0,
    leavePending: 0,
    leaveRejected: 0
  });

  const fetchDashboardSummary = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/summary', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setSummary(data.data);
      } else {
        toast.error("Failed to load dashboard summary");
      }
    } catch (error) {
      console.error("Fetch summary error:", error);
      toast.error("Error loading dashboard");
    }
  };

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Main Summary Cards */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Dashboard Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-700"
        />
      </div>

      {/* Leave Details Section */}
      <div className="mt-10">
        <h4 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Leave Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            icon={<FaRegFileAlt />}
            text="Leave Applied"
            number={summary.totalLeaves}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveApproved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leavePending}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveRejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
