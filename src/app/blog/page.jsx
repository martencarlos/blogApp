import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Date from "@/utils/date";
import { getAllPosts } from "@/app/lib/getAllPosts";

const Blog = async () => {
  const data = await getAllPosts();
  console.log(data);
  console.log(data);

  return (
    <div className={styles.blogPage}>
      <div className={styles.postsList}>
        {data.map((item) => (
          <Link
            href={`/blog/${item._id}`}
            className={styles.post}
            key={item._id}
          >
            {/*<div className={styles.imageContainer}>*/}
            <Image
              src={item.img}
              alt=""
              width={160}
              height={130}
              className={styles.image}
            />
            {/*</div>*/}

            <div className={styles.info}>
              <h1 className={styles.title}>{item.title}</h1>
              <Date
                css={{ color: "var(--primary-color)" }}
                dateString={item.createdAt}
              />
              <div className={styles.summary}>{item.summary}</div>

              <div className={styles.author}>
                <Image
                  src={item.img}
                  alt=""
                  width={20}
                  height={20}
                  className={styles.avatar}
                />
                <span className={styles.username}>{item.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
