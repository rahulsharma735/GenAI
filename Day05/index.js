
import { FunctionResponse, FunctionResponsePart, GoogleGenAI, Type } from '@google/genai';


import readlineSync from "readline-sync"
import 'dotenv/config'
// Configure the client
const ai = new GoogleGenAI({});


//Crypto currency tool
async function cryptoCurrency({coin}) {
    const resposne = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}`);
    const data = await resposne.json();

    // console.log(data);
    return data;
}

// weather tool
async function weatherInformation({city}) {
    const resposne = await fetch(`http://api.weatherapi.com/v1/current.json?key=20a6c61e296d420f836183556251309&q=${city}&aqi=no`);

    const data =await resposne.json();

    return data;
}


//cryptocurrency wale ki information dunga
const cryptoInfo = {
    name: "cryptoCurrency",
    description: "We can give you the current priceor other information releated  to cryptocurrency like bitcoin and ethereum etc",

    parameters: {
        type : Type.OBJECT,
        properties: {
            coin:{
                type:Type.STRING,
                description: "It will be the name of the cryptocurrency like bitcoin, ethereum"
            }
            // curr:{
            //     type: Type.STRING,
            //     description: "It will be the name of the real currency like inr, usd etc, if user didn't mention about any country, default value will be INR"
            // }

        },
        required: ['coin']
        
    }
}

//weather wale ki information dunga
const weatherInfo = {
    name: "weatherInformation",
    description : "You can get the current weather information of any city like london, goa etc",
    parameters:{
        type:Type.OBJECT,
        properties:{
            city : {
                type:Type.STRING,
                description: "Name of the city for which i have to fatch weather information like london and goa etc"
            }
        },
        required: ['city']
    }
}

// const tools = [{
//     functionDeclarations: [cryptoInfo,weatherInfo]
// }]

const tools = [{
       functionDeclarations: [cryptoInfo, weatherInfo]
}];




const toolFunctions = {
    "cryptoCurrency": cryptoCurrency,
    "weatherInformation" : weatherInformation
}

const History = [];


async function runAgent() {


    while(true){

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: History,
            config: { tools },
        });

        if(result.functionCalls && result.functionCalls.length > 0){
            const functionCall = result.functionCalls[0];

            const {name, args} = functionCall;


            // here we use manny but is we have 1000 function in that consition if use
            // if(name == 'cryptoCurrency'){
            //     const resposne = await cryptoCurrency(args);
            // }
            // else if(name == 'weatherInformation'){
            //     const resposne = await weatherInformation(args);
            // }

            const response = await toolFunctions[name](args); 

            const functionResponsePart = {
                name: functionCall.name,
                response:{
                    result: response,
                },
            };

            // History me data dalana in the array format
                History.push({
                    role: "model",
                    parts: [{functionCall: functionCall}],
                });

                History.push({
                    role: 'user',
                    parts: [{functionResponse: functionResponsePart}]
                })

        }
        else{
            History.push({
                role:'model',
                parts: [{text:result.text}]
            });
            console.log(result.text);
            break;
        }
    }
}



while(true){

    const question = readlineSync.question('Ask me anything: ');

    if(question == 'exit') break;

    History.push({
        role:'user',
        parts: [{text:question}],
    });

    await runAgent();

}