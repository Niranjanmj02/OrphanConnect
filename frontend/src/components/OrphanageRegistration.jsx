// src/components/OrphanageRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const OrphanageRegistration = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    orphanageName: '',
    orphanageAddress: '',
    city: '',
    pincode: '',
    phoneNo: '',
    emailId: '',
    bankAccNo: '',
    approveStrength: '',
    newPassword: '',
    confirmPassword: '',
    proof: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/v1/orphanage/register', formData);
      if (response.status === 201) {
        setFormData({
          orphanageName: '',
          orphanageAddress: '',
          city: '',
          pincode: '',
          phoneNo: '',
          emailId: '',
          bankAccNo: '',
          approveStrength: '',
          newPassword: '',
          confirmPassword: '',
          proof: '',
        });
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register orphanage');
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
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Register New Orphanage</h2>
      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Orphanage Name</label>
          <input
            type="text"
            name="orphanageName"
            value={formData.orphanageName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Hope Orphanage"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="orphanageAddress"
            value={formData.orphanageAddress}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="123 Main St"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Springfield"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="62701"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="123-456-7890"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="hope@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
          <input
            type="text"
            name="bankAccNo"
            value={formData.bankAccNo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="9876543210"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Approved Strength</label>
          <input
            type="number"
            name="approveStrength"
            value={formData.approveStrength}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Proof URL</label>
          <input
            type="url"
            name="proof"
            value={formData.proof}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="http://example.com/proof.pdf"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition"
        >
          {isLoading ? 'Registering...' : 'Register Orphanage'}
        </button>
      </form>
    </motion.div>
  );
};

export default OrphanageRegistration;