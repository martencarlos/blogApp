"use client"
// import { notFound, redirect } from "next/navigation"
// import { getCurrentUser } from "@/lib/session"
import Editor from "@/components/EditorJS/Editor";

// async function getPostForUser(postId, userId) {
//   return await db.post.findFirst({
//     where: {
//       id: postId,
//       authorId: userId,
//     },
//   })
// }

export default async function EditorPage() {
//   const user = await getCurrentUser()
//   const post = await getPostForUser(params.postId, user.id)

//   if (!post) {
//     notFound()
//   }

  return (
    <div>
      <Editor 
        
      />
    
    </div>
  )
}