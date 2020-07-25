const quoteContainer = document.getElementById('quote-container');
const quoteText  = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide Loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;    }
}
// Get quote From API
async function getQuote(params) {
    loading();
     const proxyUrl = 'https://pure-forest-04198.herokuapp.com/'
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // if Author is Blank, add 'Unknown'
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Uknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
    //   Reduce font size for long quote
    if(data.quoteText.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
       quoteText.innerText = data.quoteText;
        // stop loader, show quote
    complete();
    }

   
    catch (error){
        getQuote();
       
    }
    
}
// Tweet Quote
function tweetQuote(params) {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');

    
}
// Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote)


// on Load
// getQuote();
