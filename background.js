chrome.runtime.onMessage.addListener((request, sender, response) => {
    chrome.storage.local.set({ 'data': JSON.stringify(request.data) });
});