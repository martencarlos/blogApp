"use client"

import React, { useContext } from "react";
import styles from "./darkModeToggle.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);
  return (
    <div className={styles.toggle} onClick={toggle}>
      {mode === "light" ? <WbSunnyOutlinedIcon className={styles.toggleIcon} /> : <DarkModeOutlinedIcon className={styles.toggleIcon}/>}
    </div>
  );
};

export default DarkModeToggle;
