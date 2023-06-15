import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "@/models/User";

export const GET = async (request, { params }) => {
  console.log("GET query with params");

  const { id } = params;
  const array = JSON.parse(id);

  try {
    await dbConnect();
    const followedUsers = await User.find({ _id: { $in: array } });

    return new NextResponse(JSON.stringify(followedUsers), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
