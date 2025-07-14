import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../Components/AuthLayout';
import { toast } from 'react-toastify';
import { useAuthContext } from '../Context/authContext';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuthContext();
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
            if (!email || !password ) {
                toast.error("Please fill in all fields");
                return;
            }
        

            try {
                const res = await fetch("http://localhost:5000/api/auth/login" , {
                    method : "post" , 
                    headers :{'Content-Type' : 'application/json'},
                    body : JSON.stringify({
                        email : email , 
                        password : password
                        
                    })
                })
        
                
                const data = await res.json()
                if (!res.ok) {
                    // If the server returned an error response 
                    const errorMsg = "login failed. Please try again.";
                    toast.error(data.error);
                    return;
                }
                if(data.success){
                    toast.success("logged in  successfully")
                    login(data);


                    if(data.user.role === 'admin')navigate('/admin-dashboard')
                    else navigate('/employee-dahsboard')
                
                }else toast.info(data.message || "Something happened");
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
    };

    return (
        <AuthLayout>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
            </label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            </div>

            {/* Password Input */}
            <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
            </label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
            Login
            </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-cyan-600 font-medium hover:underline">
            Create one
            </Link>
        </p>
        </AuthLayout>
    );
}

export default Login

