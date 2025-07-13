import React from 'react'
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
    {/* Sidebar */}
    <div className="md:w-1/3 bg-gradient-to-b from-cyan-500 to-cyan-600 p-10 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold text-center leading-snug">
        Employee Management System
        </h1>
    </div>

    {/* Login Form */}
    <div className="flex-grow flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login</h2>
        
        <form onSubmit={handleSubmit}>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </div>

            <div className="flex items-center justify-between mb-6">
            <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-cyan-600" />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-cyan-600 hover:underline">
                Forgot password?
            </a>
            </div>

            <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
            Login
            </button>
        </form>
        </div>
    </div>
    </div>

  );
}

export default Login