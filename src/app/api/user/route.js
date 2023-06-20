import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { app } from "../../../lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL   } from "firebase/storage";


export const PUT = async (req) => {
  //retrive image and info from the request
  const f = await req.formData();
  const obj = Object.fromEntries(f); 
  let user = JSON.parse(obj.user)
 
  try {
    await dbConnect();

      // utils
      const imgExt = "."+obj.file.type.split("/").pop()
      const blob = await obj.file.arrayBuffer()
       // Initialize clour storage for the image and db for the info and path to the image
      const storage = getStorage(app);
      // Create a storage reference from our storage service
      const imagesRef = ref(storage, user.name+"/"+"avatar"+"/"+"my-avatar"+imgExt);
      
      uploadBytes(imagesRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          user.avatar = downloadURL;
            // const newPost = new Post(postInfo)
            var conditions = {
              _id : user._id 
              }
            // Post.findOneAndUpdate
             User.findOneAndUpdate(conditions, user).then((err, res) => {
              if (err) {
                console.log(err);
              }else{}
            
             })
         
        });
      });

    return new NextResponse("Avatar image updated", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

