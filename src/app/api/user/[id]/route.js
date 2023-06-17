import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "@/models/User";

export const POST = async (request) => {
  console.log("GET query with params");


  // const array = JSON.parse(id);

  try {
    await dbConnect();
    const array =  await request.json();
    const followedUsers = await User.find({ _id: { $in: array } });
    const responseJson= JSON.stringify(followedUsers);
    console.log(responseJson)

    return new NextResponse(responseJson, { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
