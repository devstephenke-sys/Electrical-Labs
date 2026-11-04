import { useState } from 'react';
import { useCircuitStore } from '../store/circuitStore';

type MeasurementMode = 'voltage_ac' | 'voltage_dc' | 'continuity' | 'resistance';

const MODE_CONFIG = {
  voltage_ac: { label: 'V~', unit: 'V AC', color: 'blue' },
  voltage_dc: { label: 'V=', unit: 'V DC', color: 'blue' },
  continuity: { label: 'Ω', unit: 'Ω', color: 'green' },
  resistance: { label: 'Ω', unit: 'Ω', color: 'green' },
};

export default function Multimeter() {
  const [mode, setMode] = useState<MeasurementMode>('voltage_ac');
  const [reading, setReading] = useState<number | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const { selectedComponent, simulationResults } = useCircuitStore();

  const handleMeasure = () => {
    setIsMeasuring(true);
    
    setTimeout(() => {
      if (!selectedComponent || !simulationResults) {
        setReading(null);
        setIsMeasuring(false);
        return;
      }

      const voltage = selectedComponent.state.voltage;
      const current = selectedComponent.state.current;
      const resistance = selectedComponent.parameters.resistance || 0;

      switch (mode) {
        case 'voltage_ac':
          setReading(voltage);
          break;
        case 'voltage_dc':
          setReading(voltage);
          break;
        case 'continuity':
          setReading(current > 0.001 ? 0 : Infinity);
          break;
        case 'resistance':
          setReading(resistance);
          break;
      }
      setIsMeasuring(false);
    }, 500);
  };

  const getDisplayValue = () => {
    if (reading === null) return 'OL';
    if (reading === Infinity) return 'OL';
    if (mode === 'continuity' && reading === 0) return '0.00';
    return reading.toFixed(2);
  };

  const config = MODE_CONFIG[mode];

  return (
    <div className="space-y-3">
      {/* Professional display */}
      <div className="bg-slate-900 rounded-lg p-4 border-2 border-slate-700 relative overflow-hidden">
        {/* Display segments effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent pointer-events-none" />
        
        <div className="relative">
          {/* Mode indicator */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider">AUTO RANGE</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              isMeasuring ? 'bg-green-900/50 text-green-400 animate-pulse' : 'bg-slate-700 text-slate-400'
            }`}>
              {isMeasuring ? 'MEASURING' : 'READY'}
            </span>
          </div>
          
          {/* Main display */}
          <div className="flex items-baseline justify-center">
            <div className="text-4xl font-mono font-bold text-green-400 tracking-wider">
              {getDisplayValue()}
            </div>
            <div className="ml-2 text-lg text-slate-400">{config.unit}</div>
          </div>
          
          {/* Secondary info */}
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>REL</span>
            <span>MAX</span>
            <span>MIN</span>
          </div>
        </div>
      </div>

      {/* Mode selector dial */}
      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode('voltage_ac')}
            className={`p-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'voltage_ac' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            V~ AC
          </button>
          <button
            onClick={() => setMode('voltage_dc')}
            className={`p-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'voltage_dc' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            V= DC
          </button>
          <button
            onClick={() => setMode('continuity')}
            className={`p-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'continuity' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Ω Cont
          </button>
          <button
            onClick={() => setMode('resistance')}
            className={`p-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'resistance' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Ω Res
          </button>
        </div>
      </div>

      {/* Measure button */}
      <button
        onClick={handleMeasure}
        disabled={isMeasuring}
        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-4 py-3 rounded-lg text-sm font-bold transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        {isMeasuring ? 'Measuring...' : 'HOLD TO MEASURE'}
      </button>

      {/* Component info */}
      {selectedComponent && (
        <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Selected Component</div>
          <div className="text-sm font-semibold text-white">{selectedComponent.name}</div>
          <div className="text-xs text-slate-400">{selectedComponent.type}</div>
        </div>
      )}
    </div>
  );
}
