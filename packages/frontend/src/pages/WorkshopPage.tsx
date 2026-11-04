import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCircuitStore } from '../store/circuitStore';
import { useSafetyStore } from '../store/safetyStore';
import WiringCanvas from '../components/WiringCanvas';
import SafetyPanel from '../components/SafetyPanel';
import Multimeter from '../components/Multimeter';
import { oneWayLightingScenario } from '@electrical-lab/scenarios';

export default function WorkshopPage() {
  const navigate = useNavigate();
  const { initializeFromScenario } = useCircuitStore();
  const { resetSafety } = useSafetyStore();

  useEffect(() => {
    initializeFromScenario(oneWayLightingScenario);
    resetSafety();
  }, [initializeFromScenario, resetSafety]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header Bar - Like a real distribution board panel */}
      <div className="bg-slate-950 border-b-4 border-amber-500 px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-500">ELECTRICAL WORKSHOP</h1>
              <p className="text-xs text-slate-400">Phase 1: One-Way Lighting Circuit Installation</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">LIVE SIMULATION</span>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              EXIT
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Component Palette - Distribution Board Style */}
          <div className="col-span-2 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider">Component Palette</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600 hover:border-amber-500 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">SW</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Switch</div>
                    <div className="text-xs text-slate-400">SPST 10A</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600 hover:border-amber-500 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">L</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Lamp</div>
                    <div className="text-xs text-slate-400">60W 230V</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600 hover:border-amber-500 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">R</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Resistor</div>
                    <div className="text-xs text-slate-400">Load 100Ω</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600 hover:border-amber-500 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">B</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Breaker</div>
                    <div className="text-xs text-slate-400">MCB 16A</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wiring Canvas - Main Work Area */}
          <div className="col-span-7 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider">Installation Panel</h2>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-amber-700 rounded-full"></span> Live (L)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-blue-600 rounded-full"></span> Neutral (N)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span> Earth (PE)
                </span>
              </div>
            </div>
            <div className="p-4">
              <WiringCanvas />
            </div>
          </div>

          {/* Right Panel - Professional Instruments */}
          <div className="col-span-3 space-y-4">
            {/* Safety Panel - Critical Section */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border-2 border-red-600 overflow-hidden">
              <div className="bg-red-900/50 px-4 py-3 border-b border-red-600">
                <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/>
                  </svg>
                  Safety Isolation
                </h2>
              </div>
              <div className="p-4">
                <SafetyPanel />
              </div>
            </div>

            {/* Multimeter - Professional Tool */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
                <h2 className="text-sm font-bold text-green-500 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  Multimeter
                </h2>
              </div>
              <div className="p-4">
                <Multimeter />
              </div>
            </div>

            {/* Circuit Status - Technical Info */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
                <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
                  </svg>
                  Circuit Analysis
                </h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Simulation</span>
                  <span className="text-xs font-bold text-green-400">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Components</span>
                  <span className="text-xs font-bold text-white">3 Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Wires</span>
                  <span className="text-xs font-bold text-white">0</span>
                </div>
                <div className="border-t border-slate-700 pt-3 mt-3">
                  <div className="text-xs text-slate-500 mb-2">Supply Parameters</div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Voltage</span>
                    <span className="text-xs font-bold text-amber-400">230V AC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Frequency</span>
                    <span className="text-xs font-bold text-amber-400">50Hz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
