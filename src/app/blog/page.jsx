
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Date from "@/utils/date";
import { getAllPosts } from "@/app/lib/getAllPosts";


const Blog = async () => {
  const data = await getAllPosts()
  
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

            <div className={styles.info}>
              <h1 className={styles.title}>{item.title}</h1>
              <Date css={{color:'var(--primary-color)'}} dateString={item.createdAt} />
              <div className={styles.summary}>{item.summary}</div>
              <p className={styles.author}>{item.author}</p>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
