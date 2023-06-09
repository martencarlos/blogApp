import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Post from "@/models/Post";
import fs from 'fs'

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

  const f = await req.formData();
  const obj = Object.fromEntries(f); 
  let postInfo = JSON.parse(obj.info)
  const timestamp = Date.now()
  const imgExt = "."+obj.file.type.split("/").pop()
  const imgDir= "./public/"+postInfo.author+"/"+"/"+"posts"+"/"
  let imagePath= "./public/"+postInfo.author+"/"+"posts"+"/"+postInfo.title+imgExt;
  const imgDBPath= "/"+postInfo.author+"/"+"posts"+"/"+postInfo.title+imgExt;
  
  Object.entries(obj).forEach( async([k, v]) => {
      if( !!v.type ) { // If it's a file, values like image/png are passed over.
          const b = await v.arrayBuffer();
          const buff = Buffer.from(b);

          // fs.writeFileSync(`./public/${k}.jpeg`, buff);
          fs.mkdirSync(imgDir, { recursive: true }, (err) => {
            if (err) throw err;
          });

          fs.writeFileSync(imagePath, buff);
      }
  });

 postInfo.img = imgDBPath

  const newPost = new Post(postInfo);

  try {
    await dbConnect();
    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
