"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import { useSession } from "next-auth/react";
import Image from "next/image";
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import Date from "@/utils/date";

const Account = () => {
  const session = useSession();
  useEffect(() => {
    
  }, [session]);

  const changeAvatar = () => {
    console.log("change avatar");
    var input = document.createElement('input');
    document.body.appendChild(input); //required for iphone
    input.addEventListener('change', updateValue); //required for iphone
    input.type = 'file';
    input.id ="input"
    input.click();
    document.body.removeChild(input) 
  }

  const updateValue = async(e) => {

    var image = e.target.files[0];
 
    const body = new FormData();
    body.append("file", image);
    body.append("user", JSON.stringify(session.data.user));
      
    const response = await fetch("/api/user", {
      method: "PUT",
      body
    })
    // mutate();
    
  }

  return (
    <div className={styles.accountFullpage}>
      <div className={styles.accountInfo}>
      <div className={styles.imageIconContainer}>
        <Image
          src={session.data.user.avatar}
          alt="profile"
          width="100"
          height="100"
          className={styles.avatar}
        />
        <div className={styles.changeImageIcon} onClick={changeAvatar} >
          <CameraAltRoundedIcon />
        </div>
        
      </div>
        <p>{session.data.user.name}</p>
        <p>{session.data.user.email}</p>
        <Date dateString={session.data.user.createdAt} />
        <Date dateString={session.data.user.updatedAt} />
      </div>
    </div>
  );
};

export default Account;
