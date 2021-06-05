import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:4002/posts");
    console.log(response.data);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // useEffect(() => {}, [posts]);
  const postsItems = Object.values(posts).map((post) => {
    return (
      <div className="card" style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>

          {/* <CommentList postId={post.id}></CommentList> */}
          <CommentList comments={post.comments}></CommentList>

          <CommentCreate postId={post.id}></CommentCreate>
        </div>
      </div>
    );
  });

  return <div className="d-flex flex-row flex-wrap justify-content">{postsItems}</div>;
};

export default PostList;
