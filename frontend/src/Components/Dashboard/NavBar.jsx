import React, { useState } from 'react';
import { useAuthContext } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800 text-white p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">
        <span className="text-white">Employee</span>
        <span className="text-yellow-400">MS</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        {user && (
          <span className="text-white text-lg">Hello, {user.user.name}</span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-700 text-white px-6 py-4 flex flex-col gap-4 md:hidden shadow-lg z-10">
          {user && <span>Hello, {user.user.name}</span>}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
