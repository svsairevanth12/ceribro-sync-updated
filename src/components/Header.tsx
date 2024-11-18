import React from 'react';
import { Brain } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Cerebro Sync</h1>
        </div>
        <p className="mt-2 text-indigo-100">Early Detection for Cognitive Well-being</p>
      </div>
    </header>
  );
};