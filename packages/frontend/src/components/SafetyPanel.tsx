import { useSafetyStore } from '../store/safetyStore';

export default function SafetyPanel() {
  const { safetyState, applyLockout, applyDangerTag, removeLockout, removeDangerTag, completeStep, resetSafety } = useSafetyStore();

  const safetySteps = [
    { id: 's1', description: 'Identify circuit', order: 1 },
    { id: 's2', description: 'Isolate supply', order: 2 },
    { id: 's3', description: 'Apply lockout', order: 3 },
    { id: 's4', description: 'Apply danger tag', order: 4 },
    { id: 's5', description: 'Verify tester', order: 5 },
    { id: 's6', description: 'Test conductors', order: 6 },
    { id: 's7', description: 'Re-verify tester', order: 7 },
  ];

  const handleApplyLockout = () => {
    applyLockout({
      id: 'lockout_1',
      type: 'padlock',
      applied: false,
      position: { x: 0, y: 0 },
    });
    completeStep('s3', true);
  };

  const handleApplyDangerTag = () => {
    applyDangerTag({
      id: 'tag_1',
      message: 'DO NOT OPERATE',
      applied: false,
      position: { x: 0, y: 0 },
    });
    completeStep('s4', true);
  };

  const isStepComplete = (stepId: string) => {
    return safetyState.stepsCompleted.some((s) => s.stepId === stepId);
  };

  const isStepCurrent = (order: number) => {
    return safetyState.currentStep === order;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Safety Sequence</h2>
      
      <div className="space-y-2">
        {safetySteps.map((step) => (
          <div
            key={step.id}
            className={`p-3 rounded ${
              isStepComplete(step.id)
                ? 'bg-green-900 border-green-700'
                : isStepCurrent(step.order)
                ? 'bg-blue-900 border-blue-700 border-2'
                : 'bg-gray-700 border-gray-600'
            } border`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {step.order}. {step.description}
              </span>
              {isStepComplete(step.id) && (
                <span className="text-green-400">✓</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Controls */}
      <div className="mt-4 space-y-2">
        {!safetyState.lockoutApplied && (
          <button
            onClick={handleApplyLockout}
            className="w-full bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm"
          >
            Apply Lockout
          </button>
        )}
        
        {safetyState.lockoutApplied && !safetyState.dangerTagApplied && (
          <button
            onClick={handleApplyDangerTag}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
          >
            Apply Danger Tag
          </button>
        )}

        {safetyState.dangerTagApplied && (
          <div className="flex gap-2">
            <button
              onClick={() => { removeLockout(); removeDangerTag(); }}
              className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm"
            >
              Remove Lockout
            </button>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="mt-4 p-3 bg-gray-700 rounded">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={safetyState.isolated ? 'text-green-400' : 'text-yellow-400'}>
              {safetyState.isolated ? 'Isolated' : 'Not Isolated'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Violations:</span>
            <span className={safetyState.violations.length > 0 ? 'text-red-400' : 'text-green-400'}>
              {safetyState.violations.length}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={resetSafety}
        className="mt-4 w-full bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm"
      >
        Reset Safety
      </button>
    </div>
  );
}
