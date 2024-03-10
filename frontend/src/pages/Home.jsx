import React, { useCallback, useEffect, useState } from "react";
import { getAllPost } from "../controllers/postController";
import Post from "../components/Post";
const DEFAULT_PAGE = 1;
function Home() {
  const [posts, setPost] = useState({
    posts: [],
    totalPosts: null,
  });
  const nodeObserver = React.useRef(null);
  const [currentPage, setCurrentPage] = React.useState(DEFAULT_PAGE);
  async function fetch() {
    const res = await getAllPost(currentPage);
    if (res.data.success === true) {
      setPost((prev) => ({
        posts: [...prev.posts, ...res.data.post],
        totalPosts: res.data.totalPosts,
      }));
    }
  }
  const nodeObserverRef = useCallback(
    (node) => {
      if (nodeObserver.current) nodeObserver.current.disconnect(node);
      nodeObserver.current = new IntersectionObserver(
        (entries) => {
          const targetNode = entries[0];
          console.log(targetNode.isIntersecting);
          if (
            targetNode.isIntersecting &&
            currentPage < Math.ceil(posts.totalPosts / 3)
          ) {
            setCurrentPage((prev) => prev + 1);
          }
        },
        {
          threshold: 0.1,
        }
      );
      if (node) nodeObserver.current.observe(node);
    },
    [posts.posts]
  );
  useEffect(() => {
    fetch();
  }, [currentPage]);
  return (
    <>
      {posts.posts.map((post, index) => (
        <Post
          post={post}
          postRef={index === posts.posts.length - 1 ? nodeObserverRef : null}
        />
      ))}
    </>
  );
}

export default Home;
