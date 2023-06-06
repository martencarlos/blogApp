import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`${process.env.SERVER}/api/posts/${id}`,
  { next: { revalidate: 10 } });

  if (!res.ok) {
    return notFound()
  }

  return res.json();
}


export async function generateMetadata({ params }) {

  const post = await getData(params.id)
  return {
    title: post.title,
    description: post.summary,
  };
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.summary}>
            {data.desc}
          </p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.author}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{__html: data.content}} />
      </div>
    </div>
  );
};

export default BlogPost;
 // <p className={styles.text}>
        //  {data.content}
        // </p>