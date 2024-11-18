import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete?: () => void;
}

const FORWARD_SEQUENCES = ['5-8-2', '6-9-4', '7-2-8-6', '9-1-4-7-3'];
const BACKWARD_SEQUENCES = ['3-6-9', '4-7-1', '8-5-2-9', '1-5-9-2-6'];

const SYMBOLS = ['⭐', '🔵', '🟦', '🔺'];
const CPT_SEQUENCE_LENGTH = 30;
const CPT_DISPLAY_TIME = 1500; // 1.5 seconds per symbol
const CPT_TARGET_SYMBOL = '⭐';

export const AttentionTest: React.FC<Props> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'forward' | 'backward' | 'cpt' | 'visual'>('forward');
  const [currentSequence, setCurrentSequence] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState({ forward: 0, backward: 0, cpt: 0, visual: 0 });
  const [showSequence, setShowSequence] = useState(true);
  const [cptSymbols, setCptSymbols] = useState<string[]>([]);
  const [currentCptIndex, setCurrentCptIndex] = useState(0);
  const [showCptSymbol, setShowCptSymbol] = useState(false);
  const [cptResponses, setCptResponses] = useState<boolean[]>([]);
  const [visualGrid, setVisualGrid] = useState<string[][]>([]);
  const [visualTarget, setVisualTarget] = useState<number[]>([]);
  const [visualResponse, setVisualResponse] = useState<number[]>([]);
  const [shouldInitCpt, setShouldInitCpt] = useState(false);
  const [shouldInitVisual, setShouldInitVisual] = useState(false);

  // Initialize CPT sequence
  useEffect(() => {
    if (shouldInitCpt) {
      const symbols = Array.from({ length: CPT_SEQUENCE_LENGTH }, () => 
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      );
      setCptSymbols(symbols);
      setShouldInitCpt(false);
    }
  }, [shouldInitCpt]);

  // Initialize Visual Search grid
  useEffect(() => {
    if (shouldInitVisual) {
      const grid = Array.from({ length: 6 }, () =>
        Array.from({ length: 6 }, () => 
          Math.random() > 0.7 ? CPT_TARGET_SYMBOL : '⚪'
        )
      );
      const targets: number[] = [];
      grid.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell === CPT_TARGET_SYMBOL) {
            targets.push(i * 6 + j);
          }
        });
      });
      setVisualGrid(grid);
      setVisualTarget(targets);
      setShouldInitVisual(false);
    }
  }, [shouldInitVisual]);

  // Phase change handler
  useEffect(() => {
    if (phase === 'cpt') {
      setShouldInitCpt(true);
    } else if (phase === 'visual') {
      setShouldInitVisual(true);
    }
  }, [phase]);

  // Handle CPT symbol display
  useEffect(() => {
    if (phase === 'cpt' && currentCptIndex < CPT_SEQUENCE_LENGTH && cptSymbols.length > 0) {
      setShowCptSymbol(true);
      const timer = setTimeout(() => {
        setShowCptSymbol(false);
        setCurrentCptIndex(prev => prev + 1);
      }, CPT_DISPLAY_TIME);
      return () => clearTimeout(timer);
    }
  }, [phase, currentCptIndex, cptSymbols.length]);

  // Handle sequence display timing
  useEffect(() => {
    if (showSequence) {
      const timer = setTimeout(() => setShowSequence(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSequence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sequences = phase === 'forward' ? FORWARD_SEQUENCES : BACKWARD_SEQUENCES;
    
    if (userInput === sequences[currentSequence]) {
      setScore(prev => ({
        ...prev,
        [phase]: prev[phase as keyof typeof prev] + 1
      }));
    }

    if (currentSequence < sequences.length - 1) {
      setCurrentSequence(prev => prev + 1);
      setShowSequence(true);
    } else if (phase === 'forward') {
      setPhase('backward');
      setCurrentSequence(0);
      setShowSequence(true);
    } else if (phase === 'backward') {
      setPhase('cpt');
    }

    setUserInput('');
  };

  const handleCptResponse = useCallback((correct: boolean) => {
    setCptResponses(prev => {
      const newResponses = [...prev, correct];
      if (currentCptIndex === CPT_SEQUENCE_LENGTH - 1) {
        const correctResponses = newResponses.filter(r => r).length;
        setScore(prev => ({
          ...prev,
          cpt: Math.round((correctResponses / CPT_SEQUENCE_LENGTH) * 100)
        }));
        setPhase('visual');
      }
      return newResponses;
    });
  }, [currentCptIndex]);

  const handleVisualClick = (index: number) => {
    setVisualResponse(prev => {
      const newResponse = prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index];
      
      if (newResponse.length === visualTarget.length) {
        const correctCount = newResponse.filter(i => visualTarget.includes(i)).length;
        const accuracy = (correctCount / visualTarget.length) * 100;
        setScore(prev => ({ ...prev, visual: Math.round(accuracy) }));
        if (onComplete) {
          onComplete();
        }
      }
      
      return newResponse;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Rest of the JSX remains the same */}
      {(phase === 'forward' || phase === 'backward') && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">
            {phase === 'forward' ? 'Forward' : 'Backward'} Digit Span
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {showSequence ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Remember this sequence:</p>
                <p className="text-4xl font-mono tracking-wider">
                  {(phase === 'forward' ? FORWARD_SEQUENCES : BACKWARD_SEQUENCES)[currentSequence]}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full p-3 border rounded-lg text-center text-2xl tracking-wider"
                  placeholder={`Enter the sequence ${phase === 'backward' ? 'backwards' : ''}`}
                  autoFocus
                />
                <button type="submit" className="btn-primary w-full">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {phase === 'cpt' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">
            Continuous Performance Test
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-600 mb-4">
              Press the button when you see a {CPT_TARGET_SYMBOL}
            </p>
            <div className="h-32 flex items-center justify-center">
              {showCptSymbol && cptSymbols[currentCptIndex] && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl"
                >
                  {cptSymbols[currentCptIndex]}
                </motion.div>
              )}
            </div>
            <button
              onClick={() => handleCptResponse(cptSymbols[currentCptIndex] === CPT_TARGET_SYMBOL)}
              className="btn-primary mt-4"
              disabled={!showCptSymbol}
            >
              Target Detected
            </button>
          </div>
        </div>
      )}

      {phase === 'visual' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Visual Search</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4 text-center">
              Find all the {CPT_TARGET_SYMBOL} symbols in the grid
            </p>
            <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
              {visualGrid.flat().map((symbol, index) => (
                <button
                  key={index}
                  onClick={() => handleVisualClick(index)}
                  className={`w-12 h-12 flex items-center justify-center text-2xl rounded-lg transition-colors ${
                    visualResponse.includes(index)
                      ? 'bg-indigo-100 border-2 border-indigo-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-indigo-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Current Scores:</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Digit Span (Forward)</p>
            <p className="font-medium">{score.forward}/{FORWARD_SEQUENCES.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Digit Span (Backward)</p>
            <p className="font-medium">{score.backward}/{BACKWARD_SEQUENCES.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">CPT Accuracy</p>
            <p className="font-medium">{score.cpt}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Visual Search</p>
            <p className="font-medium">{score.visual}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};