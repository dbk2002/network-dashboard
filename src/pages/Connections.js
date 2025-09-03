import React, { useContext, useMemo, useState } from "react";
import { SimulationContext } from "../contexts/SimulationContext";

function formatDuration(s) {
  if (!s) return "0s";
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

export default function Connections() {
  const { devices, disconnectDevice, reconnectDevice } = useContext(SimulationContext);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return devices.filter((d) => {
      if (filter === "Active" && d.status !== "Active") return false;
      if (filter === "Inactive" && d.status !== "Inactive") return false;
      if (filter === "Blocked" && d.status !== "Blocked") return false;
      if (filter === "Disconnected" && d.status !== "Disconnected") return false;
      const term = q.trim().toLowerCase();
      if (!term) return true;
      return (d.ip && d.ip.includes(term)) || (d.name && d.name.toLowerCase().includes(term)) || (d.status && d.status.toLowerCase().includes(term));
    }).slice(0, 100);
  }, [devices, q, filter]);

  return (
    <div className="container">
      <div className="card">
        <div className="space-between">
          <h3 style={{ margin: 0 }}>Connections</h3>
          <div className="row">
            <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Blocked</option>
              <option>Disconnected</option>
            </select>
            <input className="input" placeholder="Search by IP / name / status" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        <div style={{ marginTop: 12, overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>IP Address</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.ip}</td>
                  <td>
                    <span className={`badge ${d.status.toLowerCase()}`}>{d.status}</span>
                  </td>
                  <td>{formatDuration(d.duration)}</td>
                  <td>
                    {d.status !== "Disconnected" ? (
                      <button className="button" onClick={() => disconnectDevice(d.id)}>Disconnect</button>
                    ) : (
                      <button className="button" onClick={() => reconnectDevice(d.id)}>Reconnect</button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="small">No devices</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
