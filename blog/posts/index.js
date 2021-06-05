const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 4000;

const posts = {};
// const posts = {
//   1230: {
//     id: 1230,
//     title: "wha2",
//   },
// };
app.use(bodyParser.json());
app.use(cors());
app.use("/", (req, res, next) => {
  // console.log("got request!");
  next();
});
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
