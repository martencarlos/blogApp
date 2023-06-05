import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.landingPage}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.featureImage}
            src="/featureImage.webp"
            alt="Feature Image"
            width={300}
            height={600}
            priority
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Create your own website</h1>
          <p>Create a full-featured Website Application fast and effortlessly. Take a look at some website projects created with Webframe in the /solutions tab.</p>
          <p>Wordpress, Webflow, Shopify, Squarespace or Wix are great for standard static website creation. But if you are looking to create your own professional Website Application without limitations and with the help of experts, try Webframe.</p>
        </div>
      </div>
    </main>
  );
}
