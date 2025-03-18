// src/pages/AdminDashboard.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import UserRegistration from '../components/UserRegistration';
import OrphanageRegistration from '../components/OrphanageRegistration';
import OrphanageList from '../components/OrphanageList';
import DonationsList from '../components/DonationsList';
import UsersList from '../components/UsersList';
import { useUser } from '../context/UserContext';

const AdminDashboard = ({ onLogout }) => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orphanages, setOrphanages] = useState([]);
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [orphanagesRes, donationsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/v1/orphanage/getorphan'),
          axios.get('http://localhost:5000/api/v1/donation/get'),
          axios.get('http://localhost:5000/api/v1/users/get')
        ]);

        setOrphanages(orphanagesRes.data);
        setDonations(donationsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to refresh data after new registrations
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [orphanagesRes, donationsRes, usersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/v1/orphanage/getorphan'),
        axios.get('http://localhost:5000/api/v1/donation/get'),
        axios.get('http://localhost:5000/api/v1/users/get')
      ]);

      setOrphanages(orphanagesRes.data);
      setDonations(donationsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
              title="Total Orphanages" 
              value={orphanages.length} 
              icon="🏠"
              color="bg-blue-500"
            />
            <DashboardCard 
              title="Total Donations" 
              value={donations.length} 
              icon="💰"
              color="bg-green-500"
            />
            <DashboardCard 
              title="Total Users" 
              value={users.length} 
              icon="👥"
              color="bg-purple-500"
            />
            <DashboardCard 
              title="Total Donation Amount" 
              value={`₹${donations.reduce((sum, donation) => sum + (donation.fundAmount || 0), 0).toLocaleString()}`} 
              icon="💸"
              color="bg-amber-500"
            />
          </div>
        );
      case 'userRegistration':
        return <UserRegistration onSuccess={refreshData} />;
      case 'orphanageRegistration':
        return <OrphanageRegistration onSuccess={refreshData} />;
      case 'orphanageList':
        return <OrphanageList orphanages={orphanages} isLoading={isLoading} />;
      case 'donationsList':
        return <DonationsList donations={donations} isLoading={isLoading} />;
      case 'usersList':
        return <UsersList users={users} isLoading={isLoading} />;
      default:
        return <div>Select an option</div>;
    }
  };

  if (isLoading && activeTab === 'dashboard') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'userRegistration', label: 'Register User', icon: '👤' },
    { id: 'orphanageRegistration', label: 'Register Orphanage', icon: '🏠' },
    { id: 'orphanageList', label: 'Orphanages', icon: '📋' },
    { id: 'donationsList', label: 'Donations', icon: '💰' },
    { id: 'usersList', label: 'Users', icon: '👥' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userType="admin"
        userName={user?.name || 'Admin'}
        onLogout={onLogout}
      />
      
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
        </header>
        
        <main className="p-6">
          {error && (
            <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Dashboard card component for statistics
const DashboardCard = ({ title, value, icon, color }) => (
  <div className="p-6 bg-white rounded-xl shadow-md">
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color} text-white text-xl`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;