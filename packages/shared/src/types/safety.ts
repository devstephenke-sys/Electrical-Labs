/**
 * Safety system types
 * Lockout/tagout, isolation, verification sequences
 */

export interface SafetyState {
  isolated: boolean;
  lockoutApplied: boolean;
  dangerTagApplied: boolean;
  testerVerified: boolean;
  conductorsTested: boolean;
  testerReverified: boolean;
  currentStep: number;
  stepsCompleted: SafetyStepCompletion[];
  violations: SafetyViolation[];
}

export interface SafetyStepCompletion {
  stepId: string;
  completed: boolean;
  timestamp: Date;
  correct: boolean;
  notes?: string;
}

export interface SafetyViolation {
  stepId: string;
  violationType: 'skipped' | 'incorrect' | 'out_of_order' | 'incomplete';
  description: string;
  severity: 'critical' | 'major' | 'minor';
  timestamp: Date;
}

export interface LockoutDevice {
  id: string;
  type: 'padlock' | 'hasp' | 'multi_lock';
  applied: boolean;
  position: { x: number; y: number };
  userId?: string;
}

export interface DangerTag {
  id: string;
  message: string;
  applied: boolean;
  position: { x: number; y: number };
  userId?: string;
  timestamp?: Date;
}
