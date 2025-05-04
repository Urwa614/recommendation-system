import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      navigate('/manage');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Career Recommender</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <button
            onClick={handleDashboardClick}
            className="hover:underline focus:outline-none"
          >
            Dashboard
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
