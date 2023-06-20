
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Date from "@/utils/date";
import { getAllPosts } from "@/lib/getAllPosts";

const Blog = async () => {

  const data = await getAllPosts();

  const postAuthors = data.map((item) => item.author);
  const uniqueAuthors = [...new Set(postAuthors)];
  let authors=[]
  
  const res = await fetch(process.env.SERVER+'/api/user/1',{
    method: 'POST',
    body: JSON.stringify(uniqueAuthors)
  })

  console.log("RETUUUUUURN")
  
  try{
    console.log(res)
    authors =  await res.json();
    console.log(authors)
    console.log(authors.length)
  } catch(err){
    console.log("ERROR in client side")
    console.log(err)
  }

  

  
  // const value = await authors
 
  // .then( res => res.json())
  // .then( data => console.log( data));
 
  
  // const authors = await res.json();
 

  return (
    authors.length!==0 &&<div className={styles.blogPage}>
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
                  src={authors.find(x => x._id === item.author).avatar}
                  alt=""
                  width={20}
                  height={20}
                  className={styles.avatar}
                />
                <span className={styles.username}>{authors.find(x => x._id === item.author).name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;


