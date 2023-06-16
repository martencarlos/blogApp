import React from "react";
import styles from "./page.module.css";
import Image from "next/image";


export const metadata = {
  title: "Webframe - contact",
  description: "Contact page for Webframe",
};

const Contact = () => {
  return (
    <div className={styles.contactFullPage}>
      
      <h1 className={styles.title}>Lets Keep in Touch</h1>
      
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt=""
            width={300}
            height={300}
            className={styles.image}
          />
        </div>
        
        <form className={styles.form}>
          <input type="text" placeholder="name" className={styles.input} />
          <input type="text" placeholder="email" className={styles.input} />
          <textarea
            className={styles.textArea}
            placeholder="message"
            cols="30"
            rows="6"
          ></textarea>
          <button className={styles.button} >Send</button>
        </form>
      </div>

    </div>
  );
};

export default Contact;
