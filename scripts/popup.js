function getElement(selector) {
    return document.querySelector(selector);
}

const list = getElement(".list");

const data = chrome.storage.local.get("data", (data) => {
    console.log(data);
    console.log(JSON.parse(data.data));
    const response = JSON.parse(data.data);
    if (!response.results) {
        const message = document.createElement('p')
        message.innerHTML = 'no results...'
        list.append(message)
        return;
    }
    const items = response.results;
    let itemsCount = 0;
    console.log(items);
    for (let item of items) {
        const itemElement = document.createElement("li");
        const itemWrapper = document.createElement("a");
        const imageWrapper = document.createElement("div");
        const contentWrapper = document.createElement("div");
        //const imageElement = document.createElement("img");
        const title = document.createElement("h4");
        const year = document.createElement("h5");

        imageWrapper.className = "list-item__img";
        imageWrapper.style.backgroundImage = `url(${
      item.image ? item.image.url : "../i/no-img.png"
    }`;
        contentWrapper.className = "list-item__content";
        itemWrapper.setAttribute("target", "_blank");
        itemWrapper.setAttribute("href", `https://www.imdb.com${item.id}`);
        title.innerHTML = item.title;
        year.innerHTML = item.year;
        // imageElement.setAttribute(
        //     "src",
        //     item.image ? item.image.url : "../i/no-img.png"
        // );

        //imageWrapper.append(imageElement);
        contentWrapper.append(title);
        contentWrapper.append(year);
        itemWrapper.append(imageWrapper);
        itemWrapper.append(contentWrapper);
        itemElement.append(itemWrapper);

        list.append(itemElement);
        if (++itemsCount > 7) break;
        //list.append();
    }
});