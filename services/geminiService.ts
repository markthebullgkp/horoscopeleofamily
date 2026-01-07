
import { GoogleGenAI, Type } from "@google/genai";
import { BirthDetails, VedicReport } from "../types";

const SYSTEM_INSTRUCTION = `You are an expert Vedic Astrologer, trained in Classical Jyotish (Parashara, Jaimini principles).
Your goal is to provide a PRECISE and TRUSTWORTHY Birth Chart (Kundli) analysis using the Sidereal Zodiac and Lahiri Ayanamsa.

Core Requirements:
1. Provide a detailed analysis of the Rashi Chart (D1).
2. Provide a basic analysis of the Navamsa Chart (D9).
3. Explain how the D9 chart modifies or confirms D1 insights, specifically for marriage, relationships, and spiritual development.
4. Use the "Tree (D1) vs Fruit (D9)" analogy to explain their relationship.

Guidelines:
- Do NOT exaggerate results or create fear-based predictions.
- Avoid exact event timing.
- Use classical Vedic terminology (Lagna, Rashi, Bhava, Navamsa, etc.) with brief explanations.
- Predictions must be probabilistic.
- Remedies must be OPTIONAL and minimal.

Format your response as a valid JSON object matching the requested schema.`;

export const generateAstrologyReport = async (details: BirthDetails): Promise<VedicReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Generate a detailed Vedic Astrology report for:
  Name: ${details.fullName}
  DOB: ${details.dob}
  TOB: ${details.tob}
  POB: ${details.pob}
  
  Include:
  1. Full Rashi (D1) Analysis.
  2. Full Navamsa (D9) Analysis including planetary positions in D9.
  3. Relationship between D1 and D9.
  4. Life themes, Yogas, Dasha, Transits, and Numerology.
  
  Please provide the report in JSON format.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overview: {
            type: Type.OBJECT,
            properties: {
              lagna: { type: Type.STRING },
              moonSign: { type: Type.STRING },
              sunSign: { type: Type.STRING },
              dominantElement: { type: Type.STRING },
              dominantGuna: { type: Type.STRING },
            },
            required: ["lagna", "moonSign", "sunSign", "dominantElement", "dominantGuna"]
          },
          placements: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                planet: { type: Type.STRING },
                sign: { type: Type.STRING },
                house: { type: Type.NUMBER },
                nakshatra: { type: Type.STRING },
                strength: { type: Type.STRING },
              },
              required: ["planet", "sign", "house", "nakshatra", "strength"]
            }
          },
          navamsa: {
            type: Type.OBJECT,
            properties: {
              lagna: { type: Type.STRING },
              placements: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    planet: { type: Type.STRING },
                    sign: { type: Type.STRING },
                    house: { type: Type.NUMBER },
                    nakshatra: { type: Type.STRING },
                    strength: { type: Type.STRING },
                  }
                }
              },
              relationshipInsight: { type: Type.STRING },
              spiritualInsight: { type: Type.STRING },
              significanceExplanation: { type: Type.STRING },
            },
            required: ["lagna", "placements", "relationshipInsight", "spiritualInsight", "significanceExplanation"]
          },
          analysis: {
            type: Type.OBJECT,
            properties: {
              mind: { type: Type.STRING },
              intelligence: { type: Type.STRING },
              action: { type: Type.STRING },
              growth: { type: Type.STRING },
              discipline: { type: Type.STRING },
            },
            required: ["mind", "intelligence", "action", "growth", "discipline"]
          },
          yogas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                effect: { type: Type.STRING },
              }
            }
          },
          career: {
            type: Type.OBJECT,
            properties: {
              domains: { type: Type.ARRAY, items: { type: Type.STRING } },
              wealthTendencies: { type: Type.STRING },
            }
          },
          relationships: {
            type: Type.OBJECT,
            properties: {
              emotionalPatterns: { type: Type.STRING },
              marriageTendencies: { type: Type.STRING },
            }
          },
          health: {
            type: Type.OBJECT,
            properties: {
              sensitiveAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
              lifestyleGuidance: { type: Type.STRING },
            }
          },
          dasha: {
            type: Type.OBJECT,
            properties: {
              currentMahadasha: { type: Type.STRING },
              theme: { type: Type.STRING },
              focus: { type: Type.STRING },
            }
          },
          transits: {
            type: Type.OBJECT,
            properties: {
              influences: { type: Type.STRING },
              caution: { type: Type.STRING },
              opportunity: { type: Type.STRING },
            }
          },
          numerology: {
            type: Type.OBJECT,
            properties: {
              driver: { type: Type.NUMBER },
              conductor: { type: Type.NUMBER },
              traits: { type: Type.STRING },
            }
          },
          remedies: {
            type: Type.OBJECT,
            properties: {
              mantra: { type: Type.STRING },
              habit: { type: Type.STRING },
              charity: { type: Type.STRING },
              color: { type: Type.STRING },
              weekday: { type: Type.STRING },
            }
          }
        },
        required: ["overview", "placements", "navamsa", "analysis", "yogas", "career", "relationships", "health", "dasha", "transits", "numerology", "remedies"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  return JSON.parse(text) as VedicReport;
};
