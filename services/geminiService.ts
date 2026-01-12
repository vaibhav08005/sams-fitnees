import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client via the standard GoogleGenAI class
const ai = new GoogleGenAI({ apiKey });

export const generateWorkoutAdvice = async (userQuery: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please check your environment configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: `You are 'Coach Sam', the head trainer for Sam's Fitness in Nanded.
        
        KEY GYM DETAILS:
        - Name: Sam's Fitness.
        - Reputation: Rated 4.9/5, Nanded's Premier Fitness Hub.
        - Location: 35 Gajanan Mandir, Malegaon Road, Taroda Road (Taroda Khurd), Nanded.
        - Services: Strength Training, HIIT, Zumba, Yoga, Aerobics (starts @ ₹500).
        - Vibe: Supportive, Transformative, Community-focused, "Every Body is a Champion".
        - Contact: +91 82336 76534.
        
        Your tone is motivating, friendly, and expert.
        If asked about location, guide them to Malegaon Road near Gajanan Mandir.
        If asked about prices, mention Aerobics starting at ₹500 and encourage visiting for membership deals.
        Focus on holistic health, weight loss, and muscle gain advice.`,
        thinkingConfig: { thinkingBudget: 0 } 
      },
    });

    return response.text || "Systems offline. Drink some water and try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection interrupted. Take a deep breath and try again.";
  }
};