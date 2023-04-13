const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.Open_AI_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api/q", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "gpt-4",
      prompt: `
        var a = 123;
      `,
    });
    return res.status(200).json({
      message: "Working",
    });
  } catch (error) {}
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on port" + port);
});
