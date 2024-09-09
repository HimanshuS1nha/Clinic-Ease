import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});
 
export const generate = async (type, data) => {
  try {
    let prompt = "";

    if (type === "medicine") {
      prompt = `Extract the names of medicines and their respective dosages from the following text. Return the result in the JSON format as [{"medicine": "medicine_name", "dosage": "dosage_value"}]. Here is the text: ${data}`;
    } else if (type === "tests") {
      prompt = `Extract the names of medical tests mentioned in the following text. Return the result in JSON format as [{"test": "test_name"}]. Here is the text: ${data}`;
    }

    const result = await geminiModel.generateContent(prompt);
    console.log(result);
    const response = result.response;
    console.log(response.text());
  } catch (error) {
    console.log("response error", error);
  }
};
