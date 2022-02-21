export default function Item(data) {
    const itemElement = document.createElement('li')
    const itemWrapper = document.createElement('a')
    const imageWrapper = document.createElement('div')
    const contentWrapper = document.createElement('div')
    const title = document.createElement('h4')
    const year = document.createElement('h5')

    //set attributes
    itemWrapper.setAttribute("target", "_blank");
    itemWrapper.setAttribute("href", `https://www.imdb.com/title/${data.imdb_id}`);
    //set styling
    imageWrapper.style.backgroundImage = `url(${data.image_url}`;
    imageWrapper.classList.add("img")

    //set values
    title.innerHTML = data.title;
    year.innerHTML = data.created_at;

    contentWrapper.append(title);
    contentWrapper.append(year);
    itemWrapper.append(imageWrapper);
    itemWrapper.append(contentWrapper);
    itemElement.append(itemWrapper);

    return itemElement;
}