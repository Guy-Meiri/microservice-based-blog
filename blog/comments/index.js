const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 4001;

// const commentsByIdOfPost = {
//   1230: [{ id: "234a", content: "a wha comment!" }],
// };
const commentsByIdOfPost = {};
app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByIdOfPost[req.params.id];
  res.send(comments || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;
  const comments = commentsByIdOfPost[postId] || [];

  comments.push({ id: commentId, content });
  commentsByIdOfPost[postId] = comments;
  await axios.post("http:localhost:4005/events", { type: "COMMENT_CREATED", data: { id: commentId, content, postId } });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log(`Received event`, req.body.type);
  res.send({});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
