chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getTabs") {
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
            sendResponse({ tabs: tabs });
        });
        return true;
    }
});
