'use client'
import React, { useState } from "react";
import BatteryChartD3 from "./BatteryChartD3";

export default function BatterySim() {
  const [results, setResults] = useState({ voltage: [], time: [] });
  const [loading, setLoading] = useState(true);

  const [temperature, setTemperature] = useState(298.15);
  const [current, setCurrent] = useState(1);
  const [chargeRate, setChargeRate] = useState(0.5);
  const [dischargeRate, setDischargeRate] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:8000/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature,
          current,
          charge_rate: chargeRate,
          discharge_rate: dischargeRate,
        }),
      });
      const data = await response.json();
      console.log({data})
      setResults(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching simulation data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Battery Simulation</h1>
      
      {/*   Sim Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="temperature">
            Temperature (K)
          </label>
          <input
            type="float"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            min="0"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="current">
            Current (A)
          </label>
          <input
            type="float"
            id="current"
            value={current}
            onChange={(e) => setCurrent(parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            min="0"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="chargeRate">
            Charge Rate (A)
          </label>
          <input
            type="float"
            id="chargeRate"
            value={chargeRate}
            onChange={(e) => setChargeRate(parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            min="0"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="dischargeRate">
            Discharge Rate (A)
          </label>
          <input
            type="float"
            id="dischargeRate"
            value={dischargeRate}
            onChange={(e) => setDischargeRate(parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            min="0"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Run Simulation
        </button>
      </form>

      {/* Show sim results */}
      <div>
        {loading ? (
          <p className="text-center text-gray-500">Loading simulation data...</p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Simulation Results</h2>
            <BatteryChartD3 voltage={results.voltage} time={results.time} />
          </div>
        )}
      </div>
    </div>
  );
}