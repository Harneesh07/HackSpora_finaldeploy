import axios from 'axios';

// Replace this with your actual Spring Boot backend URL
const API_URL = 'http://localhost:8080/api/auth'; 

// Simulate API call for local testing if backend isn't ready
const simulateNetwork = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (email, password) => {
  try {
    // UNCOMMENT to use actual API:
    // const response = await axios.post(`${API_URL}/login`, { email, password });
    // return response.data;

    // Simulated Response
    await simulateNetwork(1000);
    if (email && password) {
      return { 
        id: 1, 
        name: 'Demo User', 
        email: email,
        token: 'mock-jwt-token-123'
      };
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || error.message || 'Login failed';
  }
};

export const registerUser = async (userData) => {
  try {
    // UNCOMMENT to use actual API:
    // const response = await axios.post(`${API_URL}/register`, userData);
    // return response.data;

    // Simulated Response
    await simulateNetwork(1000);
    return {
      message: 'Registration successful',
      user: { ...userData, id: 2 }
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response?.data || error.message || 'Registration failed';
  }
};
