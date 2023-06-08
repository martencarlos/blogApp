

export const getAllPosts = async () => {

  const res = await fetch(process.env.SERVER+"/api/posts", 
  { next: { revalidate: 60*15 } });

  if (!res.ok) {
  throw new Error("Failed to retrieve data");
  }

  return res.json();
};