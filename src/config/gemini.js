
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";


const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL ;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// const genAI = new GoogleGenerativeAI(API_KEY);
// const listModels = await genAI.getGenerativeModel({ model: MODEL_NAME });
// console.log(listModels);


async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  

  const generationConfig = {
    temperature: 0.9,
    topK: 40,
    topP: .95,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

    // async function debugModels() {
    //   const genAI = new GoogleGenerativeAI(API_KEY);
    //   // We use the 'v1' stable client to check permissions
    //   const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`);
    //   const data = await response.json();
    //   console.log("Your Available Models:", data.models.map(m => m.name));
    // }
    // debugModels();

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

 export default runChat;