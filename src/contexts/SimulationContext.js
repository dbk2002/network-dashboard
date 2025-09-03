import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { FirewallContext } from "./FirewallContext";

export const SimulationContext = createContext();

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function genIp() {
  return `192.168.1.${randomInt(2, 250)}`;
}
function nowLabel() {
  return new Date().toLocaleTimeString();
}

const INITIAL_DEVICES = [
  { id: 1, name: "Laptop-1", ip: "192.168.1.2", status: "Active", duration: 600 },
  { id: 2, name: "Workstation-A", ip: "192.168.1.3", status: "Active", duration: 420 },
  { id: 3, name: "Phone-1", ip: "192.168.1.8", status: "Inactive", duration: 30 },
  { id: 4, name: "Camera-01", ip: "192.168.1.10", status: "Active", duration: 1800 },
];

export function SimulationProvider({ children }) {
  const { rules } = useContext(FirewallContext);
  const [isSimulating, setIsSimulating] = useState(true);
  const [bandwidthData, setBandwidthData] = useState(() => {
    // seed 12 points
    return Array.from({ length: 12 }).map((_, i) => ({ time: nowLabel(), value: randomInt(5, 60) }));
  });
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const intervalRef = useRef(null);

  // helper: check firewall rules to decide if IP is blocked
  function isDenied(ip) {
    if (!rules || rules.length === 0) return false;
    return rules.some((r) => r.action === "Deny" && r.target === ip);
  }

  useEffect(() => {
    // ensure that if a rule denies a device IP, mark it as Blocked
    setDevices((prev) =>
      prev.map((d) => {
        if (isDenied(d.ip)) {
          return { ...d, status: d.status === "Disconnected" ? d.status : "Blocked" };
        } else {
          // if previously blocked but no longer denied, set to Inactive
          if (d.status === "Blocked") return { ...d, status: "Inactive" };
          return d;
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rules]);

  useEffect(() => {
    if (!isSimulating) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // start simulation interval
    intervalRef.current = setInterval(() => {
      // bandwidth
      const newPoint = { time: nowLabel(), value: randomInt(5, 140) };
      setBandwidthData((prev) => {
        const next = [...prev.slice(-29), newPoint];
        return next;
      });

      // devices update: increment durations & random changes
      setDevices((prev) => {
        let next = prev.map((d) => {
          // blocked check
          if (isDenied(d.ip)) return { ...d, status: "Blocked" };

          // disconnected stays disconnected
          if (d.status === "Disconnected") return d;

          // increment duration if active or inactive
          const inc = d.status === "Active" ? 2 : 2;
          return { ...d, duration: (d.duration || 0) + inc };
        });

        // random new device arrival ~ 10% chance
        if (Math.random() < 0.10) {
          const newDev = {
            id: Date.now(),
            name: `Device-${randomInt(100, 999)}`,
            ip: genIp(),
            status: "Active",
            duration: 2,
          };
          // if firewall denies this IP, set blocked
          if (isDenied(newDev.ip)) newDev.status = "Blocked";
          next = [newDev, ...next].slice(0, 40);
        }

        // random status change: some devices go inactive or become active
        next = next.map((d) => {
          if (d.status === "Blocked" || d.status === "Disconnected") return d;
          const r = Math.random();
          if (r < 0.04) return { ...d, status: "Inactive" };
          if (r > 0.96) return { ...d, status: "Active" };
          return d;
        });

        return next;
      });
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSimulating, rules]);

  function startSimulation() {
    setIsSimulating(true);
  }
  function stopSimulation() {
    setIsSimulating(false);
  }

  function disconnectDevice(id) {
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, status: "Disconnected" } : d)));
  }
  function reconnectDevice(id) {
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, status: "Active", duration: 0 } : d)));
  }

  return (
    <SimulationContext.Provider
      value={{
        isSimulating,
        startSimulation,
        stopSimulation,
        bandwidthData,
        devices,
        disconnectDevice,
        reconnectDevice,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}
