import React from "react";
import styles from "./loading.module.css";


const Loading = (props) => {
  return (
      <div className={styles.loading}>{props.fallback? props.fallback:"Loading..."}</div>
  );
};

export default Loading;
