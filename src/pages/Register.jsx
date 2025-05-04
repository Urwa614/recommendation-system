import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaKey
} from 'react-icons/fa';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: ''
  });
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
  
    // Save form data to local storage
    localStorage.setItem('userData', JSON.stringify(formData));
  
    console.log('Form Data saved to local storage:', formData);
  
    // Redirect to the dashboard page
    navigate('/dashboard');
  };
  return (
    <div className="w-full max-w-md mx-auto mt-10 border shadow-lg rounded-lg p-6 bg-white">
      {/* Tabs */}
      <div className="flex">
        <button
          className={`w-1/2 py-2 font-semibold ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'}`}
          onClick={() => setActiveTab('login')}
        >
          <div className="flex items-center justify-center gap-2">
            <FaUser />
            Login
          </div>
        </button>
        <button
          className={`w-1/2 py-2 font-semibold ${activeTab === 'register' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'}`}
          onClick={() => setActiveTab('register')}
        >
          <div className="flex items-center justify-center gap-2">
            <FaUser />
            Register
          </div>
        </button>
      </div>

      {/* Login Form */}
      {activeTab === 'login' && (
        <form
        className="mt-6 space-y-4"
        onSubmit={handleRegisterSubmit}
        action="/" // Simulate a real form submission
      >
        {/* Full Name */}
        <div className="flex items-center border px-3 py-2 rounded">
          <FaUser className="text-blue-500 mr-3" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name *"
            className="w-full outline-none"
          />
        </div>
      
        {/* Email */}
        <div className="flex items-center border px-3 py-2 rounded">
          <FaEnvelope className="text-blue-500 mr-3" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email *"
            className="w-full outline-none"
          />
        </div>
      
        {/* Password */}
        <div className="flex items-center border px-3 py-2 rounded">
          <FaLock className="text-blue-500 mr-3" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password *"
            className="w-full outline-none"
          />
        </div>
      
        {/* Confirm Password */}
        <div className="flex items-center border px-3 py-2 rounded">
          <FaLock className="text-blue-500 mr-3" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password *"
            className="w-full outline-none"
          />
        </div>
      
        {/* Submit Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600">
          SUBMIT & START TEST
        </button>
      </form>
      )}

      {/* Register Form */}
      {activeTab === 'register' && (
        <form className="mt-6 space-y-4" onSubmit={handleRegisterSubmit}>
          {/* Full Name */}
          <div className="flex items-center border px-3 py-2 rounded">
            <FaUser className="text-blue-500 mr-3" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name *"
              className="w-full outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border px-3 py-2 rounded">
            <FaEnvelope className="text-blue-500 mr-3" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email *"
              className="w-full outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border px-3 py-2 rounded">
            <FaLock className="text-blue-500 mr-3" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password *"
              className="w-full outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border px-3 py-2 rounded">
            <FaLock className="text-blue-500 mr-3" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password *"
              className="w-full outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border px-3 py-2 rounded">
            <FaPhone className="text-blue-500 mr-3" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full outline-none"
            />
          </div>

          {/* City */}
          <div className="flex items-center border px-3 py-2 rounded">
            <FaMapMarkerAlt className="text-blue-500 mr-3" />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="w-full outline-none"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600">
            SUBMIT & START TEST
          </button>
        </form>
      )}

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center text-sm">
        {activeTab === 'login' ? (
          <p>
            Not a member?{' '}
            <span
              onClick={() => setActiveTab('register')}
              className="text-blue-600 cursor-pointer font-medium"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setActiveTab('login')}
              className="text-blue-600 cursor-pointer font-medium"
            >
              Log In
            </span>
          </p>
        )}

        <button className="border border-blue-500 px-4 py-1 rounded text-blue-500 hover:bg-blue-100 transition">
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default AuthForm;