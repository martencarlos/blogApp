import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import Date from "@/utils/date";


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

// export const dynamic= 'force-dynamic' // force dynamic page using other than fetch. = force-cache Eg. axios
// export const revalidate= 10 // force dynamic page using other than fetch. = next: {revalidate: 10} Eg. axios
// this page being a nexted [id] page, it will be dynamicaally rendered to make it static at build time use the following:
// export async function generateStaticParams() {
//   const posts = [{id: 1,name: hello}, {id: 2}, {id: 3}]
//   return posts.map((post) => {
//     return { id: post.id }
//   });
// }


const BlogPost = async ({ params, searchParams }) => {
  const data = await getData(params.id);
  console.log(searchParams) // ?foo=bar
  const promise = await fetch(process.env.SERVER+'/api/user/'+data.author,{
    method: 'GET',
  })
  const author = await promise.json();
  // const value = await authors
 console.log(author )

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
                src={author.avatar}
                alt=""
                width={40}
                height={40}
                className={styles.avatar}
              />
              <span className={styles.username}>{author.name}</span>
            </div>
            <Date dateString = {data.createdAt} className={styles.date}/>
          </div>
        </div>

        
        <Image
          src={data.img}
          alt=""
          height={800}
          width={1000}
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


