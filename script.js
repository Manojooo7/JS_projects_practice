// dom selection
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterButton = document.getElementById('twitter')
const newQuoteButton = document.getElementById('new-quote')
const loader = document.getElementById('loader');


// Get quotes from API
let apiQuotes = [];

// loading Spinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote

function newQuote() {
    showLoadingSpinner()
    //pick a random quote

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    authorText.textContent = !quote.author ? 'unknown' : quote.author;

    // reducing the font size if the quote text content is greater the 120 
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // set quote , hide loader
    quoteText.textContent = quote.text
    removeLoadingSpinner()
}

async function getQuotes() {
    showLoadingSpinner()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {
        // catch error Here
    }
}

// tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listener

newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote)


// On load

getQuotes()