import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Briefcase, Calendar } from 'lucide-react';
import type { User as UserType } from '../types';

export const Profile = () => {
  const [user] = useState<UserType>({
    id: '1',
    name: 'Guest User',
    age: 30,
    gender: 'Prefer not to say',
    occupation: 'Not specified',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Profile</h1>
        <p className="text-xl text-gray-600">
          Manage your personal information and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-1"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <User className="h-12 w-12 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-600">Patient ID: {user.id}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="text-gray-900">{user.age} years</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-gray-900">{user.gender}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Briefcase className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="text-gray-900">{user.occupation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="text-gray-900">Not provided</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Assessment History</h3>
        <div className="text-center text-gray-600 py-8">
          <p>No assessments completed yet.</p>
          <button className="btn-primary mt-4">Start Assessment</button>
        </div>
      </motion.div>
    </div>
  );
};