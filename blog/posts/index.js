const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

const posts = {
  1230: {
    id: 1230,
    title: "wha2",
  },
};
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  res.status(201).send(posts[id]);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
