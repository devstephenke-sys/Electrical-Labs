/**
 * Assessment engine types
 * Evaluation, scoring, feedback
 */

export interface AssessmentResult {
  scenarioId: string;
  attemptId: string;
  userId?: string;
  timestamp: Date;
  duration: number;               // seconds
  overallScore: number;          // 0-100
  passed: boolean;
  criteriaResults: CriterionResult[];
  safetyScore: number;
  accuracyScore: number;
  efficiencyScore: number;
  violations: AssessmentViolation[];
  feedback: string[];
  reflection: ReflectionResponse[];
}

export interface CriterionResult {
  criterionId: string;
  category: string;
  passed: boolean;
  score: number;
  details: string;
  nonCompensatory: boolean;
}

export interface AssessmentViolation {
  type: 'safety' | 'wiring' | 'procedure';
  severity: 'critical' | 'major' | 'minor';
  description: string;
  timestamp: Date;
  step?: number;
}

export interface ReflectionResponse {
  question: string;
  answer: string;
}

export interface CompetencyLevel {
  level: 'novice' | 'apprentice' | 'technician' | 'expert';
  scenariosCompleted: number;
  averageScore: number;
  safetyCompliance: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedAt: Date;
}
