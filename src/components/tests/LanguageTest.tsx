import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OBJECTS = [
  { word: 'clock', imageUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&h=300&auto=format&fit=crop' },
  { word: 'book', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&auto=format&fit=crop' },
  { word: 'cup', imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=300&auto=format&fit=crop' },
  { word: 'chair', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&auto=format&fit=crop' },
  { word: 'lamp', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&auto=format&fit=crop' },
];

const SENTENCES = [
  { prompt: 'The sky is ___', answers: ['blue', 'cloudy', 'dark', 'clear'] },
  { prompt: 'A dog likes to ___', answers: ['bark', 'run', 'play', 'eat'] },
  { prompt: 'In winter it gets ___', answers: ['cold', 'snowy', 'freezing', 'chilly'] },
];

interface Props {
  onComplete?: () => void;
}

export const LanguageTest: React.FC<Props> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'naming' | 'completion' | 'fluency'>('naming');
  const [currentItem, setCurrentItem] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState({ naming: 0, completion: 0, fluency: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phase === 'naming') {
      if (userInput.toLowerCase().trim() === OBJECTS[currentItem].word) {
        setScore(prev => ({ ...prev, naming: prev.naming + 1 }));
      }
      
      if (currentItem < OBJECTS.length - 1) {
        setCurrentItem(prev => prev + 1);
        setImageLoaded(false);
        setErrorImage(false);
      } else {
        setPhase('completion');
        setCurrentItem(0);
      }
    } else if (phase === 'completion') {
      if (SENTENCES[currentItem].answers.includes(userInput.toLowerCase().trim())) {
        setScore(prev => ({ ...prev, completion: prev.completion + 1 }));
      }
      
      if (currentItem < SENTENCES.length - 1) {
        setCurrentItem(prev => prev + 1);
      } else {
        setPhase('fluency');
      }
    } else if (phase === 'fluency') {
      const words = userInput.toLowerCase().split(',').map(w => w.trim());
      const validWords = words.filter(w => w.startsWith('s') && w.length > 1);
      setScore(prev => ({ ...prev, fluency: validWords.length }));
      
      // Complete the test
      if (onComplete) {
        onComplete();
      }
    }
    
    setUserInput('');
  };

  const handleImageError = () => {
    setErrorImage(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {phase === 'naming' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Object Naming</h3>
          <p className="text-gray-600 text-center mb-4">Name the object shown in the image:</p>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="relative aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              )}
              {errorImage ? (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Image not available
                </div>
              ) : (
                <img
                  src={OBJECTS[currentItem].imageUrl}
                  alt="Name this object"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                />
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Type your answer"
                autoFocus
              />
              <button type="submit" className="btn-primary w-full">
                Submit
              </button>
            </form>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Object {currentItem + 1} of {OBJECTS.length}
          </p>
        </div>
      )}

      {phase === 'completion' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Sentence Completion</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-lg mb-4 text-center font-medium">
              {SENTENCES[currentItem].prompt}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Complete the sentence"
                autoFocus
              />
              <button type="submit" className="btn-primary w-full">
                Submit
              </button>
            </form>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Sentence {currentItem + 1} of {SENTENCES.length}
          </p>
        </div>
      )}

      {phase === 'fluency' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Verbal Fluency</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">
              List as many words as you can that start with the letter "S"
              (separate words with commas)
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={4}
                placeholder="Enter words separated by commas (e.g., sun, sand, sea)"
                autoFocus
              />
              <button type="submit" className="btn-primary w-full">
                Complete Test
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-indigo-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Current Scores:</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Naming</p>
            <p className="font-medium">{score.naming}/{OBJECTS.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Completion</p>
            <p className="font-medium">{score.completion}/{SENTENCES.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fluency</p>
            <p className="font-medium">{score.fluency} words</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};