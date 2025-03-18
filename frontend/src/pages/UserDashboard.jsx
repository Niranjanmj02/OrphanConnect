// src/pages/UserDashboard.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import OrphanageList from '../components/OrphanageList';
import DonationForm from '../components/DonationForm';
import DonationHistory from '../components/DonationHistory';
import { useUser } from '../context/UserContext';

const UserDashboard = ({ onLogout }) => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('orphanages');
  const [orphanages, setOrphanages] = useState([]);
  const [userDonations, setUserDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const orphanagesRes = await axios.get('http://localhost:5000/api/v1/orphanage/getorphan');
        setOrphanages(orphanagesRes.data);
        
        // For demo purposes, we're fetching all donations
        // In a real app, you would filter by user ID
        const donationsRes = await axios.get('http://localhost:5000/api/v1/donation/get');
        // Filter donations by user email (in a real app you'd use user ID)
        if (user && user.emailId) {
          setUserDonations(donationsRes.data.filter(donation => 
            donation.email === user.emailId
          ));
        } else {
          setUserDonations([]);
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [orphanagesRes, donationsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/v1/orphanage/getorphan'),
        axios.get('http://localhost:5000/api/v1/donation/get')
      ]);

      setOrphanages(orphanagesRes.data);
      
      if (user && user.emailId) {
        setUserDonations(donationsRes.data.filter(donation => 
          donation.email === user.emailId
        ));
      }
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orphanages':
        return <OrphanageList orphanages={orphanages} isLoading={isLoading} userView={true} />;
      case 'donate':
        return <DonationForm orphanages={orphanages} user={user} onSuccess={refreshData} />;
      case 'history':
        return <DonationHistory donations={userDonations} isLoading={isLoading} />;
      default:
        return <div>Select an option</div>;
    }
  };

  if (isLoading && activeTab === 'orphanages') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const menuItems = [
    { id: 'orphanages', label: 'Browse Orphanages', icon: '🏠' },
    { id: 'donate', label: 'Make Donation', icon: '❤️' },
    { id: 'history', label: 'Donation History', icon: '📜' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userType="user"
        userName={user?.name || 'User'}
        onLogout={onLogout}
      />
      
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeTab)?.label}
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

export default UserDashboard;   