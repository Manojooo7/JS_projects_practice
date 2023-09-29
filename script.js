// Get quotes from API
let apiQuotes = [];

//show new quote

function newQuote(){
    //pick a random quote

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote);
}

async function getQuotes(){
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const respons = await fetch(apiUrl)
        apiQuotes = await respons.json();
        newQuote()
    }catch (error){
        // cathc error Here
    }
}



// On load

getQuotes()