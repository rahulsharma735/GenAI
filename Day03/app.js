import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import readlineSync from 'readline-sync'

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});


async function main() {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    history: [],

    // config:{
    //   systemInstruction: `You are a Coding tutor,
    //   Strict Rule to Follow 
    //   - You will only answer the question which is releated to DSA
    //   - Do not answer anything which is not releated to coding
    //   - Reply rudely to user if they ask question which is not releated to Coding
    //   Ex. You dumb, only ask question releated to coding`
    // },
  });

  while(true){
    const question = readlineSync.question("Ask me Question : ");

    if(question == 'exit')
      break;

    const response = await chat.sendMessage({
      message: question
    })

    console.log("Response: ", response.text);
  }
}

await main();

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     config:{
//         systemInstruction: `Current user name is Rahul Sharma, Today Date is ${new Date()}`
//     },
//     contents: "WHAT IS CURRENT DATE ?",
//   });
//   console.log(response.text);
// }

// main();