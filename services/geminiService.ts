import { GoogleGenerativeAI } from "@google/genai"; // लाइब्रेरी को अपडेट किया
import { BirthDetails, VedicReport } from "../types";

// Vite में Environment variables को एक्सेस करने का सही तरीका
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are an expert Vedic Astrologer, trained in Classical Jyotish (Parashara, Jaimini principles).
Your goal is to provide a PRECISE and TRUSTWORTHY Birth Chart (Kundli) analysis using the Sidereal Zodiac and Lahiri Ayanamsa.

Core Requirements:
1. Provide a detailed analysis of the Rashi Chart (D1) and Navamsa Chart (D9).
2. Explain the interplay between D1 and D9 for relationships and spiritual growth.
3. Identify specific planetary afflictions (combustion, debilitation, difficult aspects) and provide targeted, minimal remedies.
4. Remedies must be non-superstitious, ethical, and focus on habit shifts, charity, or simple mindfulness practices.
5. Maintain a compassionate, empowering tone. Emphasize that remedies are optional tools for self-alignment.

Format your response as a valid JSON object matching the requested schema.`;

// Initialize Google AI
const genAI = new GoogleGenerativeAI(API_KEY || "");

export const generateAstrologyReport = async (details: BirthDetails): Promise<VedicReport> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing. Please set it in Netlify environment variables.");
  }

  // Model initialization with system instructions
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", // मॉडल नाम को स्टेबल वर्जन पर अपडेट किया
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `Generate a detailed Vedic Astrology report for:
  Name: ${details.fullName}
  DOB: ${details.dob}
  TOB: ${details.tob}
  POB: ${details.pob}
  
  Special Focus:
  - Analyze planetary strengths in both D1 and D9.
  - Look for specific afflictions (e.g., afflicted Moon, weak Lagna Lord, combust Mercury).
  - Propose personalized remedies that address these specific findings.
  
  Please provide the report in JSON format matching the schema provided in system instructions.`;

  try {
    // Generate content using the SDK
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text) as VedicReport;
  } catch (error) {
    console.error("Error in generateAstrologyReport:", error);
    throw error;
  }
};
