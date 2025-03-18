    // src/components/UsersList.js
import React from 'react';
import { motion } from 'framer-motion';

const UsersList = ({ users, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {users.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <p className="text-gray-500">No users found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {users.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">Email: {user.emailId}</p>
                  <p className="mt-1 text-sm text-gray-500">Phone: {user.phoneNo}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;