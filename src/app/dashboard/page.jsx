"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import Image from "next/image";

import Link from "next/link";
import Loading from "@/components/Loading/Loading";
import Date from "@/utils/date";
 
const fetcher = url => fetch(url).then(res => res.json())



const Dashboard = () => {

  const session = useSession()
  // const router = useRouter();
  
  //NEW WAY TO FETCH DATA
  const { data, mutate, error, isLoading }  = useSWR(session.data ? `/api/posts?username=${session.data.user.name}` : null, fetcher)

  // if (session.status === "unauthenticated") {
  //   router.push("/login");
  // }
  // if (session.status === "loading") {
  //   return <Loading/>;
  // }
  
  // if (session.status === "authenticated") {
    return (
      
      <div className={styles.posts}>
        {isLoading ? <Loading/>
          : data.map((post) => (
            <Link  href={`/dashboard/post/${post._id}`} id={post._id} className={styles.postListItem} key={post._id}>
              <div className={styles.imgContainer}>
                  <Image className={styles.image} src={post.img} alt="" width={200} height={150} />
              </div>
              <h1 id={post._id} className={styles.title}>{post.title}</h1>
              <Date id={post._id} css={{color: "var(--secondary-color)", fontSize:"medium"}} dateString={post.createdAt} />
              <p id={post._id} className={styles.summary}>{post.summary}</p>
            </Link>
            ))}
      </div>
    )
  }
// };

export default Dashboard;


