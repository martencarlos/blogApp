"use client";
// import { notFound, redirect } from "next/navigation"
// import { getCurrentUser } from "@/lib/session"
import Editor from "@/components/EditorJS/Editor";
import Styles from "./page.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

// async function getPostForUser(postId, userId) {
//   return await db.post.findFirst({
//     where: {
//       id: postId,
//       authorId: userId,
//     },
//   })
// }

export default function EditorPage() {
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({});
  const [title, setTitle] = useState({});
  //   const user = await getCurrentUser()
  //   const post = await getPostForUser(params.postId, user.id)

  //   if (!post) {
  //     notFound()
  //   }


  function saveDraft() {
    setSaving(true);

    console.log(title)
    console.log(content)

    // setTimeout(() => {
    setSaving(false);
    // }, 2000);
  }

  return (
    <div className={Styles.editorPageFullPage}>
      <div className={Styles.editorToolbar}>
        <div className={Styles.editorToolbarLeft}>
          <Button
            className={Styles.editorToolbarBackButton}
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        </div>
        <div className={Styles.editorToolbarRight}>
          
          <Button
            onClick={saveDraft}
            className={Styles.editorToolbarSaveButton}
            variant="contained"
          >
            {saving ? 
              <CircularProgress className={Styles.circularProgress} size={24} />
            : 
              "Save"}
          </Button>
        </div>
      </div>
      <Editor 
        saveDraft={setContent}
        saveTitle={setTitle}
      />
    </div>
  );
}
