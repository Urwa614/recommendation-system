import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
