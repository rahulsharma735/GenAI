import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AIzaSyCwkUC2ozq-_OUWvfE7x5jneUis1TgLzAI"});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
        {
            role:'user',
            parts:[{text:"What is My Name"}]
        },

        {
            role:'model',
            parts: [{text:"I dont know your name yet! As an AI, I dont have access to your personal information or identity unless you tell me"}]
        },
        {
            role:'user',
            parts:[{text:"My name is Rahul"}]
        },
        {
            role:'model',
            parts:[{text:"Nice to meet you, Rahul! How can I help you today?"}]
        },
        {
            role:'user',
            parts:[{text:"What is My Name"}]
        },
        {
            role:'model',
            parts:[{text:"Your name is **Rahul**! How can I help you with anything else?"}]
        },
        {
            role:'user',
            parts:[{text:"What is My Name"}]
        }
        
        

    ],
  });
  console.log(response.text);
}

await main();

//readline sync 
// history ko kese automation 
// chatbot: in next class