const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { allowedNodeEnvironmentFlags } = require("process");
const app = express();
const port = 4000;

const posts = {};
// const posts = {
//   1230: {
//     id: 1230,
//     title: "wha2",
//   },
// };
app.use(express.json());
app.use(cors());
app.use("/", (req, res, next) => {
  // console.log("got request!");
  next();
});
app.get("/posts", (req, res) => {
  const x = 2;
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", { type: "POST_CREATED", data: { id, title } });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log(`Received event`, req.body.type);
  res.send({});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
