"use client";
import React, { use, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import AddIcon from '@mui/icons-material/Add';

import axios from 'axios'
import Link from "next/link";
import Editor from "@/components/Editor/Editor";
 

const Dashboard = () => {

  const session = useSession()
  const router = useRouter();
  const text= useRef("text")
  
  
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const summary = e.target[1].value;
    const img = e.target[2].value;
    const content = text.current;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          summary,
          img,
          content,
          author: session.data.user.name,
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

  function save(data) {
    text.current = data;
  }

  
  if (session.status === "authenticated") {
    return (
      <div className={styles.newPostPage}>
      
        <Editor 
          save={save}
        />
        <form className={styles.newPostForm} onSubmit={handleSubmit}>
          <h1>Post settings</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="summary" className={styles.input} />
          <input type="text" placeholder="Image" className={styles.input} />
          
          <button className={styles.newPostButton}>Publish</button>
        </form>
      </div>
      
    )
  }
};

export default Dashboard;



