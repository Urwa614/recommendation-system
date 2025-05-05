import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaMapMarkerAlt,
    FaKey
} from 'react-icons/fa';
import { registerUser } from '../api/authApi';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        city: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(''); // Clear errors when user types
    };
    
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        if (!formData.username || !formData.password) {
            setError('Username and password are required');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            // Call the backend API to register the user
            const response = await registerUser(formData.username, formData.password);
            console.log('Registration successful:', response);
            
            // Store user info in localStorage including id from response
            localStorage.setItem('user', JSON.stringify({
                id: response.id,
                username: response.username || formData.username
            }));
            
            // Show success message briefly before redirecting
            setSuccess(true);
            setTimeout(() => {
                // Redirect to dashboard after showing success message
                navigate('/manage');
            }, 1500);
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 border shadow-lg rounded-lg p-6 bg-white">
            {/* Header */}
            <div className="flex mb-6">
                <div className="w-full py-2 font-semibold bg-blue-500 text-white rounded-t-lg text-center">
                    <div className="flex items-center justify-center gap-2">
                        <FaUser />
                        <h1 className="text-xl">Create New Account</h1>
                    </div>
                </div>
            </div>
            
            {/* Success Message */}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded relative" role="alert">
                    <strong className="font-bold">Success! </strong>
                    <span className="block sm:inline">Your account has been created. Redirecting...</span>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Register Form */}
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

                    {/* Username */}
                    <div className="flex items-center border px-3 py-2 rounded">
                        <FaEnvelope className="text-blue-500 mr-3" />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Username *"
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
                    <button 
                        type="submit"
                        disabled={loading || success}
                        className={`w-full ${loading || success ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded font-semibold`}
                    >
                        {loading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Account'}
                    </button>
                </form>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center text-sm">
                <p>
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className="text-blue-600 cursor-pointer font-medium"
                    >
                        Log In
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

export default RegisterForm;