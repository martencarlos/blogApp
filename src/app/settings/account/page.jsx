import React from "react";
import styles from "./page.module.css";

import Button from "@/components/Button/Button";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading/Loading";

const Account = () => {

  const session = useSession()

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "loading") {
    return <Loading/>;
  }

  return (
    <div className={styles.accountFullpage}>
      Account
    </div>
  );
};

export default Account;
