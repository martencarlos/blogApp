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


  function save(data) {
    text.current = data;
  }

  function getcontent() {
    return text.current;
  }

  
  if (session.status === "authenticated") {
    return (
      <div className={styles.newPostPage}>
        <div className={styles.editorWrapper}>
          <Editor 
            save={save}
          />
        </div>
        <div className={styles.postSettingsSidebar}>
          <EditorSidebar 
            getcontent = {getcontent}
            rtl  
            width="200px"/>
          </div>
      </div>
    )
  }
};

export default NewPost;



