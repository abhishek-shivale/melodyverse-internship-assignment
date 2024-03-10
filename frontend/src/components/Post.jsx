import React from "react";
import { useNavigate } from "react-router-dom";

function Post(props) {
  const navigate = useNavigate();

  return (
    <>
      <div key={props.post.id} className="mx-14 my-8">
        <div className="font-bold">{props.post.title}</div>
        <div
          className="flex justify-center "
          onClick={() => {
            navigate(`/post/read?id=${props.post.id}`);
          }}>
          <img
            className="object-cover h-96 w-96"
            src="https://picsum.photos/id/158/200/300"
            alt={props.post?.title}
          />
        </div>
        <div>{props.post.description}</div>
      </div>
    </>
  );
}

export default Post;
