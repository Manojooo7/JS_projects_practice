// dom selection
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterButton = document.getElementById('twitter')
const newQuoteButton = document.getElementById('new-quote')

// Get quotes from API
let apiQuotes = [];

//show new quote

function newQuote(){
    //pick a random quote

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    authorText.textContent = !quote.author ? 'unknown' : quote.author;

    // reducing the font size if the quote text content is greater the 120 
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text
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

// tweet quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listner

newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote)


// On load

getQuotes()