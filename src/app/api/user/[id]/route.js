import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "@/models/User";

export const GET = async (request, { params }) => {
  const { id } = params;
  console.log("GET query with params")
  console.log(params)
  try {
    // await dbConnect();
    // const post = await User.findById(id);

    
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

