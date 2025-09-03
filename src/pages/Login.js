import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    // demo check
    const res = login(username.trim(), password.trim());
    setBusy(false);
    if (res.ok) {
      navigate("/dashboard");
    } else {
      alert(res.message);
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-box card">
        <h2 style={{ marginTop: 0 }}>NetDash Login</h2>
        <p className="small">Use <b>admin</b> / <b>admin</b> to sign in (demo).</p>
        <form className="form" onSubmit={onSubmit}>
          <input className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div style={{ display: "flex", gap: 8 }}>
            <button className="button" type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
