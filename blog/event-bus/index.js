const express = require("express");
const axios = require("axios");
const port = 4005;
const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  //   axios.post("http://localhost:4002/events", event);
  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
