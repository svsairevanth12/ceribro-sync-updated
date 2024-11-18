import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Developers</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">Tilak G. (23f21a3157@gatesit.ac.in)</li>
              <li className="text-gray-600">Revanth S. (22f21a05a9@gatesit.ac.in)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/about" className="text-indigo-600 hover:text-indigo-800">About</a></li>
              <li><a href="/privacy" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a></li>
              <li><a href="/terms" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <p className="mt-4 text-gray-600">
              For support or inquiries:<br />
              support@cerebrosync.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Cerebro Sync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};