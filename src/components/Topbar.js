import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const { user, logout } = useContext(AuthContext);
  const loc = useLocation();

  const titles = {
    "/dashboard": "Dashboard",
    "/connections": "Connections",
    "/firewall": "Firewall",
    "/settings": "Settings",
  };
  const title = titles[loc.pathname] || "NetDash";

  return (
    <div className="topbar">
      <div className="row">
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div className="small" style={{ marginLeft: 12 }}>
          <span>• Simulated</span>
        </div>
      </div>

      <div className="row">
        <div className="small" style={{ marginRight: 12 }}>
          {user?.displayName || user?.username}
        </div>
        <button className="button" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}
