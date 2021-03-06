const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 4001;

// const commentsByIdOfPost = {
//   1230: [{ id: "234a", content: "a wha comment!" }],
// };
const commentsByIdOfPost = {};
app.use(express.json());
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

  comments.push({ id: commentId, content, status: "pending" });
  commentsByIdOfPost[postId] = comments;
  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: { id: commentId, content, postId, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log(`Received event`, req.body.type);
  const { type, data } = req.body;
  if (type === "COMMENT_MODERATED") {
    const { postId, id, status } = data;

    const comments = commentsByIdOfPost[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    await axios.post("http://localhost:4005/events", { type: "COMMENT_UPDATED", data: { ...comment, postId } });
    comment.status = data.status;
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
