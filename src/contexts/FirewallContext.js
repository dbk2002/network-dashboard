import React, { createContext, useEffect, useState } from "react";

export const FirewallContext = createContext();

const STORAGE_KEY = "nd_firewall_rules";

export function FirewallProvider({ children }) {
  const [rules, setRules] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    // default example rule
    return [{ id: 1, target: "192.168.1.10", action: "Deny", note: "Blocked test IP" }];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
    } catch {}
  }, [rules]);

  function addRule(target, action = "Allow", note = "") {
    setRules((r) => [...r, { id: Date.now(), target, action, note }]);
  }
  function toggleRule(id) {
    setRules((r) => r.map((rule) => (rule.id === id ? { ...rule, action: rule.action === "Allow" ? "Deny" : "Allow" } : rule)));
  }
  function removeRule(id) {
    setRules((r) => r.filter((rule) => rule.id !== id));
  }

  return <FirewallContext.Provider value={{ rules, addRule, toggleRule, removeRule }}>{children}</FirewallContext.Provider>;
}
