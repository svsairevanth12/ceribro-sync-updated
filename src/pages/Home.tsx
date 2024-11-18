import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Cerebro Sync
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your comprehensive cognitive health companion for early detection and monitoring
          </p>
          <Link
            to="/assessment"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Assessment
          </Link>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: Brain,
            title: 'Cognitive Testing',
            description: 'Comprehensive assessment of memory, attention, and more',
          },
          {
            icon: Activity,
            title: 'Progress Tracking',
            description: 'Monitor your cognitive health journey over time',
          },
          {
            icon: Clock,
            title: 'Early Detection',
            description: 'Identify potential concerns before they become serious',
          },
          {
            icon: Trophy,
            title: 'Personalized Goals',
            description: 'Set and achieve your cognitive health objectives',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Cerebro Sync?</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Cerebro Sync combines cutting-edge cognitive science with user-friendly technology
            to provide comprehensive assessment and monitoring of chemotherapy-induced
            cognitive impairment.
          </p>
          <p>
            Our platform offers validated screening tools, AI-powered recommendations,
            and continuous support to help you maintain optimal cognitive health throughout
            your treatment journey.
          </p>
        </div>
      </section>
    </div>
  );
};