const express = require("express");
const cors = require("cors");
const port = 4002;

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

//posts = {postId:{
//     id:postId,
//     title: 'postTitle'
//     comments:[
//         {id: 'comment Id', content: 'post content'}
//     ]
// }}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(type);

  if (type === "POST_CREATED") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "COMMENT_CREATED") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === "COMMENT_UPDATED") {
    const { id, content, postId, status } = data;
    const comment = posts[postId].comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;

    res.send({});
  }

  console.log(posts);
  res.send({});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
