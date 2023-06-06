"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import AddIcon from '@mui/icons-material/Add';

import axios from 'axios'
import Link from "next/link";
 
const fetcher = url => fetch(url).then(res => res.json())


const Dashboard = () => {

  const session = useSession()
  const router = useRouter();
  
  //NEW WAY TO FETCH DATA
  const { data, mutate, error, isLoading }  = useSWR(session.data ? `/api/posts?username=${session.data.user.name}` : null, fetcher)

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

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

  
  if (session.status === "authenticated") {
    return (
      
      <div className={styles.posts}>
        {isLoading ? "loading"
          : data.map((post) => (
            
            <Link  href={`/blog/${post._id}`} id={post._id} className={styles.postListItem} key={post._id}>
              <div className={styles.imgContainer}>
                  <Image src={post.img} alt="" width={200} height={100} />
              </div>
              <h1 id={post._id} className={styles.title}>{post.title}</h1>
              <h2 id={post._id} className={styles.summary}>{post.desc}</h2>
              <p id={post._id} className={styles.author}>{post.username}</p>
            </Link>
            ))}
      </div>
    )
  }
};

export default Dashboard;

