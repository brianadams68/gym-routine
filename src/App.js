import { useState } from 'react';

function App() {
  const [routine, setRoutine] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoutine = async () => {
    setLoading(true);
    const response = await fetch("/api/generateRoutine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Generate a full body workout routine for a beginner", // Modify this prompt as needed
      }),
    });

    const data = await response.json();
    setRoutine(data.routine);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center mb-4">Gym Routine Generator</h1>
        <button
          onClick={generateRoutine}
          className="w-full bg-blue-500 text-white p-3 rounded-lg"
        >
          {loading ? "Generating..." : "Generate Routine"}
        </button>
        <div className="mt-4">
          {routine && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Your Routine:</h2>
              <pre className="whitespace-pre-wrap">{routine}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

