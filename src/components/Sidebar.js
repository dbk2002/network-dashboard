import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">ND</div>
        <div>
          <div>NetDash</div>
          <div className="small">Mini IT Dashboard</div>
        </div>
      </div>

      <nav className="nav">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="ic">📊</span> Dashboard
        </NavLink>
        <NavLink to="/connections" className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="ic">🔗</span> Connections
        </NavLink>
        <NavLink to="/firewall" className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="ic">🔥</span> Firewall
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="ic">⚙️</span> Settings
        </NavLink>
      </nav>
    </aside>
  );
}
