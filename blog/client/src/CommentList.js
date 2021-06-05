import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = (props) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const commentsOfPost = await axios.get(`http://localhost:4001/posts/${props.postId}/comments`);
    console.log(commentsOfPost.data);
    setComments(commentsOfPost.data);
  };

  const commentsList = comments && Object.values(comments).map((com) => <li key={com.id}>{com.content}</li>);
  useEffect(() => {
    fetchComments();
  }, []);
  return <ul>{commentsList}</ul>;
};

export default CommentList;
