"use client"
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import Button from "@/components/Button/Button";
// import { useSession } from "next-auth/react";
// import Loading from "@/components/Loading/Loading";
// import { useRouter } from "next/navigation";

const AppSettings = () => {

  // const session = useSession()
  // const router = useRouter();

  // if (session.status === "unauthenticated") {
  //   router.push("/login");
  // }
  // if (session.status === "loading") {
  //   return <Loading/>;
  // }
  const [text, setText] = useState("")

  useEffect(() => {
  
  }, [])

  return (
    <div className={styles.accountFullpage}>
      {"App settings"}
    </div>
  );
};

export default AppSettings;
