const express = require("express");
const axios = require("axios");
const port = 4003;
const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "COMMENT_CREATED") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", { type: "COMMENT_MODERATED", data: { ...data, status } });
    res.send({});
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
