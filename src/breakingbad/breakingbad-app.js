/**
 * @returns {Promise<Object>} quote information
 */
const fetchQuote = async () => {
  const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
  const data = await res.json();
  console.log(data[0]);
  return data[0];
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async (element) => {
  document.querySelector('#app-tittle').innerHTML = 'Breaking Bad App';
  element.innerHTML = 'Loading...';
  // await fetchQuote();
  const quoteLable = document.createElement('blockquote');
  const authLable = document.createElement('h3');
  const nextButton = document.createElement('button');
  nextButton.innerHTML = 'Next Quote';

  const renderQuote = (quote) => {
    quoteLable.innerHTML = quote.quote;
    authLable.innerHTML = quote.author;
    element.replaceChildren(quoteLable, authLable, nextButton);
  }

  //events

  nextButton.addEventListener('click', async() => {
    element.innerHTML = 'Loading...';
    await fetchQuote().then(renderQuote);
  });

  fetchQuote().then(renderQuote);
}

