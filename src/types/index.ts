export interface User {
  id: string;
  name: string;
  age: number;
  gender: string;
  occupation: string;
}

export interface CognitiveScore {
  memory: number;
  attention: number;
  language: number;
  problemSolving: number;
  timestamp: Date;
}

export interface Assessment {
  id: string;
  type: 'memory' | 'attention' | 'language' | 'problemSolving';
  title: string;
  description: string;
  duration: number;
  completed: boolean;
}