//components
import Item from "./components/item.js";
import Message from "./components/message.js";
//variables
import VARIABLES from "./variables.js";

const [list] = document.getElementsByClassName("list");

chrome.storage.local.get("data", ({ data }) => {
    const response = JSON.parse(data);

    //if movies are found
    if (!response.length) {
        list.append(Message("no results..."));
        return;
    }
    const items = response.slice(0, 20);

    const headers = {
        "x-rapidapi-host": VARIABLES.API_HOST,
        "x-rapidapi-key": VARIABLES.API_KEY,
    };

    //makes request for each movie
    items.map((item) => {
        fetch(`${VARIABLES.URL_SEARCH_BY_ID + item.imdb_id}/`, { headers })
            .then((response) => response.json())
            .then((data) => list.append(Item(data.results)));
    });
});