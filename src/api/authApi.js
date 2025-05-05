// API client for auth-related endpoints
const API_URL = 'http://localhost:8000';

/**
 * Register a new user
 * @param {string} username - The username
 * @param {string} password - The password
 * @param {string} fullName - The user's full name (optional)
 * @param {string} phone - The user's phone number (optional)
 * @param {string} city - The user's city (optional)
 * @returns {Promise} - Response from the API
 */
export const registerUser = async (username, password, fullName = '', phone = '', city = '') => {
  try {
    const userData = {
      username, 
      password,
      fullName,
      phone,
      city
    };
    
    // Remove empty fields
    Object.keys(userData).forEach(key => 
      !userData[key] && delete userData[key]
    );
    
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Registration failed');
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Login a user
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {Promise} - Response from the API
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
