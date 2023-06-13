"use client";


import styles from "./page.module.css";
// import React from "react";
import Editor from "@/components/Editor/Editor";
import EditorSidebar from "@/components/EditorSidebar/EditorSidebar";
import { useWindowSize } from "@/app/hooks/windowSize";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useRef, useState } from "react";

async function getData(id) {
  const res = await fetch(`/api/posts/${id}`);
  
  if (!res.ok) {
    return "notFound()";
  }

  return res.json();
}



const EditPost =  ({ params }) => {
  
  const size = useWindowSize();
  const router = useRouter();
  const editorHTMLContent = useRef(null);

  const [showPostSettingsSidebar, setShowPostSettingsSidebar] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function runAsync() {
      const postData = await getData(params.id);
      setData(postData);
    }
    runAsync();
  }, [params]);

  function save(data) {
    editorHTMLContent.current = data;
  }

  function togglePostSettingsSidebar() {
    setShowPostSettingsSidebar(!showPostSettingsSidebar);
  }

  function getcontent() {
    return editorHTMLContent.current;
  }
  function handleClearEditor() {
    
  }

  
  
  return (
    <div className={styles.editPostPage}>
        {/*Mobile - Toolbar*/}
        {size.width<450 &&
        <div className={styles.toolbar}>
        
          <div onClick={()=>{router.back()? router.back():router.push("/dashboard")}} className={styles.toolbarButton}>
            <ArrowBackIosNewIcon/>
          </div>
          <div onClick={togglePostSettingsSidebar} className={styles.toolbarButton}>
            <ViewSidebarIcon />
          </div>
        </div>}
        
        <div className={styles.toolbareditorwrapper}>

          <div className={styles.editorWrapper}>
          {data && <Editor 
              save={save}
              clearEditor = {false}
              editContent = {data.content_lexical}
            />}
          </div>
          
          {/*Desktop or Mobile sidebarButton clicked - Post Settings sidebar*/}
          {(showPostSettingsSidebar && size.width<450 || size.width>450) && <div className={styles.postSettingsSidebar}>
            <EditorSidebar 
              getcontent = {getcontent}
              handleClearEditor = {handleClearEditor}
              data = {data}
              rtl
              collapsed= {showPostSettingsSidebar?(!showPostSettingsSidebar):true}
              width="200px"/>
          </div>}

        </div>
      </div>
  );
};

export default EditPost;
