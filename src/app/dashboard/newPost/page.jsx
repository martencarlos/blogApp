"use client";
import React, { use, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";

import Editor from "@/components/Editor/Editor";
import EditorSidebar from "@/components/EditorSidebar/EditorSidebar";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const NewPost = () => {

  const session = useSession()
  const router = useRouter();
  const text= useRef("text")

  const [showPostSettingsSidebar, setShowPostSettingsSidebar] = useState(false);

  var w = window.innerWidth; //<450 is mobile
  
  
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "loading") {
    return <Loading/>;
  }

  function togglePostSettingsSidebar() {
    setShowPostSettingsSidebar(!showPostSettingsSidebar);
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
        {/*Mobile - Toolbar*/}
        {w<450 &&
        <div className={styles.toolbar}>
        
          <div onClick={()=>{router.back()}} className={styles.toolbarButton}>
            <ArrowBackIosNewIcon/>
          </div>
          <div onClick={togglePostSettingsSidebar} className={styles.toolbarButton}>
            <ViewSidebarIcon />
          </div>
        </div>}
        
        <div className={styles.toolbareditorwrapper}>

          <div className={styles.editorWrapper}>
            <Editor 
              save={save}
            />
          </div>
          
          {/*Desktop or Mobile sidebarButton clicked - Post Settings sidebar*/}
          {(showPostSettingsSidebar && w<450 || w>450) && <div className={styles.postSettingsSidebar}>
            <EditorSidebar 
              getcontent = {getcontent}
              rtl  
              width="200px"/>
          </div>}

        </div>
      </div>
    )
  }
};

export default NewPost;



