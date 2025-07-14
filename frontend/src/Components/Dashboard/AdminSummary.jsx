import React from 'react';
import SummaryCard from './SummaryCard';
import {
  FaBuilding,
  FaUsers,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaRegFileAlt,
} from 'react-icons/fa';

const AdminSummary = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Main Summary Cards */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Dashboard Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={15}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={7}
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
            number={5}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={2}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={4}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={1}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
