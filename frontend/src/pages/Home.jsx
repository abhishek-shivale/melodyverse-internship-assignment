import React, { useEffect, useState } from "react";
import { getAllPost } from "../controllers/postController";
import Post from "../components/Post";

function Home() {
  const [posts,setPost] = useState([])
  async function fetch() {
    const res = await getAllPost();
    if (res.data.success === true) {
      setPost(res.data.post)
    }
  }
  useEffect(() => {
    fetch();
  }, []);
  return<>
    {
      posts.map((post)=>(
        <Post post={post} />
      ))
    }
  
  </>
}

export default Home;
