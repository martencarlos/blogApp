"use client"

import  { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize"
import styles from "./editor.module.css"
import edjsHTML from "editorjs-html"

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
    const Delimiter = (await import("@editorjs/delimiter")).default
    const Checklist = (await import("@editorjs/checklist")).default
    const Marker = (await import("@editorjs/marker")).default
    const ColorPlugin = (await import("editorjs-text-color-plugin")).default
    const AlignmentTuneTool = (await import("editorjs-text-alignment-blocktune")).default
  
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        onChange() {
          ref.current.save().then((outputData) => {

            const edjsParser = edjsHTML();
            const html = edjsParser.parse(outputData);
            props.saveDraft (html)
            
          })},
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: "content",
        tools: {
          header: {
            class: Header,
            tunes: ['anyTuneName'],
          },
          Color: {
            class: ColorPlugin, 
            config: {
               colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
               defaultColor: '#FF1300',
               type: 'text', 
               customPicker: true 
            }     
          },
          linkTool: LinkTool,
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          list: List,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          image: ImageTool,
          delimiter: Delimiter,
          code: Code,
          paragraph: {
            tunes: ['anyTuneName'],
          },
          inlineCode: InlineCode,
          table: Table,
          anyTuneName: {
            class:AlignmentTuneTool,
            config:{
              default: "left",
              blocks: {
                header: 'center',
                list: 'right'
              }
            },
          },
          embed: {
            class: Embed,
            inlineToolbar: true
          },
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


