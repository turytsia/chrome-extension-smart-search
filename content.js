window.addEventListener("mouseup", selectionHandler);

function selectionHandler() {
    const selection = window.getSelection().toString();
    if (selection.trim().length) {
        requestData(selection);
    }
}

function requestData(search) {

    const URL = `https://imdb8.p.rapidapi.com/title/find?q=${search}`;
    const HEADERS = {
        "x-rapidapi-key": variables.API_KEY,
        "x-rapidapi-host": variables.HOST,
    };

    fetch(URL, {
            method: "GET",
            headers: HEADERS,
        })
        .then((response) => response.json())
        .then((data) => {
            chrome.runtime.sendMessage({ data });
        });

    //'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="The Shawshank Redemption (1994)"';
}

const variables = {
    API_KEY: "73ed7cc5b0msh81ba37d7896b5b7p193b56jsn76e4d2251350",
    HOST: "imdb8.p.rapidapi.com"
}