function getElements(...args) {
    return args.map((selector) => document.querySelector(selector));
}

function createElements(...args) {
    return args.map((element) => document.createElement(element));
}

//creates message inside list for the user
function createMessage(message) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = message;
    list.append(messageElement);
}

//saves checkbox state
function saveCheckboxState() {
    window.localStorage.setItem("controller_checked", controller.checked);
}

//returns saved state
function getCheckboxState() {
    return window.localStorage.getItem("controller_checked") === "true";
}

const [list, controller] = getElements(".list", "#switch");

controller.checked = getCheckboxState();

controller.addEventListener("change", saveCheckboxState);

function createList() {
    chrome.storage.local.get("data", ({ data }) => {
        const response = JSON.parse(data);

        if (!response.results) {
            return createMessage("no results...");
        }
        const items = response.results;

        for (let item of items) {
            const [
                itemElement,
                itemWrapper,
                imageWrapper,
                contentWrapper,
                title,
                year,
            ] = createElements("li", "a", "div", "div", "h4", "h5");

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

            console.log(item);
            //set values
            title.innerHTML = item.title ?? item.name;
            year.innerHTML = item.year ?? "Actor";

            contentWrapper.append(title);
            contentWrapper.append(year);
            itemWrapper.append(imageWrapper);
            itemWrapper.append(contentWrapper);
            itemElement.append(itemWrapper);
            list.append(itemElement);
        }
    });
}

if (controller.checked) {
    createList();
} else {
    createMessage("Switch on an extension.");
}
