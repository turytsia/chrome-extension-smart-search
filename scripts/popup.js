function getElement(selector) {
    return document.querySelector(selector);
}

function createMessage(message) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = message;
    list.append(messageElement);
}

function changeControllerHandler() {
    console.log(window.localStorage.getItem("controller_checked"));
    window.localStorage.setItem("controller_checked", controller.checked);
}

const list = getElement(".list");
const controller = getElement("#switch");

controller.checked =
    window.localStorage.getItem("controller_checked") === "true";

let itemsCount = 0;
const itemsMaxCount = 7

controller.addEventListener("change", changeControllerHandler);

if (controller.checked) {
    chrome.storage.local.get("data", ({ data }) => {
        const response = JSON.parse(data);
        if (!response.results) {
            createMessage("no results...");
            return;
        }
        const items = response.results;

        for (let item of items) {
            const itemElement = document.createElement("li");
            const itemWrapper = document.createElement("a");
            const imageWrapper = document.createElement("div");
            const contentWrapper = document.createElement("div");
            const title = document.createElement("h4");
            const year = document.createElement("h5");
            //set classes
            imageWrapper.className = "list-item__img";
            contentWrapper.className = "list-item__content";
            //set attributes
            itemWrapper.setAttribute("target", "_blank");
            itemWrapper.setAttribute("href", `https://www.imdb.com${item.id}`);
            //set styling
            imageWrapper.style.backgroundImage = `url(${
        item.image ? item.image.url : "../i/no-img.png"
      }`;
            //set values
            title.innerHTML = item.title;
            year.innerHTML = item.year;

            contentWrapper.append(title);
            contentWrapper.append(year);
            itemWrapper.append(imageWrapper);
            itemWrapper.append(contentWrapper);
            itemElement.append(itemWrapper);
            list.append(itemElement);

            if (++itemsCount > itemsMaxCount) break;
        }
    });
} else {
    createMessage("Switch on an extension.");
}