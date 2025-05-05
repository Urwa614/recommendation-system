import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaKey,
  FaUser,
  FaUserPlus,
  FaExclamationCircle
} from 'react-icons/fa';
import { loginUser } from '../api/authApi';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Invalid username or password');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    try {
      const response = await loginUser(username, password);
      console.log('Login response:', response);
      
      // Store user info in localStorage for frontend persistence
      localStorage.setItem('user', JSON.stringify({ username }));
      
      // Redirect to dashboard
      navigate('/manage');
    } catch (err) {
      setError(true);
      setErrorMessage(err.message || 'Invalid username or password');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 border shadow-lg rounded-lg p-6 bg-white">
      {/* Tabs */}
      <div className="flex mb-4">
        <button className="w-1/2 py-2 font-semibold bg-blue-500 text-white rounded-tl-lg">
          <div className="flex items-center justify-center gap-2">
            <FaUser />
            Login
          </div>
        </button>
        <button
          className="w-1/2 py-2 font-semibold bg-blue-100 text-blue-600 rounded-tr-lg"
          onClick={() => navigate('/register')} // Redirect to the register page
        >
          <div className="flex items-center justify-center gap-2">
            <FaUserPlus />
            Register
          </div>
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Input */}
        <div>
          <div
            className={`flex items-center border px-3 py-2 rounded ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <FaEnvelope
              className={`mr-3 text-lg ${
                error ? 'text-red-500' : 'text-blue-500'
              }`}
            />
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
              }}
              placeholder="Username"
              className="w-full outline-none bg-transparent"
            />
            {error && <FaExclamationCircle className="text-red-500" />}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1 ml-2">
              ❗ {errorMessage}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="flex items-center border px-3 py-2 rounded border-gray-300">
          <FaKey className="text-blue-500 mr-3 text-lg" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded font-semibold`}
        >
          {loading ? 'LOGGING IN...' : 'LOG IN'}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center text-sm">
        <p>
          Not a member?{' '}
          <span className="text-blue-600 cursor-pointer font-medium">
            Sign Up
          </span>
        </p>
        <button
          onClick={() => navigate('/')} // Redirect to the home page
          className="border border-blue-500 px-4 py-1 rounded text-blue-500 hover:bg-blue-100 transition"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default LoginForm;