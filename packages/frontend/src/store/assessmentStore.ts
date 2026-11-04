import { create } from 'zustand';
import { AssessmentResult } from '@electrical-lab/shared';

interface AssessmentStore {
  assessmentResult: AssessmentResult | null;
  
  // Actions
  runAssessment: () => void;
  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  assessmentResult: null,

  runAssessment: () => {
    // Basic assessment logic for Phase 1
    // In a full implementation, this would check:
    // - Wiring accuracy
    // - Safety compliance
    // - Instrument usage
    // - Functional verification
    
    const result: AssessmentResult = {
      scenarioId: 'one-way-lighting-001',
      attemptId: `attempt_${Date.now()}`,
      timestamp: new Date(),
      duration: 0,
      overallScore: 75, // Placeholder score
      passed: true,
      criteriaResults: [
        {
          criterionId: 'c1',
          category: 'safety',
          passed: true,
          score: 25,
          details: 'Safety sequence completed',
          nonCompensatory: true,
        },
        {
          criterionId: 'c2',
          category: 'wiring',
          passed: true,
          score: 35,
          details: 'Wiring complete',
          nonCompensatory: false,
        },
        {
          criterionId: 'c3',
          category: 'testing',
          passed: true,
          score: 15,
          details: 'Instrument used correctly',
          nonCompensatory: false,
        },
      ],
      safetyScore: 25,
      accuracyScore: 35,
      efficiencyScore: 15,
      violations: [],
      feedback: [
        'Good completion of safety sequence',
        'Consider verifying all connections with multimeter',
      ],
      reflection: [],
    };

    set({ assessmentResult: result });
  },

  resetAssessment: () => set({ assessmentResult: null }),
}));
