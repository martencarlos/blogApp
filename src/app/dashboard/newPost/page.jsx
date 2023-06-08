"use client";
import React, { use, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import Editor from "@/components/Editor/Editor";
import EditorSidebar from "@/components/EditorSidebar/EditorSidebar";
 

const NewPost = () => {

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

  

  function save(data) {
    text.current = data;
  }

  
  if (session.status === "authenticated") {
    return (
      <div className={styles.newPostPage}>
        <div className={styles.editorWrapper}>
          <Editor 
            save={save}
          />
        </div>

        <EditorSidebar 
          rtl  
          width="200px"/>
      </div>
    )
  }
};

export default NewPost;



