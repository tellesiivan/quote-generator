const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const skeletonLoad = document.getElementById("placeholder-item");

let apiQuotes = [];

// show new quote
function newQuote() {
  skeleton();
  // pick random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // quote author
  authorText.textContent = quote.author ? quote.author : "unknown";
  // quote length
  quote.text.length >= 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  // set quote / hide skeleton
  quoteText.textContent = quote.text;
  skeletonComplete();
}

// get quotes frpm API
(async function getQuotes() {
  skeleton();
  const apiURL = `https://type.fit/api/quotes`;
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
})();

// tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank"); // open in new tab
}
// loader | skeleton
function skeleton() {
  skeletonLoad.style.display = "flex";
  quoteContainer.style.display = "none";
}
// loader | skeleton
function skeletonComplete() {
  quoteContainer.style.display = "block";
  skeletonLoad.style.display = "none";
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
