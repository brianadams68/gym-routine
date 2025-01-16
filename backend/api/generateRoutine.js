import axios from "axios";

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [{ text: req.body.prompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      res.status(200).json({ routine: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate routine" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
