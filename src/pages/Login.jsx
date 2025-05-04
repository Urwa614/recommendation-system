import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaKey,
  FaUser,
  FaUserPlus,
  FaExclamationCircle
} from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUserData = JSON.parse(localStorage.getItem('userData'));
    console.log('Saved User Data:', savedUserData);
    console.log('Entered Email:', email);
    console.log('Entered Password:', password);

    if (savedUserData && savedUserData.email.toLowerCase() === email.toLowerCase() && savedUserData.password === password) {
      setEmailError(false);
      console.log('Login successful');
      navigate('/manage');
    } else {
      setEmailError(true);
      console.error('Invalid email or password');
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
              emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <FaEnvelope
              className={`mr-3 text-lg ${
                emailError ? 'text-red-500' : 'text-blue-500'
              }`}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              placeholder="Email"
              className="w-full outline-none bg-transparent"
            />
            {emailError && <FaExclamationCircle className="text-red-500" />}
          </div>
          {emailError && (
            <p className="text-red-500 text-sm mt-1 ml-2">
              ❗ Invalid email or password
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
          className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600"
        >
          LOG IN
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