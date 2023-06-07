import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Date from "@/utils/date";

async function getData() {
  const res = await fetch(process.env.SERVER+"/api/posts", 
    { next: { revalidate: 10 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async () => {
  const data = await getData();
  
  return (
    <div className={styles.blogPage}>
      
      <div className={styles.postsList} >
        {data.map((item) => (
          <Link href={`/blog/${item._id}`} className={styles.post} key={item._id}>
            
            <div className={styles.imageContainer}>
              <Image
                src={item.img}
                alt=""
                width={100}
                height={100}
                className={styles.image}
              />
            </div>

            <div className={styles.content}>
              <h1 className={styles.title}>{item.title}</h1>
              <Date dateString={item.createdAt} />
              <p className={styles.desc}>{item.summary}</p>
              <p className={styles.author}>{item.author}</p>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
