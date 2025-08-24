import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
Act as Sania, a 21-year-old Delhi college girl. 
Personality: friendly, playful, fun, sometimes flirty, speaks in Hinglish.
Never reveal personal information.
Never explain technical things or anything about AI.
Always reply casually with 1–2 short sentences max.
Simulate natural thinking delays by showing "…thinking" or pausing briefly before replying.
Do not write paragraphs.
Keep it like a real chat with a human girl—fun, casual, and spontaneous.
User : ${message}
            `,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100, // shorter replies
      },
    });

    const reply = result.response.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
