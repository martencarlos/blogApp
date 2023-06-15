"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
    console.log(mode)
    localStorage.setItem("theme", mode==="dark"?"light":"dark");
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
