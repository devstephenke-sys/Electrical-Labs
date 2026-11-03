import { useState } from 'react';
import { useCircuitStore } from '../store/circuitStore';

type MeasurementMode = 'voltage' | 'continuity' | 'resistance';

export default function Multimeter() {
  const [mode, setMode] = useState<MeasurementMode>('voltage');
  const [reading, setReading] = useState<number | null>(null);
  const { selectedComponent, simulationResults } = useCircuitStore();

  const handleMeasure = () => {
    if (!selectedComponent || !simulationResults) {
      setReading(null);
      return;
    }

    const voltage = selectedComponent.state.voltage;
    const current = selectedComponent.state.current;
    const resistance = selectedComponent.parameters.resistance || 0;

    switch (mode) {
      case 'voltage':
        setReading(voltage);
        break;
      case 'continuity':
        setReading(current > 0.001 ? 0 : Infinity);
        break;
      case 'resistance':
        setReading(resistance);
        break;
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Multimeter</h3>
      
      {/* Mode Selection */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('voltage')}
          className={`px-3 py-2 rounded text-sm ${
            mode === 'voltage' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          V
        </button>
        <button
          onClick={() => setMode('continuity')}
          className={`px-3 py-2 rounded text-sm ${
            mode === 'continuity' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Ω
        </button>
        <button
          onClick={() => setMode('resistance')}
          className={`px-3 py-2 rounded text-sm ${
            mode === 'resistance' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Ω
        </button>
      </div>

      {/* Display */}
      <div className="bg-gray-900 p-4 rounded mb-4">
        <div className="text-3xl font-mono text-green-400">
          {reading !== null ? `${reading.toFixed(2)}` : '--.--'}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {mode === 'voltage' ? 'Volts' : mode === 'continuity' ? 'Ω' : 'Ohms'}
        </div>
      </div>

      {/* Measure Button */}
      <button
        onClick={handleMeasure}
        className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
      >
        Measure
      </button>

      {/* Component Info */}
      {selectedComponent && (
        <div className="mt-4 p-3 bg-gray-700 rounded text-sm">
          <div>Component: {selectedComponent.name}</div>
          <div>Type: {selectedComponent.type}</div>
        </div>
      )}
    </div>
  );
}
