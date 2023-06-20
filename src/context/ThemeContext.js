"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  mode: "",
  toggle: null,
});

export const ThemeProvider = ({ children }) => {
  // const localStorageTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") : "light"

  const [mode, setMode] = useState();

  useEffect(() => {
      if (typeof window !== 'undefined'){
        if(localStorage.getItem("theme") !== null){
          setMode(localStorage.getItem("theme"))
        }else
          setMode("light")
      }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && mode)
      localStorage.setItem("theme", mode);
  }, [mode]);

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    mode &&<ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
