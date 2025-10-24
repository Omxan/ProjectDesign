import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    co2Threshold: 800,
    vocThreshold: 200,
    humidityRange: "40-60",
    tempRange: "22-28"
  });

  const logout = () => {
    setUser(null);
    setSettings({
      co2Threshold: 800,
      vocThreshold: 200,
      humidityRange: "40-60",
      tempRange: "22-28"
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, settings, setSettings, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
