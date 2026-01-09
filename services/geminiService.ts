import { GoogleGenAI, Type } from "@google/genai";
import { BirthDetails, VedicReport } from "../types";

// Netlify/Vite environment variable setup
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are an expert Vedic Astrologer...`; // आपका पुराना इंस्ट्रक्शन यहाँ रहेगा

export const generateAstrologyReport = async (details: BirthDetails): Promise<VedicReport> => {
  if (!API_KEY) {
    throw new Error("API Key is missing! Check Netlify environment variables.");
  }

  // आपके प्रोजेक्ट के स्ट्रक्चर के हिसाब से GoogleGenAI का उपयोग
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Generate a detailed Vedic Astrology report for...`; // आपका पुराना प्रॉम्ट

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // 'gemini-3' नाम का मॉडल नहीं है, इसे 1.5-flash करें
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      }
    });

    const text = result.response.text();
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text) as VedicReport;
  } catch (error) {
    console.error("Build Error Fix:", error);
    throw error;
  }
};
