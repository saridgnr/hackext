var fontSize = 1;
var isIverted = false;

$(document).ready(function(){
    let fontBigger = document.getElementById('format-size');
    let invertColors = document.getElementById('invert');
    fontBigger.onclick = function (element) {
        fontSize += 0.2;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code: 'document.body.style.fontSize = "' + fontSize + 'em ";' });

        });setProperty ("color", "green", "important");
    };

    invertColors.onclick = function(element){
        if(!isIverted) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.filter = "invert(100%)";' });
    
            });

            isIverted = true;
        }
        else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.filter = "invert(0%)";' });
    
            });

            isIverted = false;
        }
    };
});

let profileBtn = document.getElementById('profile');

profileBtn.onclick = function(){
    let color = "#F0F8FF"; 
    chrome.tabs.create({url: "chrome-extension://ibnnncllgjfgllpeajodbdkfiajdgaod/options.html"});
  };