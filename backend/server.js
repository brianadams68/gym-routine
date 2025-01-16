const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Set up CORS
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend from localhost:3000
}));

app.use(express.json()); // To parse JSON bodies

// Initialize the Gemini AI model with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/generateRoutine", async (req, res) => {
  try {
    const prompt = req.body.prompt; // Get prompt from the request body
    const result = await model.generateContent(prompt); // Generate content using Gemini

    // Send the generated response as JSON
    res.status(200).json({ routine: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate routine" }); // Handle errors
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});


