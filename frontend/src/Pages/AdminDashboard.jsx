import { Outlet, useNavigate } from 'react-router-dom';
import {useAuthContext} from '../Context/authContext'
import { toast } from 'react-toastify';
import AdminSidebar from '../Components/Dashboard/AdminSidebar.jsx';
import NavBar from '../Components/Dashboard/NavBar.jsx'
import { useEffect } from 'react';
import AdminSummary from '../Components/Dashboard/AdminSummary.jsx';

const AdminDashboard = () => {
  const { user , logout } = useAuthContext();
  const navigate = useNavigate()

  useEffect(()=>{

    if (!user) {
      toast.error("please login again")
      navigate('/login')
    };
  },[user , navigate])

if(!user) return null
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <div className="flex-grow p-6">
          {/* Main content here */}
          <h1 className="text-2xl font-semibold">Welcome to the Admin Dashboard</h1>
          {/* <AdminSummary /> */}
          <Outlet />
        </div>
          
      </div>
    </div>
  );
};

export default AdminDashboard