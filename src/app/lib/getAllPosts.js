

export const getAllPosts = async () => {

const res = await fetch(`${process.env.SERVER}/api/posts`);
  const posts = await res.json();

  return posts
};