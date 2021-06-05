const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 4001;

// const commentsByIdOfPost = {
//   1230: [{ id: "234a", content: "a wha comment!" }],
// };
const commentsByIdOfPost = {};
app.use(bodyParser.json());
app.use(cors());

app.get("/posts/allComments", (req, res) => {
  console.log("in allComments");
  console.log(commentsByIdOfPost);
  res.send(commentsByIdOfPost);
});
app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByIdOfPost[req.params.id];
  res.send(comments || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByIdOfPost[req.params.id] || [];

  comments.push({ id: commentId, content });
  commentsByIdOfPost[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
