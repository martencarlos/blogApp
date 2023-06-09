import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Post from "@/models/Post";
import fs from 'fs'
import { app } from "../../lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL   } from "firebase/storage";

export const GET = async (request) => {

  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  try {

    await dbConnect();

    const posts = await Post.find(username && { username });
    
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (req) => {
  
  //retrive image and info from the request
  const f = await req.formData();
  const obj = Object.fromEntries(f); 
  let postInfo = JSON.parse(obj.info)
  const blob = await obj.file.arrayBuffer()

  // utils
  const timestamp = Date.now()
  const imgExt = "."+obj.file.type.split("/").pop()

  try {
    await dbConnect();
    // Initialize clour storage for the image and db for the info and path to the image
    const storage = getStorage(app);
    // Create a storage reference from our storage service
    const imagesRef = ref(storage, postInfo.author+"/"+"posts"+"/"+timestamp+"-"+postInfo.title+imgExt);
    
    uploadBytes(imagesRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        postInfo.img = downloadURL;
        const newPost = new Post(postInfo);
        newPost.save();
      });
    });

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


 //  Object.entries(obj).forEach( async([k, v]) => {
  //     if( !!v.type ) { // If it's a file, values like image/png are passed over.
  //         const b = await v.arrayBuffer();
  //         const buff = Buffer.from(b);

  //         // fs.writeFileSync(`./public/${k}.jpeg`, buff);
  //         fs.mkdirSync(imgDir, { recursive: true }, (err) => {
  //           if (err) throw err;
  //         });

  //         fs.writeFileSync(imagePath, buff);
  //         // 'file' comes from the Blob or File API
  //         uploadBytes(imagesRef, b).then((snapshot) => {
  //           getDownloadURL(snapshot.ref).then((downloadURL) => {
  //             postInfo.img = downloadURL;
  //             const newPost = new Post(postInfo);
  //             newPost.save();
  //           });
  //         });
  //     }
  // });