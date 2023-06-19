"use client"

import  { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize"
import styles from "./editor.module.css"


export default function Editor(props) {
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState()
  const ref = useRef()

  useEffect(() => {
    props.saveTitle (title)
  }, [title, props])

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const ImageTool = (await import("simple-image-editorjs")).default
    
    
  
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        onChange() {
          ref.current.save().then((outputData) => {
            props.saveDraft (outputData)
            
          })},
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: "content",
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          image: ImageTool,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [])

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  if (!isMounted) return null;

  return (
    <div className={styles.editorFullPage}>
      <div className={styles.title}>
        <TextareaAutosize className={styles.textArea}
          autoFocus
          id="title"
          // defaultValue={post.title}
          placeholder="Post title"
          value={title}
          onChange={(e) => {
        
            setTitle(e.target.value)
          }}
        />
      </div>
      {<div id='editor' className={styles.editor} />}
      
    </div>
  );
}


