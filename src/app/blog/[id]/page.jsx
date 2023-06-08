import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import Date from "@/utils/date";
import { getAllPosts } from "@/app/lib/getAllPosts";

async function getData(id) {
  const res = await fetch(`${process.env.SERVER}/api/posts/${id}`,
  { next: { revalidate: 60 } });

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
    <div className={styles.blogPostFullPage}>
      <div className={styles.blogPost}>
        
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.subTitle}>
            {data.summary}
          </p>
          <div className={styles.row}>
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
            
            <Date dateString = {data.createdAt} className={styles.date}/>
          </div>
        </div>

        
        <Image
          src={data.img}
          alt=""
          height={300}
          width={100}
          className={styles.image}
        />
      
      
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{__html: data.content}} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;


export async function generatestatiParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
      params: { id: post._id },
    }))
   
}