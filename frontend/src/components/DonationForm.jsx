// src/components/DonationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const DonationForm = ({ orphanages, user, onSuccess }) => {
  const location = useLocation();
  const preselectedOrphanage = location.state?.orphanageId || '';

  const [formData, setFormData] = useState({
    name: user?.name || '',
    id: `DONOR${Date.now()}`, // Simple unique ID generation
    mobileNumber: user?.phoneNo || '',
    email: user?.emailId || '',
    orphanage: preselectedOrphanage,
    fundAmount: '',
    orphanageAccountNo: '',
    payment: 'completed',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (formData.orphanage) {
      const selected = orphanages.find(orph => orph._id === formData.orphanage);
      setFormData(prev => ({ ...prev, orphanageAccountNo: selected?.bankAccNo || '' }));
    }
  }, [formData.orphanage, orphanages]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/v1/donation/create', formData);
      if (response.status === 201) {
        setFormData({
          name: user?.name || '',
          id: `DONOR${Date.now()}`,
          mobileNumber: user?.phoneNo || '',
          email: user?.emailId || '',
          orphanage: '',
          fundAmount: '',
          orphanageAccountNo: '',
          payment: 'completed',
        });
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record donation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Make a Donation</h2>
      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="987-654-3210"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="jane.doe@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Orphanage</label>
          <select
            name="orphanage"
            value={formData.orphanage}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Choose an orphanage</option>
            {orphanages.map(orph => (
              <option key={orph._id} value={orph._id}>
                {orph.orphanageName} - {orph.city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Donation Amount (₹)</label>
          <input
            type="number"
            name="fundAmount"
            value={formData.fundAmount}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Orphanage Account Number</label>
          <input
            type="text"
            name="orphanageAccountNo"
            value={formData.orphanageAccountNo}
            readOnly
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition"
        >
          {isLoading ? 'Processing...' : 'Donate Now'}
        </button>
      </form>
    </motion.div>
  );
};

export default DonationForm;