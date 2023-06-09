import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Post from "@/models/Post";
import fs from 'fs'
import { app } from "../../../lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL   } from "firebase/storage";

// works as well
// export async function GET(req){
// const {searchParams} = new URL(req.url)
// const id = searchParams.get("author")
// return new Response (JSON.stringify({name:"john"}), {status: 200})
// }



export const GET = async (request) => {


  const url = new URL(request.url);
  const id = url.searchParams.get("author");
  
  try {

    await dbConnect();
    let posts =[]
    
    if(id)
     posts = await Post.find({author: id});
     else
      posts = await Post.find({});
    
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
  let _id= ""
  if(postInfo.id){
    _id = postInfo.id
  }
  delete postInfo.id

  try {
    await dbConnect();

    if(postInfo.img === "/default.png"){
      // utils
      const timestamp = Date.now()
      const imgExt = "."+obj.file.type.split("/").pop()

      const blob = await obj.file.arrayBuffer()
       // Initialize clour storage for the image and db for the info and path to the image
      const storage = getStorage(app);
      // Create a storage reference from our storage service
      const imagesRef = ref(storage, postInfo.author+"/"+"posts"+"/"+timestamp+"-"+postInfo.title+imgExt);
      
      uploadBytes(imagesRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          postInfo.img = downloadURL;

          if(_id !== ""){
            // const newPost = new Post(postInfo)
            var conditions = {
              _id : _id 
              }
            // Post.findOneAndUpdate
             Post.findOneAndUpdate(conditions, postInfo).then((err, res) => {
              if (err) {
                console.log(err);
              }else{}
            
             })
           }else{
          const newPost = new Post(postInfo);
          newPost.save();}
        });
      });
    }else{
      // const newPost = new Post(postInfo)
      var conditions = {
        _id : _id 
        }
      // Post.findOneAndUpdate
       Post.findOneAndUpdate(conditions, postInfo).then((err, res) => {
        if (err) {
          console.log(err);
        }else{}
          
       })
    }

   
   
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