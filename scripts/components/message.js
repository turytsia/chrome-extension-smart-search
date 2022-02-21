export default function createMessage(message) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = message;
    return messageElement
}