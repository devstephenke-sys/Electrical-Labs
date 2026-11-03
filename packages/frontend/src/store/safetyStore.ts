import { create } from 'zustand';
import { SafetyState, SafetyStepCompletion, SafetyViolation, LockoutDevice, DangerTag } from '@electrical-lab/shared';

interface SafetyStore {
  safetyState: SafetyState;
  lockoutDevice: LockoutDevice | null;
  dangerTag: DangerTag | null;
  
  // Actions
  completeStep: (stepId: string, correct: boolean, notes?: string) => void;
  applyLockout: (device: LockoutDevice) => void;
  applyDangerTag: (tag: DangerTag) => void;
  removeLockout: () => void;
  removeDangerTag: () => void;
  resetSafety: () => void;
}

const initialSafetyState: SafetyState = {
  isolated: false,
  lockoutApplied: false,
  dangerTagApplied: false,
  testerVerified: false,
  conductorsTested: false,
  testerReverified: false,
  currentStep: 0,
  stepsCompleted: [],
  violations: [],
};

export const useSafetyStore = create<SafetyStore>((set) => ({
  safetyState: initialSafetyState,
  lockoutDevice: null,
  dangerTag: null,

  completeStep: (stepId, correct, notes) =>
    set((state) => {
      const completion: SafetyStepCompletion = {
        stepId,
        completed: true,
        timestamp: new Date(),
        correct,
        notes,
      };

      if (!correct) {
        const violation: SafetyViolation = {
          stepId,
          violationType: 'incorrect',
          description: notes || 'Step completed incorrectly',
          severity: 'major',
          timestamp: new Date(),
        };
        return {
          safetyState: {
            ...state.safetyState,
            stepsCompleted: [...state.safetyState.stepsCompleted, completion],
            violations: [...state.safetyState.violations, violation],
          },
        };
      }

      return {
        safetyState: {
          ...state.safetyState,
          stepsCompleted: [...state.safetyState.stepsCompleted, completion],
          currentStep: state.safetyState.currentStep + 1,
        },
      };
    }),

  applyLockout: (device) =>
    set({
      lockoutDevice: { ...device, applied: true },
      safetyState: {
        ...initialSafetyState,
        isolated: true,
        lockoutApplied: true,
        currentStep: 1,
      },
    }),

  applyDangerTag: (tag) =>
    set({
      dangerTag: { ...tag, applied: true },
      safetyState: {
        ...initialSafetyState,
        isolated: true,
        lockoutApplied: true,
        dangerTagApplied: true,
        currentStep: 2,
      },
    }),

  removeLockout: () =>
    set({
      lockoutDevice: null,
      safetyState: {
        ...initialSafetyState,
        isolated: false,
        lockoutApplied: false,
      },
    }),

  removeDangerTag: () =>
    set({
      dangerTag: null,
      safetyState: {
        ...initialSafetyState,
        isolated: false,
        lockoutApplied: true,
        dangerTagApplied: false,
      },
    }),

  resetSafety: () =>
    set({
      safetyState: initialSafetyState,
      lockoutDevice: null,
      dangerTag: null,
    }),
}));
