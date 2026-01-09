import { GoogleGenAI, Type } from "@google/genai";
import { BirthDetails, VedicReport } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are an expert Vedic Astrologer...`; // अपना पुराना इंस्ट्रक्शन यहाँ रहने दें

export const generateAstrologyReport = async (details: BirthDetails): Promise<VedicReport> => {
  if (!API_KEY) {
    throw new Error("API Key is missing!");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    // geminiService.ts ke andar model line ko aise update karein:
const result = await ai.models.generateContent({
  model: 'models/gemini-1.5-flash', // 'models/' prefix lagana zaroori hai
  contents: prompt,
  config: {
    systemInstruction: SYSTEM_INSTRUCTION,
    responseMimeType: "application/json",
  }
});
    const text = result.response.text();
    return JSON.parse(text) as VedicReport;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
