export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center px-4">
        <h1 className="text-xl font-bold">Virtual Workshop</h1>
      </div>
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Component Palette */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <h2 className="text-lg font-semibold mb-4">Components</h2>
          <div className="space-y-2">
            <div className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600">
              <div className="text-sm">Voltage Source</div>
            </div>
            <div className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600">
              <div className="text-sm">Resistor</div>
            </div>
            <div className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600">
              <div className="text-sm">Switch</div>
            </div>
            <div className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600">
              <div className="text-sm">Light Bulb</div>
            </div>
          </div>
        </div>
        
        {/* Center Panel - Wiring Workspace */}
        <div className="flex-1 bg-gray-900 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-500">
              <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <p>Wiring Workspace</p>
              <p className="text-sm mt-2">Drag components here to begin</p>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Instructions & Info */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
          <h2 className="text-lg font-semibold mb-4">Scenario Info</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-gray-400">Job Brief</h3>
              <p className="text-sm mt-1">Select a scenario to begin</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-400">Schematic</h3>
              <div className="mt-1 bg-gray-700 h-32 rounded flex items-center justify-center">
                <span className="text-gray-500 text-sm">No schematic loaded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Panel - Tools & Status */}
      <div className="h-16 bg-gray-800 border-t border-gray-700 flex items-center px-4">
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
            Simulate
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm">
            Reset
          </button>
        </div>
        <div className="ml-auto text-sm text-gray-400">
          Circuit Status: <span className="text-yellow-400">Not Connected</span>
        </div>
      </div>
    </div>
  );
}
