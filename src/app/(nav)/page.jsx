import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.landingPayge}>
        
        <div className={styles.imageContainer}>
          <Image
            className={styles.featureImage}
            src="/featureImage.webp"
            alt="Feature Image"
            width={200}
            height={300}
            priority
          />
        </div>

        <div className={styles.textContainer}>
          <h1 className={styles.title}>Build Your Blog.<br/>Share Your Voice.</h1>
          <p className={styles.subTitle}>{"Welcome to our blog creation site, where your ideas take center stage. "}</p>
          <p className={styles.subTitle}>{"Start writing, engage readers, and make your mark in the digital world. It's time to unleash your creativity and share your unique story with the world."}</p>
          <br />
          <Link className={styles.linkButton} href="/dashboard">
            {"Let's get started!"}
          </Link>
        </div>

      </div>
    </main>
  );
}
