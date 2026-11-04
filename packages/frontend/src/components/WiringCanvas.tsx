import { useRef, useState } from 'react';
import { useCircuitStore } from '../store/circuitStore';
import { createComponent } from '../utils/componentFactory';
import { Wire, ConductorType, TerminalRole } from '@electrical-lab/shared';

const CONDUCTOR_COLORS = {
  live: '#b45309',      // Brown/amber for live
  neutral: '#2563eb',   // Blue for neutral
  protective_earth: '#16a34a', // Green/yellow for earth
  control: '#7c3aed',   // Purple for control
  return: '#dc2626',    // Red for return
};

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
            // Create wire with appropriate color based on terminal role
            const fromComp = circuit.components.find(c => c.id === wiring.fromComponent);
            const fromTerm = fromComp?.terminals.find(t => t.id === wiring.fromTerminal);
            const toTerm = terminal;
            
            let conductorType: ConductorType = ConductorType.LIVE;
            let wireColor = CONDUCTOR_COLORS.live;
            
            // Determine conductor type based on terminal roles
            if (fromTerm?.role === TerminalRole.NEUTRAL || toTerm.role === TerminalRole.NEUTRAL) {
              conductorType = ConductorType.NEUTRAL;
              wireColor = CONDUCTOR_COLORS.neutral;
            } else if (fromTerm?.role === TerminalRole.PROTECTIVE_EARTH || toTerm.role === TerminalRole.PROTECTIVE_EARTH) {
              conductorType = ConductorType.PROTECTIVE_EARTH;
              wireColor = CONDUCTOR_COLORS.protective_earth;
            } else if (fromTerm?.role === TerminalRole.COMMON || toTerm.role === TerminalRole.COMMON) {
              conductorType = ConductorType.CONTROL;
              wireColor = CONDUCTOR_COLORS.control;
            }
            
            const wire: Wire = {
              id: `wire_${Date.now()}`,
              fromComponentId: wiring.fromComponent,
              fromTerminalId: wiring.fromTerminal,
              toComponentId: component.id,
              toTerminalId: terminal.id,
              type: conductorType,
              color: wireColor,
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

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'voltage_source':
        return (
          <g>
            <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M -8 0 L 8 0" stroke="currentColor" strokeWidth="2" />
            <path d="M -4 -6 L -4 6" stroke="currentColor" strokeWidth="2" />
            <path d="M 4 -6 L 4 6" stroke="currentColor" strokeWidth="2" />
          </g>
        );
      case 'switch':
        return (
          <g>
            <circle cx="-20" cy="0" r="4" fill="currentColor" />
            <circle cx="20" cy="0" r="4" fill="currentColor" />
            <path d="M -20 0 L 15 -12" stroke="currentColor" strokeWidth="2" />
          </g>
        );
      case 'light_bulb':
        return (
          <g>
            <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M -5 10 L 5 10 L 3 15 L -3 15 Z" fill="currentColor" />
            <path d="M -8 -5 L 8 -5" stroke="currentColor" strokeWidth="1" />
            <path d="M -8 0 L 8 0" stroke="currentColor" strokeWidth="1" />
            <path d="M -8 5 L 8 5" stroke="currentColor" strokeWidth="1" />
          </g>
        );
      case 'resistor':
        return (
          <g>
            <path d="M -25 0 L -20 0 L -15 -8 L -5 8 L 5 -8 L 15 8 L 20 0 L 25 0" 
                  stroke="currentColor" strokeWidth="2" fill="none" />
          </g>
        );
      default:
        return <rect x="-20" y="-15" width="40" height="30" fill="currentColor" />;
    }
  };

  return (
    <div className="w-full h-full relative bg-slate-900">
      <svg
        ref={svgRef}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Professional grid - like schematic paper */}
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="url(#smallGrid)" />
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" strokeWidth="1" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Components with professional rendering */}
        {circuit.components.map((component) => (
          <g
            key={component.id}
            transform={`translate(${component.position.x}, ${component.position.y})`}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            style={{ cursor: dragging === component.id ? 'grabbing' : 'grab' }}
          >
            {/* Component shadow for depth */}
            <rect
              x={-32}
              y={-22}
              width={64}
              height={44}
              fill="rgba(0,0,0,0.3)"
              rx={4}
              transform="translate(2, 2)"
            />
            
            {/* Component body */}
            <rect
              x={-30}
              y={-20}
              width={60}
              height={40}
              fill={selectedComponent?.id === component.id ? '#1e40af' : '#0f172a'}
              stroke={isSimulating && component.state.power > 0 ? '#22c55e' : '#475569'}
              strokeWidth={2}
              rx={4}
            />
            
            {/* Component icon */}
            <g transform="translate(0, 0)" color="#94a3b8">
              {getComponentIcon(component.type)}
            </g>

            {/* Terminals with proper labeling */}
            {component.terminals.map((terminal) => {
              const termX = terminal.position.x - component.position.x;
              const termY = terminal.position.y - component.position.y;
              const terminalColor = terminal.role === TerminalRole.LIVE ? '#b45309' :
                                   terminal.role === TerminalRole.NEUTRAL ? '#2563eb' :
                                   terminal.role === TerminalRole.PROTECTIVE_EARTH ? '#16a34a' : '#64748b';
              
              return (
                <g key={terminal.id}>
                  <circle
                    cx={termX}
                    cy={termY}
                    r={8}
                    fill={terminalColor}
                    stroke="#0f172a"
                    strokeWidth={2}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, component.id, terminal.id);
                    }}
                    style={{ cursor: 'crosshair' }}
                  />
                  <text
                    x={termX}
                    y={termY + 20}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize={8}
                  >
                    {terminal.role.toUpperCase().slice(0, 2)}
                  </text>
                </g>
              );
            })}

            {/* Power indicator glow */}
            {isSimulating && component.state.power > 0 && (
              <circle
                cx={0}
                cy={0}
                r={35}
                fill="none"
                stroke="#22c55e"
                strokeWidth={2}
                opacity={0.5}
                filter="url(#glow)"
              />
            )}
          </g>
        ))}

        {/* Wires with conductor color coding */}
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

          // Create wire path with slight curve for realism
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const curve = 10;
          const pathD = `M ${x1} ${y1} Q ${midX} ${midY + curve} ${x2} ${y2}`;

          return (
            <g key={wire.id}>
              <path
                d={pathD}
                stroke={wire.color || CONDUCTOR_COLORS.live}
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <path
                d={pathD}
                stroke={wire.color || CONDUCTOR_COLORS.live}
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                opacity={0.6}
              />
            </g>
          );
        })}

        {/* Active wire being drawn */}
        {wiring && (
          <g>
            <line
              x1={circuit.components.find((c) => c.id === wiring.fromComponent)?.position.x || 0}
              y1={circuit.components.find((c) => c.id === wiring.fromComponent)?.position.y || 0}
              x2={0}
              y2={0}
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="8,4"
              style={{ pointerEvents: 'none' }}
            />
          </g>
        )}
      </svg>

      {/* Professional toolbar */}
      <div className="absolute top-4 left-4 flex gap-2">
        <button
          onClick={() => handleAddComponent('voltage_source')}
          className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-sm font-semibold border border-slate-600 transition-colors"
        >
          + Source
        </button>
        <button
          onClick={() => handleAddComponent('resistor')}
          className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-sm font-semibold border border-slate-600 transition-colors"
        >
          + Resistor
        </button>
        <button
          onClick={() => handleAddComponent('switch')}
          className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-sm font-semibold border border-slate-600 transition-colors"
        >
          + Switch
        </button>
        <button
          onClick={() => handleAddComponent('light_bulb')}
          className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-sm font-semibold border border-slate-600 transition-colors"
        >
          + Lamp
        </button>
      </div>

      {/* Simulation controls */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          onClick={handleSimulate}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          {isSimulating ? 'Simulating...' : 'Simulate'}
        </button>
        <button
          onClick={handleReset}
          className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Professional info panel */}
      {selectedComponent && (
        <div className="absolute top-4 right-4 bg-slate-800/95 backdrop-blur-sm p-4 rounded-xl border border-slate-700 w-72 shadow-xl">
          <h3 className="font-bold text-amber-500 mb-3 uppercase tracking-wider text-sm">{selectedComponent.name}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Type:</span>
              <span className="text-white font-medium">{selectedComponent.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Voltage:</span>
              <span className="text-green-400 font-mono">{selectedComponent.state.voltage.toFixed(2)} V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Current:</span>
              <span className="text-blue-400 font-mono">{selectedComponent.state.current.toFixed(3)} A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Power:</span>
              <span className="text-amber-400 font-mono">{selectedComponent.state.power.toFixed(2)} W</span>
            </div>
          </div>
        </div>
      )}

      {/* Wiring hint */}
      {wiring && (
        <div className="absolute bottom-20 left-4 bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
          Click on a terminal to complete the wire
        </div>
      )}
    </div>
  );
}
