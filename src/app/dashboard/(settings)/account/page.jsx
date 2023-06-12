"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Date from "@/utils/date";

const Account = () => {
  const session = useSession();
  useEffect(() => {
    console.log(session.data.user);
  }, [session]);

  return (
    <div className={styles.accountFullpage}>
      <div className={styles.accountInfo}>
        <Image
          src={session.data.user.avatar}
          alt="profile"
          width="100"
          height="100"
        />
        <p>{session.data.user.name}</p>
        <p>{session.data.user.email}</p>
        <Date dateString={session.data.user.createdAt} />
        <Date dateString={session.data.user.updatedAt} />
      </div>
    </div>
  );
};

export default Account;
