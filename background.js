// This checks if on youtube and if so sends message so contentScript would know to run

// If tab is updated, check if the url has the "youtube.com/watch" in it
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtbe.com/watch")) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParameters.get("v")
        })
    }
})