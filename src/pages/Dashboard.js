import React, { useContext, useMemo } from "react";
import { SimulationContext } from "../contexts/SimulationContext";
import BandwidthChart from "../components/BandwidthChart";

export default function Dashboard() {
  const { bandwidthData } = useContext(SimulationContext);

  // compute last 5 alerts (high usage > 100)
  const alerts = useMemo(() => {
    return bandwidthData
      .filter((p) => p.value > 100)
      .slice(-6)
      .map((p) => `High usage ${p.value} Mbps at ${p.time}`);
  }, [bandwidthData]);

  return (
    <div className="container">
      <div className="grid">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Bandwidth Monitor</h3>
          <BandwidthChart data={bandwidthData} />
          <div style={{ marginTop: 12 }} className="small">Live simulated bandwidth (Mbps)</div>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Alerts</h3>
          <div className="alerts">
            {alerts.length === 0 ? <div className="small">No recent alerts</div> : alerts.map((a, i) => <div key={i} className="item">{a}</div>)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }} className="card">
        <h3 style={{ marginTop: 0 }}>Summary</h3>
        <div className="row" style={{ justifyContent: "space-between", marginTop: 8 }}>
          <div>
            <div className="small">Total monitored devices</div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>{/* we can show via simulation */}</div>
          </div>
          <div>
            <div className="small">Live</div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>Simulated</div>
          </div>
        </div>
      </div>
    </div>
  );
}
