const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-OpenRouter-Title": "Reach CRM",
  },
});

class AIService {
  async generate(prompt) {
    const response = await client.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  }
}

module.exports = new AIService();
