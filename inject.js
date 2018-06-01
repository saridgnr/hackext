var options = {
    volume: false,
    invert: false,
    mouse: false,
    mono: false,
    cursor: false
};

chrome.tabs.onUpdated.addListener(function () {

    chrome.storage.sync.get(['volume'], function (result) {
        options.volume = result.volume;
    });
    chrome.storage.sync.get(['invert'], function (result) {
        options.invert = result.invert;
    });
    chrome.storage.sync.get(['monochrome'], function (result) {
        options.mono = result.monochrome;
        mono(null);
    });
    chrome.storage.sync.get(['mouse'], function (result) {
        options.mouse = result.mouse;
    });
    chrome.storage.sync.get(['cursorSize'], function (result) {
        options.cursor = result.cursorSize;
    });

    if (options.mono) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code: 'document.body.style.filter = "grayscale(100%)";' });

        });
    }

    if(options.cursor) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style = "cursor: url(http://www.rw-designer.com/cursor-view/97242-48.png),default;' });
    });}

    if (options.invert) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code: 'document.body.style.filter = "invert(100%)";' });

        });
    }

});
