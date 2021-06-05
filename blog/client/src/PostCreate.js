import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:4000/posts", { title: title });
    setTitle("");

    console.log(`server sent: ${response}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              console.log(e.target.value);
            }}
            className="form-control"
          ></input>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
