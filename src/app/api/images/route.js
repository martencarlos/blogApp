import { NextResponse } from "next/server";
import fs from 'fs'


export const GET = async (request) => {
  try {

    //get image
    
    return new NextResponse(JSON.stringify("posts"), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (req) => {
 
    

  try {

    const f = await req.formData();
    const obj = Object.fromEntries(f);    
    console.log(f)
    console.log(obj)
    Object.entries(obj).forEach( async([k, v]) => {
        if( !!v.type ) { // If it's a file, values like image/png are passed over.
            const b = await v.arrayBuffer();
            const buff = Buffer.from(b);

            fs.writeFileSync(`./public/${k}.jpeg`, buff);
        }
    });


    return new NextResponse("Image saved", { status: 201 });
  } catch (err) {
    console.log(err)
    return new NextResponse("Database Error", { status: 500 });
  }
};
