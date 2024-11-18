import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, MessageSquare, Puzzle } from 'lucide-react';
import { MemoryTest } from '../components/tests/MemoryTest';
import { AttentionTest } from '../components/tests/AttentionTest';
import { LanguageTest } from '../components/tests/LanguageTest';
import { ProblemSolvingTest } from '../components/tests/ProblemSolvingTest';
import type { Assessment as AssessmentType } from '../types';

export const Assessment = () => {
  const [activeTest, setActiveTest] = useState<AssessmentType['type'] | null>(null);
  const [assessments, setAssessments] = useState<AssessmentType[]>([
    {
      id: '1',
      type: 'memory',
      title: 'Memory Assessment',
      description: 'Test your short-term and long-term memory capabilities',
      duration: 10,
      completed: false,
    },
    {
      id: '2',
      type: 'attention',
      title: 'Attention Test',
      description: 'Evaluate your focus and concentration levels',
      duration: 15,
      completed: false,
    },
    {
      id: '3',
      type: 'language',
      title: 'Language Skills',
      description: 'Assess your verbal comprehension and expression',
      duration: 12,
      completed: false,
    },
    {
      id: '4',
      type: 'problemSolving',
      title: 'Problem-Solving Tasks',
      description: 'Challenge your cognitive flexibility and reasoning',
      duration: 20,
      completed: false,
    },
  ]);

  const getIcon = (type: AssessmentType['type']) => {
    switch (type) {
      case 'memory':
        return Brain;
      case 'attention':
        return Eye;
      case 'language':
        return MessageSquare;
      case 'problemSolving':
        return Puzzle;
      default:
        return Brain;
    }
  };

  const handleTestCompletion = (type: AssessmentType['type']) => {
    setAssessments(prev => prev.map(assessment => 
      assessment.type === type ? { ...assessment, completed: true } : assessment
    ));
    setActiveTest(null);
  };

  const calculateProgress = () => {
    const completedTests = assessments.filter(a => a.completed).length;
    return (completedTests / assessments.length) * 100;
  };

  const renderTest = () => {
    switch (activeTest) {
      case 'memory':
        return <MemoryTest onComplete={() => handleTestCompletion('memory')} />;
      case 'attention':
        return <AttentionTest onComplete={() => handleTestCompletion('attention')} />;
      case 'language':
        return <LanguageTest onComplete={() => handleTestCompletion('language')} />;
      case 'problemSolving':
        return <ProblemSolvingTest onComplete={() => handleTestCompletion('problemSolving')} />;
      default:
        return null;
    }
  };

  if (activeTest) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setActiveTest(null)}
          className="mb-6 text-indigo-600 hover:text-indigo-800"
        >
          ← Back to Assessments
        </button>
        {renderTest()}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cognitive Assessment</h1>
        <p className="text-xl text-gray-600">
          Complete these assessments to evaluate your cognitive function
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((assessment, index) => {
          const Icon = getIcon(assessment.type);
          return (
            <motion.div
              key={assessment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setActiveTest(assessment.type)}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 rounded-lg p-3">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {assessment.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{assessment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Duration: {assessment.duration} minutes
                    </span>
                    <button className={`btn-${assessment.completed ? 'secondary' : 'primary'}`}>
                      {assessment.completed ? 'Review' : 'Start'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8 mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        <div className="bg-white/20 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span>Overall Completion</span>
            <span>{Math.round(calculateProgress())}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500" 
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};