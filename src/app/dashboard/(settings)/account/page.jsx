"use client"
import React from "react";
import styles from "./page.module.css";

import Button from "@/components/Button/Button";
// import { useSession } from "next-auth/react";
// import Loading from "@/components/Loading/Loading";
// import { useRouter } from "next/navigation";

const Account = () => {

  // const session = useSession()
  // const router = useRouter();

  // if (session.status === "unauthenticated") {
  //   router.push("/login");
  // }
  // if (session.status === "loading") {
  //   return <Loading/>;
  // }

  return (
    <div className={styles.accountFullpage}>
      Account
    </div>
  );
};

export default Account;
