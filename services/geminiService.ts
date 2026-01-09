import { GoogleGenAI } from "@google/genai";
import { BirthDetails, VedicReport } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

export const generateAstrologyReport = async (details: BirthDetails): Promise<VedicReport> => {
  if (!API_KEY) throw new Error("API Key is missing!");

  // Initialize the AI
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    // 1. Model ka naam sirf 'gemini-1.5-flash' rakhein (bina models/ ke)
    // 2. Agar ye kaam na kare, toh niche variant try karenge
    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash', 
      contents: `Generate a full Vedic Astrology report for ${details.fullName}, born on ${details.dob} at ${details.tob} in ${details.pob}. 
      Return the data in a strict JSON format with fields: overview, placements, navamsa, analysis, yogas, career, relationships, health, dasha, transits, numerology, remedies.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = result.response.text();
    if (!text) throw new Error("No data received from AI");
    
    return JSON.parse(text) as VedicReport;
  } catch (error: any) {
    console.error("API Error Details:", error);
    
    // Agar 404 aata hai, toh ek fallback model try karte hain
    if (error.message?.includes('404')) {
        console.log("Retrying with fallback model...");
        // Yahan aap 'gemini-pro' try kar sakte hain
    }
    throw error;
  }
};
