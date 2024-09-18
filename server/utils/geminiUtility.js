import { GoogleGenerativeAI } from "@google/generative-ai";
const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);


const geminiConfig = {
  temperature: 0.4,
  topP: 1,
  topK: 32,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  geminiConfig,
});

// export const generate = async (imageFile, type) => {
//   try {
//     const imageBase64 = imageFile.buffer.toString('base64');
//     const promptConfig = [
//       { text: `Extract the names of medicines and their respective dosages from the following image. Return the result in the JSON format as [{"medicine": "medicine_name", "dosage": "dosage_value"}]` },
//       {
//         inlineData: {
//           mimeType: imageFile.mimetype,
//           data: imageBase64,
//         },
//       },
//     ];

//     const result = await geminiModel.generateContent({
//       contents: [{ role: "user", parts: promptConfig }],
//     });
//     const response = result.response;
//     const textResult=  response.text()
//     const jsonData = JSON.parse(textResult);

//     return jsonData;
//   } catch (error) {
//     console.log("Response error:", error);
//   }
// };

export const generate = async (imageFile, type) => {
  try {
    const imageBase64 = imageFile.buffer.toString('base64');

    let promptConfig;
    if (type === "prescription") {
      promptConfig = [
        {
          text: `Extract the names of medicines and their respective dosages from the following image. Return the result in the JSON format as [{"medicine": "medicine_name", "dosage": "dosage_value"}]`
        },
        {
          inlineData: {
            mimeType: imageFile.mimetype,
            data: imageBase64,
          },
        },
      ];
    } else if (type === "tests") {
      promptConfig = [
        {
          text: `Extract the test name, date, result, and lab name from the following image. Return the result in JSON format as [{"testName": "test_name", "testDate": "test_date", "result": "result_value", "labName": "lab_name"}]`
        },
        {
          inlineData: {
            mimeType: imageFile.mimetype,
            data: imageBase64,
          },
        },
      ];
    } else {
      throw new Error("Invalid type. Type must be either 'prescription' or 'tests'.");
    }

    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: promptConfig }],
    });

    const response = result.response;
    const textResult = response.text();
    const jsonData = JSON.parse(textResult);

    return jsonData;

  } catch (error) {
    console.log("Response error:", error);
    return { error: error.message };
  }
};

