import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store API Key in Vercel environment variables
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt, // Pass dynamic prompt from frontend (e.g., "Generate a full body workout routine"),
        max_tokens: 150,
      });

      res.status(200).json({ routine: response.data.choices[0].text });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate routine" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
