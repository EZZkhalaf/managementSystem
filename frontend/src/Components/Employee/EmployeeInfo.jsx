import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployeeInfo = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch employee by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        console.log(data)
        if (data.success) {
          const emp = data.employee;
          setEmployee({
            name: emp.userId?.name || 'N/A',
            email: emp.userId?.email || 'N/A',
            profileImage: emp.userId?.profileImage
              ? `http://localhost:5000/${emp.userId.profileImage}`
              : null,
            employeeId: emp.employeeId,
            dob: new Date(emp.dob).toLocaleDateString(),
            designation: emp.designation,
            department: emp.department?.dep_name || 'N/A',
            gender: emp.gender,
            maritalStatus: emp.maritalStatus,
            salary: emp.salary,
          });
        } else {
          toast.error('Employee not found');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading employee information...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load employee data.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={employee.profileImage}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border border-gray-300"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">{employee.name}</h2>
          <p className="text-gray-600">{employee.email}</p>
          <p className="text-sm text-gray-400">Employee ID: {employee.employeeId}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoRow label="Date of Birth" value={employee.dob} />
        <InfoRow label="Designation" value={employee.designation} />
        <InfoRow label="Department" value={employee.department} />
        <InfoRow label="Gender" value={employee.gender} />
        <InfoRow label="Marital Status" value={employee.maritalStatus} />
        <InfoRow label="Salary" value={`$${employee.salary}`} />
      </div>
    </div>
  );
};

// Reusable component for label-value pairs
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value || 'N/A'}</span>
  </div>
);

export default EmployeeInfo;
