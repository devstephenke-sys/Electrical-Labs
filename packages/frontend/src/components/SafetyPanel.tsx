import { useSafetyStore } from '../store/safetyStore';

export default function SafetyPanel() {
  const { safetyState, applyLockout, applyDangerTag, removeLockout, removeDangerTag, completeStep, resetSafety } = useSafetyStore();

  const safetySteps = [
    { id: 's1', description: 'Identify circuit', order: 1, icon: '🔍' },
    { id: 's2', description: 'Isolate supply', order: 2, icon: '⚡' },
    { id: 's3', description: 'Apply lockout', order: 3, icon: '🔒' },
    { id: 's4', description: 'Apply danger tag', order: 4, icon: '⚠️' },
    { id: 's5', description: 'Verify tester', order: 5, icon: '📋' },
    { id: 's6', description: 'Test conductors', order: 6, icon: '🔬' },
    { id: 's7', description: 'Re-verify tester', order: 7, icon: '✅' },
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

  const isStepEnabled = (order: number) => {
    return order <= safetyState.currentStep || isStepComplete(`s${order}`);
  };

  return (
    <div className="space-y-3">
      {/* Safety sequence steps */}
      <div className="space-y-2">
        {safetySteps.map((step) => (
          <button
            key={step.id}
            onClick={() => isStepEnabled(step.order) && completeStep(step.id, true)}
            disabled={!isStepEnabled(step.order)}
            className={`w-full p-3 rounded-lg border-2 transition-all ${
              isStepComplete(step.id)
                ? 'bg-green-900/30 border-green-600 hover:bg-green-900/50'
                : isStepCurrent(step.order)
                ? 'bg-blue-900/30 border-blue-500 hover:bg-blue-900/50'
                : 'bg-slate-800/50 border-slate-700 cursor-not-allowed opacity-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{step.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-semibold">
                    {step.order}. {step.description}
                  </div>
                </div>
              </div>
              {isStepComplete(step.id) && (
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Critical safety controls */}
      <div className="pt-3 border-t border-red-900/50 space-y-2">
        {!safetyState.lockoutApplied && (
          <button
            onClick={handleApplyLockout}
            className="w-full bg-amber-600 hover:bg-amber-700 px-4 py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            APPLY LOCKOUT
          </button>
        )}
        
        {safetyState.lockoutApplied && !safetyState.dangerTagApplied && (
          <button
            onClick={handleApplyDangerTag}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            APPLY DANGER TAG
          </button>
        )}

        {safetyState.dangerTagApplied && (
          <button
            onClick={() => { removeLockout(); removeDangerTag(); }}
            className="w-full bg-slate-600 hover:bg-slate-700 px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            Remove Safety Devices
          </button>
        )}
      </div>

      {/* Status indicators */}
      <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider">Isolation Status</span>
          <span className={`text-xs font-bold px-2 py-1 rounded ${
            safetyState.isolated 
              ? 'bg-green-900/50 text-green-400 border border-green-700' 
              : 'bg-amber-900/50 text-amber-400 border border-amber-700'
          }`}>
            {safetyState.isolated ? 'ISOLATED' : 'NOT ISOLATED'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider">Violations</span>
          <span className={`text-xs font-bold px-2 py-1 rounded ${
            safetyState.violations.length > 0 
              ? 'bg-red-900/50 text-red-400 border border-red-700' 
              : 'bg-green-900/50 text-green-400 border border-green-700'
          }`}>
            {safetyState.violations.length}
          </span>
        </div>
      </div>

      <button
        onClick={resetSafety}
        className="w-full bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-slate-600"
      >
        Reset Safety Sequence
      </button>
    </div>
  );
}
