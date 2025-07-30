import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "https://ai-career-frontend-livid.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ Career Path Generator API with Groq is running");
});

// POST endpoint
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        error: "Prompt is required",
        message: "Please describe your skills, interests, or background.",
      });
    }

    const lowerPrompt = prompt.toLowerCase();

    // ❌ Prevent irrelevant inputs (like jokes, politics, weather, etc.)
    const bannedWords = [
      "elon",
      "weather",
      "president",
      "news",
      "joke",
      "tiktok",
      "instagram",
      "bts",
    ];
    const isInvalid = bannedWords.some((word) => lowerPrompt.includes(word));

    if (isInvalid || lowerPrompt.length < 10) {
      return res.status(200).json({
        generated:
          "❌ This AI is only designed to generate career path suggestions. Please describe your skills, interests, or goals.",
        success: false,
      });
    }

    // ✅ Groq API call
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct", // or try "llama3-70b-8192"
        messages: [
          {
            role: "user",
            content: `Suggest 3-5 career paths for someone with this background: ${prompt}.
Format each as:
1) Job Title
2) Description (2 sentences)
3) Key Skills
4) Salary Range`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data.choices?.[0]?.message?.content;

    if (!generatedText) {
      throw new Error("No response from Groq API.");
    }

    res.json({
      generated: generatedText,
      success: true,
    });
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Career generation failed",
      details: error.message,
      suggestion: "Please check your Groq API key or try again later",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
