var options = {
  volume: false, 
  invert: false, 
  mouse: false,
  mono: false,
  cursor: false
};

chrome.storage.sync.get(['volume', 'invert', 'monochrome', 'mouse', 'cursorSize'], function(result){
  options.volume = result.volume;
  options.invert = result.invert;
  options.mono = result.monochrome;
  options.mouse = result.mouse;
  options.cursor = result.cursorSize;
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      //pageUrl: {hostEquals: 'developer.chrome.com'},
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});

