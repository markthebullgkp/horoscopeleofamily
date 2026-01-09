import { GoogleGenAI } from "@google/genai";
import { BirthDetails, VedicReport } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are an expert Vedic Astrologer. 
Provide a detailed Kundli analysis in JSON format. 
IMPORTANT: Your response must be a single, valid JSON object that matches the required structure (overview, placements, navamsa, analysis, yogas, career, relationships, health, dasha, transits, numerology, remedies).`;

export const generateAstrologyReport = async (details: BirthDetails): Promise<VedicReport> => {
  if (!API_KEY) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const result = await ai.models.generateContent({
      model: 'models/gemini-1.5-flash',
      contents: `Generate a full Vedic Astrology report for ${details.fullName}, born on ${details.dob} at ${details.tob} in ${details.pob}. 
      Focus on D1/D9 charts and give specific remedies. Return as valid JSON.`,
      config: {
        // Humne systemInstruction ko yahan hatakar prompt mein merge kar diya hai agar error aa raha ho
        responseMimeType: "application/json",
      }
    });

    const responseText = result.response.text();
    if (!responseText) throw new Error("No text returned");
    
    return JSON.parse(responseText) as VedicReport;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
