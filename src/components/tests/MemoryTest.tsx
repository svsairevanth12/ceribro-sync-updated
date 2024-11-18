import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WORD_LIST = ['apple', 'house', 'pencil', 'dog', 'river', 'book', 'chair', 'sun', 'tree', 'phone'];
const DISPLAY_TIME = 30000; // 30 seconds
const DELAYED_RECALL_TIME = 900000; // 15 minutes

export const MemoryTest = () => {
  const [phase, setPhase] = useState<'display' | 'immediate' | 'waiting' | 'delayed'>('display');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DISPLAY_TIME / 1000);

  useEffect(() => {
    if (phase === 'display' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (phase === 'display' && timeLeft === 0) {
      setPhase('immediate');
    }
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase === 'waiting') {
      const timer = setTimeout(() => setPhase('delayed'), DELAYED_RECALL_TIME);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const words = userInput.toLowerCase().split(',').map(w => w.trim());
    const correct = words.filter(w => WORD_LIST.includes(w)).length;
    setScore(correct);
    setPhase(phase === 'immediate' ? 'waiting' : 'delayed');
    setUserInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {phase === 'display' && (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Memorize these words</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            {WORD_LIST.map((word, i) => (
              <div key={i} className="bg-indigo-50 p-3 rounded-lg">{word}</div>
            ))}
          </div>
          <p className="text-gray-600">Time remaining: {timeLeft} seconds</p>
        </div>
      )}

      {(phase === 'immediate' || phase === 'delayed') && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter the words you remember (separated by commas):
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-3 border rounded-lg"
              rows={4}
            />
          </div>
          <button type="submit" className="btn-primary">Submit</button>
        </form>
      )}

      {phase === 'waiting' && (
        <div className="text-center">
          <p className="text-gray-600">Please wait for the delayed recall test...</p>
          <p className="text-sm text-gray-500">You'll be prompted again in 15 minutes</p>
        </div>
      )}

      {score > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-800">You remembered {score} words correctly!</p>
        </div>
      )}
    </motion.div>
  );
};