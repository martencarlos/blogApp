"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import Avatar from "../Avatar/Avatar";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";



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

  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Webframe - Blog
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
    </div>
  );
};

export default Navbar;
