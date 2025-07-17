import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../Context/authContext'
import { toast } from 'react-toastify';
import SideBar from '../Components/EmployeeDash/SideBar';
import NavBar from '../Components/Dashboard/NavBar';
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
    const { user , logout } = useAuthContext();

    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-grow">
          <SideBar />
          <div className="flex-grow p-6">
            {/* Main content here */}
            <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
            {/* <AdminSummary /> */}
            <Outlet />
          </div>
            
        </div>
      </div>
    );
}

export default EmployeeDashboard