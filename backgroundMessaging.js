//ловим сообщение
chrome.runtime.onMessage.addListener((request, sender, response) => {
    console.log(JSON.parse(request.data));
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //     chrome.tabs.sendMessage(tabs[0].id, { data: request.data });
    // });
    chrome.storage.local.set({ 'data': request.data });
});