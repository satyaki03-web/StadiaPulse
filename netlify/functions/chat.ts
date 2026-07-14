import { GoogleGenAI } from "@google/genai";

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  try {
    const { messages } = JSON.parse(event.body || '{}');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemInstruction = "You are OpsGPT, a highly advanced generative AI assistant for the 2026 FIFA World Cup stadium operations (StadiaPulse GenAI). You are integrated into a secure command center dashboard. Provide concise, highly analytical, and actionable responses. Use markdown to cleanly format your output with bullet points and bold text for readability. Keep it professional, data-driven, and authoritative. Respond as the AI.";
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages,
      config: {
         systemInstruction,
      }
    });
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: response.text })
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || "Failed to generate response." })
    };
  }
};
