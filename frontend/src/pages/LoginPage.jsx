
// src/pages/LoginPage.js
import  { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const LoginPage = ({ onLogin }) => {
  const { setUser } = useUser();
  const [activeTab, setActiveTab] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: '',
  });
  
  const [userCredentials, setUserCredentials] = useState({
    emailId: '',
    newPassword: '',
  });

  const handleAdminChange = (e) => {
    setAdminCredentials({
      ...adminCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Static admin validation
    if (adminCredentials.username === 'admin' && adminCredentials.password === 'admin') {
      setTimeout(() => {
        setUser({ name: 'Admin', type: 'admin' });
        onLogin('admin');
        setIsLoading(false);
      }, 500);
    } else {
      setError('Invalid admin credentials');
      setIsLoading(false);
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/login', userCredentials);
      
      if (response.data) {
        setUser({ ...response.data.user, type: 'user' });
        onLogin('user');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl"
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-700">
            Hope<span className="text-indigo-500">Connect</span>
          </h1>
          <p className="mt-2 text-gray-600">Connecting hearts, changing lives</p>
        </div>

        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            className={`w-1/2 py-2.5 text-sm font-medium rounded-md transition ${
              activeTab === 'user' ? 'bg-white shadow text-purple-700' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('user')}
          >
            User / Donor
          </button>
          <button
            className={`w-1/2 py-2.5 text-sm font-medium rounded-md transition ${
              activeTab === 'admin' ? 'bg-white shadow text-purple-700' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {activeTab === 'user' ? (
          <form onSubmit={handleUserLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="emailId"
                name="emailId"
                type="email"
                required
                value={userCredentials.emailId}
                onChange={handleUserChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                value={userCredentials.newPassword}
                onChange={handleUserChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 font-medium text-white transition bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
            <div className="text-center">
              <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                Don't have an account? Sign up
              </a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAdminLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={adminCredentials.username}
                onChange={handleAdminChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="admin"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={adminCredentials.password}
                onChange={handleAdminChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 font-medium text-white transition bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {isLoading ? 'Signing in...' : 'Admin Sign In'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;