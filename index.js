// FOAJ Proxy Minimal Backend (index.js)
// This is the backend proxy server for FOAJ app.

const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.get("/", (req, res) => {
  res.send("FOAJ Proxy Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("FOAJ Proxy running on port", PORT));
