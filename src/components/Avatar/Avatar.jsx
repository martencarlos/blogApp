"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "./avatar.module.css";

import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";

import { signOut, useSession } from "next-auth/react";
import { ThemeContext } from "../../context/ThemeContext";
import { mutate } from "swr";
import Image from "next/image";

const Avatar = () => {
  const session = useSession();
  const { mode } = useContext(ThemeContext);

  //close hamburguer menu if clicked outside the menu
  useEffect(() => {
    const website = document.getElementById("website");
    website.addEventListener("click", closeProfileMenu);

    return () => {
      website.removeEventListener("click", closeProfileMenu);
    };
  }, []);

  function closeProfileMenu(e) {
    const profileMenu = document.getElementById("profileMenu");
    const avatar = document.getElementById("avatar");

    if (
      (e.target.id !== "profileMenu" &&
        e.target.id !== "avatar" &&
        profileMenu.style.display === "block") ||
      e.target.tagName === "A"
    ) {
      var elms = document.querySelectorAll("[id='profileMenu']");
      setTimeout(() => {
        for (var i = 0; i < elms.length; i++) {
          // if(elms[i].style.display === "block") {

          elms[i].style.display = "none";
          // }
        }
      }, 100);
    }
  }

  // Dark mode profileMenu
  useEffect(() => {
    const profileMenu = document.getElementById("profileMenu");

    if (navMenu && mode === "dark") {
      profileMenu.classList.add(styles.profileMenuDark);
    } else if (navMenu && mode === "light") {
      profileMenu.classList.remove(styles.profileMenuDark);
    }
  }, [mode]);

  function showProfileMenu() {
    // const profileMenuStyle = window.getComputedStyle(document.getElementById("profileMenu"))
    var elms = document.querySelectorAll("[id='profileMenu']");

    for (var i = 0; i < elms.length; i++) {
      if (elms[i].style.display === "none" || elms[i].style.display === "") {
        elms[i].style.display = "block";
      } else {
        elms[i].style.display = "none";
      }
    }
  }

  return (
    <div id="avatarContainer" className={styles.avatarContainer}>
      
        {session.data && (
          <Image
            alt="profile"
            src={session.data.user.avatar}
            width={30}
            height={30}
            id="avatar"
            onClick={showProfileMenu}
            className={styles.avatar}
          />
        )}
        
      {session.status === "authenticated" ? (
        <div id="profileMenu" className={styles.profileMenu}>
          <p>{session.data.user.name}</p>
          <div className={styles.iconButton}>
            <ManageAccountsRoundedIcon className={styles.icon} />
            <Link href={"/dashboard/account"}>Profile</Link>
          </div>
          <div className={styles.iconButton}>
            <LogoutRoundedIcon className={styles.icon} />
            <button onClick={signOut}>Sign out</button>
          </div>
        </div>
      ) : (
        <div id="profileMenu" className={styles.profileMenu}>
          <p>Unknown user</p>
          <div className={styles.iconButton}>
            <LoginRoundedIcon className={styles.icon} />
            <Link href={"/login"}>Sign in</Link>
          </div>
          <div className={styles.iconButton}>
            <PersonAddAlt1RoundedIcon className={styles.icon} />
            <Link href={"/register"}>Register</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
