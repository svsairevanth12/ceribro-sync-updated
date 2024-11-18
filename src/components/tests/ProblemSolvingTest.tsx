import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Circle {
  x: number;
  y: number;
  number: number;
}

const PATTERNS = [
  [1, 3, 5, 7],
  [2, 4, 8, 16],
  [1, 1, 2, 3, 5],
];

const SEQUENCES = [
  { sequence: [2, 4, 6, 8], next: 10 },
  { sequence: [3, 6, 9, 12], next: 15 },
  { sequence: [1, 3, 6, 10], next: 15 },
];

export const ProblemSolvingTest = () => {
  const [phase, setPhase] = useState<'trail' | 'pattern' | 'sequence'>('trail');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ trail: 0, pattern: 0, sequence: 0 });
  const [currentNumber, setCurrentNumber] = useState(1);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [patternIndex, setPatternIndex] = useState(0);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (phase === 'trail' && canvasRef.current) {
      initializeTrailTest();
    }
  }, [phase]);

  const initializeTrailTest = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newCircles = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * (canvas.width - 100) + 50,
      y: Math.random() * (canvas.height - 100) + 50,
      number: i + 1
    }));

    setCircles(newCircles);
    drawCircles(newCircles, null);
  };

  const drawCircles = (circles: Circle[], lastPos: { x: number; y: number } | null) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines
    if (lastPos && currentNumber > 1) {
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      const nextCircle = circles.find(c => c.number === currentNumber);
      if (nextCircle) {
        ctx.lineTo(nextCircle.x, nextCircle.y);
        ctx.strokeStyle = '#4F46E5';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Draw circles
    circles.forEach(({ x, y, number }) => {
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fillStyle = number < currentNumber ? '#C7D2FE' : '#E0E7FF';
      ctx.fill();
      ctx.strokeStyle = '#4F46E5';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#1F2937';
      ctx.font = '16px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(number.toString(), x, y);
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedCircle = circles.find(circle => 
      Math.sqrt(Math.pow(circle.x - x, 2) + Math.pow(circle.y - y, 2)) < 25
    );

    if (clickedCircle?.number === currentNumber) {
      if (lastPosition) {
        drawCircles(circles, lastPosition);
      }
      setLastPosition({ x: clickedCircle.x, y: clickedCircle.y });
      
      if (currentNumber === 12) {
        setScore(prev => ({ ...prev, trail: prev.trail + 1 }));
        setPhase('pattern');
      } else {
        setCurrentNumber(prev => prev + 1);
      }
    }
  };

  const handlePatternSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPattern = PATTERNS[patternIndex];
    const correctAnswer = currentPattern[currentPattern.length - 1];

    if (parseInt(userAnswer) === correctAnswer) {
      setScore(prev => ({ ...prev, pattern: prev.pattern + 1 }));
    }

    if (patternIndex < PATTERNS.length - 1) {
      setPatternIndex(prev => prev + 1);
    } else {
      setPhase('sequence');
    }
    setUserAnswer('');
  };

  const handleSequenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentSequence = SEQUENCES[sequenceIndex];

    if (parseInt(userAnswer) === currentSequence.next) {
      setScore(prev => ({ ...prev, sequence: prev.sequence + 1 }));
    }

    if (sequenceIndex < SEQUENCES.length - 1) {
      setSequenceIndex(prev => prev + 1);
    }
    setUserAnswer('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {phase === 'trail' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Trail Making Test</h3>
          <p className="text-gray-600">Connect the numbers in order from 1 to 12</p>
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onClick={handleCanvasClick}
              className="border border-gray-200 rounded-lg bg-white shadow-sm"
            />
          </div>
          <p className="text-center text-gray-600">Current number: {currentNumber}</p>
        </div>
      )}

      {phase === 'pattern' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Pattern Recognition</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">What number comes next in this pattern?</p>
            <div className="text-2xl font-mono mb-4">
              {PATTERNS[patternIndex].slice(0, -1).join(', ')} , ?
            </div>
            <form onSubmit={handlePatternSubmit} className="space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter your answer"
              />
              <button type="submit" className="btn-primary">Submit</button>
            </form>
          </div>
        </div>
      )}

      {phase === 'sequence' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Number Sequence</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">What number comes next in this sequence?</p>
            <div className="text-2xl font-mono mb-4">
              {SEQUENCES[sequenceIndex].sequence.join(', ')} , ?
            </div>
            <form onSubmit={handleSequenceSubmit} className="space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter your answer"
              />
              <button type="submit" className="btn-primary">Submit</button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-indigo-50 p-4 rounded-lg">
        <p>Trail Making Score: {score.trail}/1</p>
        <p>Pattern Score: {score.pattern}/{PATTERNS.length}</p>
        <p>Sequence Score: {score.sequence}/{SEQUENCES.length}</p>
      </div>
    </motion.div>
  );
};