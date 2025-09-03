import React, { useContext, useState } from "react";
import { FirewallContext } from "../contexts/FirewallContext";

export default function Firewall() {
  const { rules, addRule, toggleRule, removeRule } = useContext(FirewallContext);
  const [target, setTarget] = useState("");
  const [note, setNote] = useState("");
  const [action, setAction] = useState("Deny");

  function onAdd() {
    if (!target.trim()) return alert("Enter an IP or target");
    addRule(target.trim(), action, note.trim());
    setTarget("");
    setNote("");
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Firewall Rules</h3>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input className="input" placeholder="IP or target (e.g. 192.168.1.10)" value={target} onChange={(e) => setTarget(e.target.value)} />
          <select className="input" value={action} onChange={(e) => setAction(e.target.value)}>
            <option>Allow</option>
            <option>Deny</option>
          </select>
          <button className="button" onClick={onAdd}>Add</button>
        </div>
        <div style={{ marginTop: 10 }}>
          <input className="input" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <div style={{ marginTop: 16 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Target</th>
                <th>Action</th>
                <th>Note</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r) => (
                <tr key={r.id}>
                  <td>{r.target}</td>
                  <td><strong>{r.action}</strong></td>
                  <td>{r.note}</td>
                  <td>
                    <button className="button" onClick={() => toggleRule(r.id)}>{r.action === "Allow" ? "Set Deny" : "Set Allow"}</button>
                    <button style={{ marginLeft: 8 }} className="button" onClick={() => removeRule(r.id)}>Remove</button>
                  </td>
                </tr>
              ))}
              {rules.length === 0 && <tr><td colSpan={4} className="small">No rules defined</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
