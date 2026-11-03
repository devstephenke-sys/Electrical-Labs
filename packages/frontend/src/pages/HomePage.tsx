export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Electrical Lab</h1>
        <p className="text-xl mb-8">Virtual Electrical Workshop Simulation</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Virtual Workshop</h2>
            <p className="mb-4">Practice electrical installation in a safe virtual environment</p>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Enter Workshop
            </button>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Scenarios</h2>
            <p className="mb-4">Complete practical exercises from basic to advanced</p>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
              View Scenarios
            </button>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Progress</h2>
            <p className="mb-4">Track your learning journey and achievements</p>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
              View Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
