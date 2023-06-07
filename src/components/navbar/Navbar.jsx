"use client";

import Link from "next/link";
import React, { useEffect,useContext } from "react";
import styles from "./navbar.module.css";
import Avatar from "../Avatar/Avatar";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeContext } from "../../context/ThemeContext";

const links = [
  {
    id: 1,
    title: " My Dashboard",
    url: "/dashboard",
  },
  {
    id: 2,
    title: "Discover",
    url: "/blog",
  },
  {
    id: 3,
    title: "About",
    url: "/about",
  },
  {
    id: 4,
    title: "Contact",
    url: "/contact",
  }
  
];

function toggleMenu() {
  const navMenu = window.getComputedStyle(document.getElementById("navMenu"))
  
  if(navMenu.getPropertyValue("display") === "none") { 
    document.getElementById("navMenu").style.display = "flex"
  } else {
    document.getElementById("navMenu").style.display = "none"
  }
}


const Navbar = () => {
  const session = useSession();

  const { mode } = useContext(ThemeContext);

  // NavMenu click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      const navMenu = document.getElementById("navMenu")
      setTimeout(() => {
        if (typeof event.target.className.includes !== 'undefined' && !event.target.className.includes("avatar") && event.target.tagName !== "path" && event.target.tagName !== "svg") {
        if(navMenu.style.display === "flex") {
          navMenu.style.display = "none"
        }
       
      }
      }, 100);
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dark mode navMenu
  useEffect(() => {
    const navMenu = document.getElementById("navMenu");

    if (navMenu && mode === "dark") {
      navMenu.classList.add(styles.navMenuDark);
    } else if (navMenu){
      navMenu.classList.remove(styles.navMenuDark);
    }

  }, [mode]);

  return (
    <div className={styles.navbar}>
      
      <Link href="/" className={styles.logo}>
        Webframe 
      </Link>

      <div className={styles.links}>
      {links.map((link) => (
        <Link key={link.id} href={link.url} className={styles.link}>
          {link.title}
        </Link>
        ))}
      </div>

      <div className={styles.right}>
          <Avatar/>
          <DarkModeToggle />
      </div>

      {/* Menu button - hidden  */}
      <div className={styles.menuButton} onClick={toggleMenu}>
        <MenuIcon fontSize="large" className={styles.menuIcon}/>
      </div>

      {/* Menu - hidden  */}
      <div className={styles.navMenu} id="navMenu">
        
        <div className={styles.menuLinks}>
          {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        </div>

        <div className={styles.menuRight}>
          <Avatar/>
          <DarkModeToggle />
        </div>

    </div>
  </div>
  );
};

export default Navbar;
