"use client";

import React, { use, useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Link from "next/link";
import Loading from "@/components/Loading/Loading";
 
const fetcher = url => fetch(url).then(res => res.json())

const handleDelete = async (id) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    mutate();
  } catch (err) {
    console.log(err);
  }
};

const Dashboard = () => {

  const session = useSession()
  const router = useRouter();
  
  //NEW WAY TO FETCH DATA
  const { data, mutate, error, isLoading }  = useSWR(session.data ? `/api/posts?username=${session.data.user.name}` : null, fetcher)

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "loading") {
    return <Loading/>;
  }
  
  if (session.status === "authenticated") {
    return (
      
      <div className={styles.posts}>
        {isLoading ? <Loading/>
          : data.map((post) => (
            <Link  href={`/blog/${post._id}`} id={post._id} className={styles.postListItem} key={post._id}>
              <div className={styles.imgContainer}>
                  <Image className={styles.image} src={post.img} alt="" width={200} height={100} />
              </div>
              <h1 id={post._id} className={styles.title}>{post.title}</h1>
              <h2 id={post._id} className={styles.summary}>{post.summary}</h2>
              <p id={post._id} className={styles.author}>{post.author}</p>
            </Link>
            ))}
      </div>
    )
  }
};

export default Dashboard;


