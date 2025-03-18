    // src/components/Sidebar.js
import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ menuItems, activeTab, setActiveTab, userType, userName, onLogout }) => {
  return (
    <div className="w-64 bg-white border-r shadow-sm">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-purple-700">
            Hope<span className="text-indigo-500">Connect</span>
          </h2>
          <p className="mt-1 text-sm text-gray-500">Orphanage Donation System</p>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
              <span className="text-purple-700 text-lg">
                {userType === 'admin' ? '👑' : '👤'}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userType}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1 h-full bg-purple-700 absolute right-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </nav>
        
        <div className="p-4 mt-auto border-t">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-red-600 rounded-lg hover:bg-red-50"
          >
            <span className="mr-3">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;