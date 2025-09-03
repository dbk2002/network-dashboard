import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { SimulationContext } from "../contexts/SimulationContext";

export default function Settings() {
  const { dark, setDark } = useContext(ThemeContext);
  const { isSimulating, startSimulation, stopSimulation } = useContext(SimulationContext);

  return (
    <div className="container">
      <div className="card">
        <h3>Settings</h3>

        <div style={{ marginTop: 12 }}>
          <label className="row">
            <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} /> &nbsp; Enable Dark Mode
          </label>
          <div className="small" style={{ marginTop: 6 }}>Theme persists across sessions.</div>
        </div>

        <div style={{ marginTop: 18 }}>
          <h4 style={{ marginBottom: 8 }}>Traffic Simulation</h4>
          <div className="row">
            <button className="button" onClick={isSimulating ? stopSimulation : startSimulation}>
              {isSimulating ? "Stop Simulation" : "Start Simulation"}
            </button>
            <div className="small" style={{ marginLeft: 12 }}>
              {isSimulating ? "Simulation is running" : "Simulation stopped"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
