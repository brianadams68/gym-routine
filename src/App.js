import { useState } from 'react';

function App() {
  const [routine, setRoutine] = useState("");
  const [loading, setLoading] = useState(false);
  const [routineType, setRoutineType] = useState(""); 
  const [time, setTime] = useState("");

  const handleRoutineChange = (event) => {
    setRoutineType(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const generateRoutine = async () => {
    if (!routineType || !time) {
      alert("Please enter both the routine type and time.");
      return;
    }

    setLoading(true);
    const response = await fetch("http://localhost:5001/api/generateRoutine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Generate a ${routineType} workout routine for a beginner that lasts for ${time} minutes`,
      }),
    });

    const data = await response.json();
    setRoutine(data.routine);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center mb-4">EarlyBird Rountines</h1>

        {/* Input for routine type */}
        <div className="mb-4">
          <label htmlFor="routineType" className="block text-lg font-semibold mb-2">Enter the type of routine:</label>
          <input
            id="routineType"
            type="text"
            value={routineType}
            onChange={handleRoutineChange}
            placeholder="e.g., full body, upper body, lower body"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Input for time */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-lg font-semibold mb-2">Enter the duration (in minutes):</label>
          <input
            id="time"
            type="number"
            value={time}
            onChange={handleTimeChange}
            placeholder="e.g., 30"
            className="w-full p-3 border rounded-lg"
          />
        </div>

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


