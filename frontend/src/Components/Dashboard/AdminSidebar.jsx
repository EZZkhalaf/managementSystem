import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBuilding,
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaMoneyBill,
  FaCogs,
} from 'react-icons/fa';

const navLinkStyles =
  'flex items-center gap-3 text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-700';

const activeLinkStyles = 'bg-blue-700';
const AdminSidebar = () => {
  return (
    <div className="w-64 bg-blue-800 min-h-screen text-white p-4">
      <h3 className="text-2xl font-bold mb-8 text-center">Employee MS</h3>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? activeLinkStyles : ''}`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? activeLinkStyles : ''}`
          }
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? activeLinkStyles : ''}`
          }
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/admin-leaves"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? activeLinkStyles : ''}`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? activeLinkStyles : ''}`
          }
        >
          <FaMoneyBill />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-settings"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? activeLinkStyles : ''}`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
