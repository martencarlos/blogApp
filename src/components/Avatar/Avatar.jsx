"use client"

import React, { useContext } from "react";
import Link from 'next/link'
import styles from "./avatar.module.css";

import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

import { signOut, useSession } from 'next-auth/react';
import { mutate } from "swr";

const DarkModeToggle = () => {
  
  const session = useSession()

  function showProfileMenu() {
    const profileMenuStyle = window.getComputedStyle(document.getElementById("profileMenu"))

    if(profileMenuStyle.getPropertyValue("display") === "none") {
      document.getElementById("profileMenu").style.display = "block"
    } else {
      document.getElementById("profileMenu").style.display = "none"
    }
  
  }

  return (
    <div onClick={showProfileMenu} className={styles.avatar}>
        {session.status === "authenticated" ?
          <div id='profileMenu' className={styles.profileMenu}>
            <p>{session.data.user.name}</p>
            <div className={styles.iconButton}>
              <ManageAccountsRoundedIcon className={styles.icon}/>
              <Link href={"/"}>Profile</Link>
            </div>
            <div className={styles.iconButton}>
              <LogoutRoundedIcon className={styles.icon}/>
              <button onClick={signOut}>Sign out</button>
            </div>
          </div>
          :
          <div id= 'profileMenu' className={styles.profileMenu}>
            <p>Unknown user</p>
            <div className={styles.iconButton}>
              <LoginRoundedIcon className={styles.icon}/>
              <Link href={"/login"}>Sign in</Link>
            </div>
            <div className={styles.iconButton}>
              <PersonAddAlt1RoundedIcon className={styles.icon}/>
              <Link href={"/register"}>Register</Link>
            </div>
            
          </div>
        } 
        </div>
  );
};

export default DarkModeToggle;
