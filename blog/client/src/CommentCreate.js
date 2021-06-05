import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment,
    });
    setComment("");
    console.log(response.data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Coment</label>
          <input value={comment} onChange={(e) => setComment(e.target.value)} className="form-control"></input>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
