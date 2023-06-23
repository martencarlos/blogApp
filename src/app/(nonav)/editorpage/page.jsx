"use client";
// import { notFound, redirect } from "next/navigation"
// import { getCurrentUser } from "@/lib/session"
import Editor from "@/components/EditorJS/Editor";
import styles from "./page.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Image from "next/image";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import TextField from '@mui/material/TextField';
import SubjectIcon from '@mui/icons-material/Subject';

import TextareaAutosize from "react-textarea-autosize";


export default function EditorPage() {
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const [postImage, setPostImage] = useState();

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  function saveDraft() {
    setSaving(true);

    console.log(title);
    console.log(content);

    setTimeout(() => {
      setSaving(false);
    }, 2000);
  }

  const showHidePostMenu = () => {
    const postMenu = document.getElementById("postMenu");
    if (postMenu.style.display === "none" || postMenu.style.display === "") {
      postMenu.style.display = "block";
    } else {
      postMenu.style.display = "none";
    }
  };

  const openPostSettingsModal = () => {
    const postSettingsModal = document.getElementById("postSettingsModal");
    postSettingsModal.style.display = "flex";
  };

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = undefined;
    const title = e.target[0].value;
    const summary = e.target[1].value;
    const img = "/default.jpg"
    const content = content.join(" ");
    const content_html= content.join(" ")

    //upload image
      const info = JSON.stringify({
        id,
        title,
        summary,
        img,
        content,
        content_lexical: content_html,
        author: session.data.user._id,
      })
      
      const body = new FormData();
      body.append("file", postImage);
      body.append("info", info);
      
      const response = await fetch("/api/posts", {
        method: "POST",
        body
      })
      // mutate();

      //clear form
     
      setPreview(false)
      e.target.reset()
      
      router.push("/dashboard")
  };

  const closePostSettingsModal = () => {
    const postSettingsModal = document.getElementById("postSettingsModal");
    postSettingsModal.style.display = "none";
  };

  const processImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPostImage(e.dataTransfer.files[0])
    setSelectedFile(e.dataTransfer.files[0])
    
  };

  return (
    <div className={styles.editorPageFullPage}>
      {/* toolbar */}
      <div className={styles.editorToolbar}>
        <div className={styles.editorToolbarLeft}>
          <Button
            className={styles.editorToolbarBackButton}
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        </div>

        <div className={styles.editorToolbarRight}>
          {/* Save button */}
          <Button
            onClick={saveDraft}
            className={styles.editorToolbarSaveButton}
            variant="contained"
          >
            {saving ? (
              <CircularProgress className={styles.circularProgress} size={24} />
            ) : (
              "Save"
            )}
          </Button>

          {/* More actions button */}
          <IconButton onClick={showHidePostMenu} aria-label="More" size="large">
            <MoreVertIcon />
            {/* Post menu - hidden */}
            <div id="postMenu" className={styles.postMenu}>
              <div
                onClick={openPostSettingsModal}
                className={styles.iconButton}
              >
                <TuneIcon className={styles.icon} />
                <div>Post Settings</div>
              </div>
            </div>
          </IconButton>
        </div>
      </div>
      {/* editor  post */}
      <Editor saveDraft={setContent} saveTitle={setTitle} />
      {/* preview  post */}
      <div className={styles.renderedText}>
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content.join(" ") }} />
        ) : (
          "empty"
        )}
      </div>

      {/* Post settings Modal - hidden */}
      <div id="postSettingsModal" className={styles.postSettingsModal}>
        {/* close modal */}
       
          <IconButton className={styles.closeButton} onClick={closePostSettingsModal} aria-label="close" size="large">
            <CloseIcon />
          </IconButton>
     
        
        <h1 className={styles.postSettingsModalTitle}>Post Settings</h1>

        <form className={styles.newPostForm} onSubmit={handleSubmit}>
          <div className={styles.inputWithIcon}>
          <TitleIcon className={styles.titleIcon} />
            <TextField 
              margin="dense"
              size="small"
              defaultValue={title ? title : ""}
              required
              type="text"
              placeholder="Title"
              className={styles.input}
            />
          </div>
          <div className={styles.inputWithIcon}>
            <SubjectIcon  />
            <TextareaAutosize
              // defaultValue={""}
              required
              type="text"
              placeholder="summary"
              className={styles.textarea}
            />
          </div>
          <div id="drop_zone" className={styles.imgDropZone} onDragEnd={processImageDrop} onDragOver={processImageDrop} ondrop={processImageDrop}>
          {selectedFile ? 
            <Image
              width={245}
              height={100}
              className={styles.imagePreview}
              alt="image preview"
              src={preview}
            />
            :
            "Drag your image or click here"
          }
            <input
            required={true}
            className={styles.hiddenInput}
            style={{ margin: "20px 0px 10px 0px" }}
            type="file"
            onChange={onSelectFile}
          />
          </div>
          
          
          

          <button className={styles.newOrUpdatePostButton}>
            {"Publish"}
          </button>
        </form>

      </div>
    </div>
  );
}
