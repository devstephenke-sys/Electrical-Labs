import WiringCanvas from '../components/WiringCanvas';
import SafetyPanel from '../components/SafetyPanel';
import Multimeter from '../components/Multimeter';

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center px-4">
        <h1 className="text-xl font-bold">Virtual Workshop</h1>
      </div>
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Component Palette & Safety */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
          <SafetyPanel />
          
          <h2 className="text-lg font-semibold mb-4 mt-6">Components</h2>
          <div className="space-y-2">
            <div className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600">
              <div className="text-sm">Voltage Source</div>
              <div className="text-xs text-gray-400">240V DC</div>
            </div>
            <div className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600">
              <div className="text-sm">Resistor</div>
              <div className="text-xs text-gray-400">100Ω</div>
            </div>
            <div className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600">
              <div className="text-sm">Switch</div>
              <div className="text-xs text-gray-400">SPST</div>
            </div>
            <div className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600">
              <div className="text-sm">Light Bulb</div>
              <div className="text-xs text-gray-400">60W</div>
            </div>
          </div>
        </div>
        
        {/* Center Panel - Wiring Workspace */}
        <div className="flex-1 bg-gray-900 relative">
          <WiringCanvas />
        </div>
        
        {/* Right Panel - Instructions, Info & Tools */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Scenario Info</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-gray-400">Job Brief</h3>
              <p className="text-sm mt-1">One-Way Lighting Installation</p>
              <p className="text-xs text-gray-500 mt-1">Install a single lighting point controlled by a one-way switch</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-400">Instructions</h3>
              <ul className="text-sm mt-1 space-y-1 text-gray-300">
                <li>• Complete safety sequence first</li>
                <li>• Add components using buttons in workspace</li>
                <li>• Drag components to position them</li>
                <li>• Click terminals to wire connections</li>
                <li>• Use multimeter to verify readings</li>
                <li>• Click Simulate to run circuit analysis</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <Multimeter />
          </div>
        </div>
      </div>
    </div>
  );
}
