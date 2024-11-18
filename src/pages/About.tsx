import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Brain } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Cerebro Sync</h1>
        <p className="text-xl text-gray-600">
          Empowering patients and healthcare providers with advanced cognitive monitoring
        </p>
      </motion.section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Brain,
            title: 'Our Mission',
            description: 'To provide early detection and monitoring of cognitive changes during chemotherapy treatment.',
          },
          {
            icon: Heart,
            title: 'Our Vision',
            description: 'To improve quality of life for cancer patients by addressing cognitive health proactively.',
          },
          {
            icon: Shield,
            title: 'Our Values',
            description: 'Commitment to scientific validity, user privacy, and continuous improvement.',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <item.icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </section>

      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Tilak G.</h3>
            <p className="text-gray-600 mb-2">Lead Developer</p>
            <p className="text-gray-500">23f21a3157@gatesit.ac.in</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Revanth S.</h3>
            <p className="text-gray-600 mb-2">Technical Architect</p>
            <p className="text-gray-500">22f21a05a9@gatesit.ac.in</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Our Commitment</h2>
        <p className="text-lg">
          We are dedicated to advancing the understanding and management of chemotherapy-induced
          cognitive impairment through innovative technology and evidence-based approaches.
        </p>
      </section>
    </div>
  );
};