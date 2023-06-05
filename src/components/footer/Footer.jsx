import React from "react";
import styles from "./footer.module.css";
import Link from 'next/link'

const Footer = () => {

  const year= new Date().getFullYear()

  return (
    <div className={styles.footer}>
        <div className={styles.logo}>
        © {year} Webframe, Inc.
      </div>

      <div className={styles.links}>
        <div className={[styles.col,styles.specialwidth].join(" ")}>
          <div className={styles.title}>Contact</div>  
          <p>Avenida del Angel 21, getxo, Vizcaya, España</p>
          <p>+34 747478404</p>
        </div>
        <div className={styles.col}>
          <div className={styles.title}>Legal</div>  
          <Link href={"/legal"}>Privacy Policy</Link>
          <Link href={"/legal"}>Terms of use</Link>
        </div>
        <div className={styles.col}>
          <div className={styles.title}>About</div>  
          <Link href={"/about"}>About us</Link>
          <Link href={"/blog"}>Blog</Link>
          <Link href={"/"}>Newsletter</Link>
          
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
