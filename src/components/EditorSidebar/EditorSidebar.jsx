"use client";
import {useState, useContext, useEffect, use} from "react";
import styles from "./editorSidebar.module.css";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import Loading from "@/components/Loading/Loading";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { ThemeContext } from "../../context/ThemeContext";
import useSWR from "swr";


const EditorSidebar = (props) => {

  const session = useSession()
  const router = useRouter();
  const { mutate } = useSWR()

  const { mode } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(props.collapsed);
  const [data, setData] = useState();
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

useEffect(() => {
  if (props.data) {
    setData(props.data);
  }
}, [props.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = data?data._id:undefined;
    const title = e.target[0].value;
    const summary = e.target[1].value;
    const img = preview?"/default.png":data.img //e.target[2].value;
    const content = props.getcontent();
    const content_lexical = data?localStorage.getItem("editable_draft"):localStorage.getItem("draft");
  
    // try {
    //   await fetch("/api/posts", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       title,
    //       summary,
    //       img,
    //       content,
    //       author: session.data.user.name,
    //     }),
    //   });
    //   mutate();
    //   e.target.reset()
    // } catch (err) {
    //   console.log(err);
    // }

    //upload image
      const info = JSON.stringify({
        id,
        title,
        summary,
        img,
        content,
        content_lexical,
        author: session.data.user._id,
      })
      const imgInput = document.querySelector('input[type="file"]')
      const image = imgInput.files[0];
      
      const body = new FormData();
      body.append("file", image);
      body.append("info", info);
      
      const response = await fetch("/api/posts", {
        method: "POST",
        body
      })
      // mutate();

      //clear form
     
      setPreview(false)
      e.target.reset()
      props.handleClearEditor()
      router.push("/dashboard")
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
    router.push("/dashboard")
  };

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "loading") {
    return <Loading/>
  }

  if (session.status === "authenticated") {
   
    return (
      <Sidebar className={styles.editorSidebar} width="210px" backgroundColor={mode=== "light" ? "white" : "black"} collapsed={collapsed}>
        <Menu closeOnClick={false}>
          
        <MenuItem
            className={[styles.menuItem, styles.title].join(" ")}
            icon= <MoreVertRoundedIcon/> 
            onClick={() => setCollapsed(!collapsed)}> Post settings </MenuItem>
          <br/>
          
          <SubMenu defaultOpen  className={styles.subMenu} icon= <SettingsIcon/>  label="Settings">
            <form  className={styles.newPostForm} onSubmit={handleSubmit} >
              <input defaultValue={data?data.title:""} required type="text" placeholder="Title" className={styles.input}/>
              <textarea defaultValue={data?data.summary:""} required type="text" placeholder="summary" className={styles.textarea} />
              <input  required={data?false:true} type='file' onChange={onSelectFile} />
                {selectedFile && preview  && <Image width={180} height={100} className={styles.imagePreview} alt="image preview"  src={preview} /> }
                {!selectedFile && data && <Image width={180} height={100} className={styles.imagePreview} alt="image preview"  src={data.img} /> }

                <button className={styles.newOrUpdatePostButton}>{data?"update":"Publish"}</button>
            </form>
            <div className={styles.deleteButtonContainer}>
              {data && <button onClick={()=>{handleDelete(data._id)}} className={styles.deletePostButton}>{"delete"}</button>}
            </div>
            
          </SubMenu>
        </Menu>

      </Sidebar>
    )
  }
};

export default EditorSidebar;
