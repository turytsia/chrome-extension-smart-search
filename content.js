window.addEventListener("mouseup", selectionHandler);

function selectionHandler() {
    const selection = window.getSelection().toString();
    if (selection.trim().length) {
        requestData(selection);
    }
}

function requestData(search) {
    const URL = `${VARIABLES.URL_SEARCH}/${search}/`; //`https://data-imdb1.p.rapidapi.com/movie/id/tt0086250/`;
    const HEADERS = {
        "x-rapidapi-key": VARIABLES.API_KEY,
        "x-rapidapi-host": VARIABLES.HOST,
    };

    fetch(URL, {
            method: "GET",
            headers: HEADERS,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            chrome.runtime.sendMessage({ data: data.results });
        });
}

const VARIABLES = {
    URL_SEARCH: 'https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle',
    HOST: "data-imdb1.p.rapidapi.com",
    API_KEY: "87e8559442mshbf9de432bb5b1cfp191e31jsnf3bfe3fa5aac",
};

// const CONNECTIONS = {
//     description: "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext&exintro&titles=John%20Wick",
//     images: "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext&exintro&titles=John%20Wick",
// };