import { useRef, useState } from 'react';
import { useCircuitStore } from '../store/circuitStore';
import { createComponent } from '../utils/componentFactory';

export default function WiringCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const { circuit, addComponent, selectComponent, selectedComponent, startSimulation, isSimulating } = useCircuitStore();

  const handleAddComponent = (type: string) => {
    const component = createComponent(type, 200, 200);
    addComponent(component);
  };

  const handleMouseDown = (e: React.MouseEvent, componentId: string) => {
    const component = circuit.components.find((c) => c.id === componentId);
    if (!component) return;

    setDragging(componentId);
    selectComponent(component);
    
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - component.position.x,
      y: e.clientY - rect.top - component.position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    useCircuitStore.getState().updateComponent(dragging, { position: { x, y } });
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleSimulate = () => {
    startSimulation();
  };

  return (
    <div className="w-full h-full relative">
      <svg
        ref={svgRef}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Components */}
        {circuit.components.map((component) => (
          <g
            key={component.id}
            transform={`translate(${component.position.x}, ${component.position.y})`}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            style={{ cursor: dragging === component.id ? 'grabbing' : 'grab' }}
          >
            {/* Component body */}
            <rect
              x={-30}
              y={-20}
              width={60}
              height={40}
              fill={selectedComponent?.id === component.id ? '#3b82f6' : '#1f2937'}
              stroke={isSimulating && component.state.power > 0 ? '#22c55e' : '#6b7280'}
              strokeWidth={2}
              rx={4}
            />
            
            {/* Component label */}
            <text
              x={0}
              y={5}
              textAnchor="middle"
              fill="white"
              fontSize={10}
            >
              {component.name}
            </text>

            {/* Terminals */}
            {component.terminals.map((terminal) => (
              <circle
                key={terminal.id}
                cx={terminal.position.x - component.position.x}
                cy={terminal.position.y - component.position.y}
                r={6}
                fill="#fbbf24"
                stroke="#000"
                strokeWidth={1}
              />
            ))}

            {/* State indicator */}
            {isSimulating && component.type === 'light_bulb' && (
              <circle
                cx={0}
                cy={0}
                r={component.state.power > 0 ? 15 : 10}
                fill={component.state.power > 0 ? '#fbbf24' : '#4b5563'}
                opacity={component.state.power > 0 ? 0.8 : 0.3}
              />
            )}
          </g>
        ))}

        {/* Wires */}
        {circuit.wires.map((wire) => {
          const fromComp = circuit.components.find((c) => c.id === wire.fromComponentId);
          const toComp = circuit.components.find((c) => c.id === wire.toComponentId);
          if (!fromComp || !toComp) return null;

          const fromTerm = fromComp.terminals.find((t) => t.id === wire.fromTerminalId);
          const toTerm = toComp.terminals.find((t) => t.id === wire.toTerminalId);
          if (!fromTerm || !toTerm) return null;

          const x1 = fromComp.position.x + (fromTerm.position.x - fromComp.position.x);
          const y1 = fromComp.position.y + (fromTerm.position.y - fromComp.position.y);
          const x2 = toComp.position.x + (toTerm.position.x - toComp.position.x);
          const y2 = toComp.position.y + (toTerm.position.y - toComp.position.y);

          return (
            <line
              key={wire.id}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={wire.color || '#9ca3af'}
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Component palette overlay */}
      <div className="absolute top-4 left-4 flex gap-2">
        <button
          onClick={() => handleAddComponent('voltage_source')}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm"
        >
          + Source
        </button>
        <button
          onClick={() => handleAddComponent('resistor')}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm"
        >
          + Resistor
        </button>
        <button
          onClick={() => handleAddComponent('switch')}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm"
        >
          + Switch
        </button>
        <button
          onClick={() => handleAddComponent('light_bulb')}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm"
        >
          + Lamp
        </button>
      </div>

      {/* Simulation controls */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          onClick={handleSimulate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
        >
          {isSimulating ? 'Simulating...' : 'Simulate'}
        </button>
        <button
          onClick={() => useCircuitStore.getState().resetCircuit()}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm"
        >
          Reset
        </button>
      </div>

      {/* Info panel */}
      {selectedComponent && (
        <div className="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg w-64">
          <h3 className="font-semibold mb-2">{selectedComponent.name}</h3>
          <div className="text-sm space-y-1">
            <div>Type: {selectedComponent.type}</div>
            <div>Voltage: {selectedComponent.state.voltage.toFixed(2)} V</div>
            <div>Current: {selectedComponent.state.current.toFixed(3)} A</div>
            <div>Power: {selectedComponent.state.power.toFixed(2)} W</div>
          </div>
        </div>
      )}
    </div>
  );
}
