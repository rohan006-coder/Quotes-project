const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []
//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;

}
// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    if(!quote.author){
        authorText.textContent="Unknown";  
    }else{
        authorText.textContent="quote.author";
    }
    if(quote.text.length>120){
        quote.text.classList.add('long-quote');
    }else{
        quote.text.classList.remove('long-quote');
    }
    // Set Qoute, Hide Loader 
   quoteText.textContent = quote.text;
   complete();

}

// Function to fetch Quote data
 async function getquote() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
    const responce = await fetch(apiUrl);
    apiQuotes = await responce.json();
    newQuote();
    }catch (error) {

    }
 }

 // Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
