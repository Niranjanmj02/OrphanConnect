// src/App.js
import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { UserProvider } from './context/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  const login = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType('');
  };

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <Navigate to={userType === 'admin' ? '/admin' : '/user'} />
                ) : (
                  <LoginPage onLogin={login} />
                )
              } 
            />
            <Route 
              path="/admin" 
              element={
                isAuthenticated && userType === 'admin' ? (
                  <AdminDashboard onLogout={logout} />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
            <Route 
              path="/user" 
              element={
                isAuthenticated && userType === 'user' ? (
                  <UserDashboard onLogout={logout} />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;