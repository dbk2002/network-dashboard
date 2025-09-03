import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { FirewallProvider } from "./contexts/FirewallContext";
import { SimulationProvider } from "./contexts/SimulationContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <FirewallProvider>
          <SimulationProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SimulationProvider>
        </FirewallProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
