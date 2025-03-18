// src/components/OrphanageList.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrphanageList = ({ orphanages, isLoading, userView = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const cities = [...new Set(orphanages.map(orph => orph.city))];
  const filteredOrphanages = orphanages.filter(orphanage => {
    const matchesSearch = 
      orphanage.orphanageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orphanage.orphanageAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === '' || orphanage.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search orphanages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredOrphanages.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <p className="text-gray-500">No orphanages found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrphanages.map((orphanage) => (
            <OrphanageCard 
              key={orphanage._id} 
              orphanage={orphanage} 
              userView={userView} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OrphanageCard = ({ orphanage, userView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition"
    >
      <div className="h-32 bg-gradient-to-r from-purple-400 to-indigo-500">
        <div className="flex items-center justify-center h-full text-5xl">
          🏠
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{orphanage.orphanageName}</h3>
        <p className="mt-1 text-gray-600">{orphanage.orphanageAddress}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span className="mr-2">📍</span>
          <span>{orphanage.city}, {orphanage.pincode}</span>
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span className="mr-2">👤</span>
          <span>Capacity: {orphanage.approveStrength}</span>
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span className="mr-2">📞</span>
          <span>{orphanage.phoneNo}</span>
        </div>
        {userView && (
          <Link
            to="/user"
            state={{ orphanageId: orphanage._id }}
            className="mt-4 inline-block w-full px-4 py-2 text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            onClick={() => document.getElementById('donate-tab').click()} // Trigger donation tab
          >
            Donate Now
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default OrphanageList;