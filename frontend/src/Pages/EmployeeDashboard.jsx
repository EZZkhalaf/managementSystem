import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../Context/authContext'
import { toast } from 'react-toastify';

const EmployeeDashboard = () => {
    const { user , logout } = useAuthContext();
    const navigate = useNavigate()
    if (!user) {
      toast.error("please login again")
      navigate('/login')
    };
  
  
  
    return (
      <div>
        employee Dashboard<br />
        Welcome, {user.user.name}
        <button className='bg-black' onClick={logout}>logout</button>
      </div>
    );
}

export default EmployeeDashboard