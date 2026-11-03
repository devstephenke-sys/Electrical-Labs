import { useRef, useState } from 'react';
import { useCircuitStore } from '../store/circuitStore';
import { createComponent } from '../utils/componentFactory';
import { Wire, ConductorType } from '@electrical-lab/shared';

export default function WiringCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [wiring, setWiring] = useState<{ fromComponent: string; fromTerminal: string } | null>(null);
  
  const { circuit, addComponent, selectComponent, selectedComponent, startSimulation, isSimulating, addWire } = useCircuitStore();

  const handleAddComponent = (type: string) => {
    const component = createComponent(type, 200, 200);
    addComponent(component);
  };

  const handleMouseDown = (e: React.MouseEvent, componentId: string, terminalId?: string) => {
    if (terminalId) {
      // Start wiring from this terminal
      setWiring({ fromComponent: componentId, fromTerminal: terminalId });
    } else {
      // Drag component
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
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;

      useCircuitStore.getState().updateComponent(dragging, { position: { x, y } });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (wiring) {
      // Check if we released on a terminal
      const svg = svgRef.current;
      if (!svg) {
        setWiring(null);
        return;
      }

      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find terminal under cursor
      for (const component of circuit.components) {
        for (const terminal of component.terminals) {
          const termX = component.position.x + (terminal.position.x - component.position.x);
          const termY = component.position.y + (terminal.position.y - component.position.y);
          const dist = Math.sqrt((x - termX) ** 2 + (y - termY) ** 2);
          
          if (dist < 10 && component.id !== wiring.fromComponent) {
            // Create wire
            const wire: Wire = {
              id: `wire_${Date.now()}`,
              fromComponentId: wiring.fromComponent,
              fromTerminalId: wiring.fromTerminal,
              toComponentId: component.id,
              toTerminalId: terminal.id,
              type: 'live' as ConductorType,
              color: '#9ca3af',
            };
            addWire(wire);
            break;
          }
        }
      }
    }
    
    setDragging(null);
    setWiring(null);
  };

  const handleSimulate = () => {
    startSimulation();
  };

  const handleReset = () => {
    useCircuitStore.getState().resetCircuit();
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
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e, component.id, terminal.id);
                }}
                style={{ cursor: 'crosshair' }}
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

        {/* Active wire being drawn */}
        {wiring && isSimulating === false && (
          <line
            x1={circuit.components.find((c) => c.id === wiring.fromComponent)?.position.x || 0}
            y1={circuit.components.find((c) => c.id === wiring.fromComponent)?.position.y || 0}
            x2={0}
            y2={0}
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="5,5"
            style={{ pointerEvents: 'none' }}
          />
        )}
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
          onClick={handleReset}
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

      {/* Wiring hint */}
      {wiring && (
        <div className="absolute bottom-20 left-4 bg-blue-600 p-2 rounded text-sm">
          Click on a terminal to complete the wire
        </div>
      )}
    </div>
  );
}
