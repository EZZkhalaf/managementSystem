import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../Components/AuthLayout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
        toast.error("Please fill in all fields");
        return;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
    }
    try {
        const res = await fetch("http://localhost:5000/api/auth/register" , {
            method : "post" , 
            headers :{'Content-Type' : 'application/json'},
            body : JSON.stringify({
                name : name , 
                email : email , 
                password : password, 
                role : role
            })
        })

        
        const data = await res.json()
        if (!res.ok) {
            // If the server returned an error response 
            const errorMsg = "Registration failed. Please try again.";
            toast.error(data.error);
            return;
        }
        if(data.message === "User registered successfully"){
            toast.success("registered successfully")
            navigate('/login')
        }else toast.info(data.message || "Something happened");
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
};

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Register</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Role */}
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role (e.g., admin, employee)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Register
        </button>
      </form>

      {/* Login Redirect */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-cyan-600 font-medium hover:underline">
          Login here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
