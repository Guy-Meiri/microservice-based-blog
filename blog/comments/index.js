const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");

const app = express();
const port = 4001;

const commentsByIdOfPost = {
  1230: [{ id: "234a", content: "a wha comment!" }],
};

app.use(bodyParser.json());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByIdOfPost[req.params.id] || []);
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
