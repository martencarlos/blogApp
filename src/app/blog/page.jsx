
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Date from "@/utils/date";
import { getAllPosts } from "@/app/lib/getAllPosts";





const Blog = async () => {

  const data = await getAllPosts();
  const postAuthors = data.map((item) => item.author);
  const uniqueAuthors = [...new Set(postAuthors)];
  
  const string = JSON.stringify(uniqueAuthors)
  const users = await fetch(process.env.SERVER+'/api/user?users='+JSON.stringify(uniqueAuthors),{
    method: 'GET',
   
  })
  // const res = await axios.post(process.env.SERVER+'/api/user',string)

  

  // const authors = await res.json();
 

  return (
    <div className={styles.blogPage}>
      <div className={styles.postsList}>
        {data && data.map((item) => (
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


