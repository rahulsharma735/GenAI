import readlineSync from 'readline-sync';

async function get_crypto_price(coin) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}`);
    const data = await response.json();

    console.log(data);
}

async function getWeater(city) {
    
}

async function news(topic) {
    
}

const question = readlineSync.question("Ask me about Crypto : ")

get_crypto_price(question);