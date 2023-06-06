"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import Avatar from "../Avatar/Avatar";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import MenuIcon from '@mui/icons-material/Menu';


const links = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 2,
    title: "Blog",
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

const Navbar = () => {
  const session = useSession();

  function toggleMenu() {
    const links = window.getComputedStyle(document.getElementById("links"))
    // const right = window.getComputedStyle(document.getElementById("right"))
    console.log(links.getPropertyValue("display"))
    if(links.getPropertyValue("display") === "none") {
      console.log("changing to flex")
      document.getElementById("links").style.display = "flex"
      document.getElementById("right").style.display = "flex"
    } else {
      document.getElementById("links").style.display = "none"
      document.getElementById("right").style.display = "none"
    }
  }

  return (
    <div className={styles.navbar}>
      
      <Link href="/" className={styles.logo}>
        Webframe 
      </Link>

      <div className={styles.links} id="links">
      {links.map((link) => (
        <Link key={link.id} href={link.url} className={styles.link}>
          {link.title}
        </Link>
        ))}
      </div>

      <div id="right" className={styles.right}>
          <Avatar/>
          <DarkModeToggle />
      </div>

      <div className={styles.menuButton} onClick={toggleMenu}>
        <MenuIcon className={styles.menuIcon}/>
      </div>
    </div>
  );
};

export default Navbar;
