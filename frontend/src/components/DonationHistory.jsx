// src/components/DonationHistory.js
import React from 'react';
import { motion } from 'framer-motion';

const DonationHistory = ({ donations, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {donations.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <p className="text-gray-500">You haven't made any donations yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {donations.map((donation) => (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Donated ₹{donation.fundAmount.toLocaleString()}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    To: {donation.orphanage.orphanageName}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Date: {new Date(donation.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{donation.payment}</p>
                  <p className="text-xs text-gray-500">ID: {donation.id}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;