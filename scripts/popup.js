var fontSize = 1;
var isIverted = false;
var accessibility = [
    {
        options: {
            formatsize: true,
            volume: false, 
            invert: false, 
            mousevibration: true,
            monochrome: false
        }
    },
    {
        options: {
            formatsize: false,
            volume: true, 
            invert: false, 
            mousevibration: true,
            monochrome: false
        }
    },
    {
        options: {
            formatsize: false,
            volume: false, 
            invert: false, 
            mousevibration: false,
            monochrome: true
        }
    },
]

const descriptions = {
    textSizeMessage: "Change the size of the text according to your selection",
    ReadContentMessage: "Get your auditory output devices o read the highlighted text",
    invertColorsMessage: "Invert the colors to seethe sites better",
    profileMessage: "Define your personal profile of all our available features",
    informationMessage: "Get all of the neccessary information about our extension",
    mouseVibrationMessage: "Get your mouse to vibrate with the arduino component" +
                           " whenever you mouse over a clickable object"
                           
  };

function displayInfo(messageName) {
    let displayedTextBox = document.getElementById("info_text");
    displayedTextBox.innerText = descriptions[messageName];
}

(function initiateOnHovers() {
    let formatSize = document.getElementById('format-size');
    let volume = document.getElementById('volume');
    let invert = document.getElementById('invert');
    let profile = document.getElementById('profile');
    let mouse = document.getElementById('mouse');
    let info = document.getElementById('info');

    formatSize.onmouseenter = (function() {displayInfo('textSizeMessage')});
    volume.onmouseenter = (function() {displayInfo('ReadContentMessage')});
    invert.onmouseenter = (function() {displayInfo('invertColorsMessage')});
    profile.onmouseenter = (function() {displayInfo('profileMessage')});
    mouse.onmouseenter = (function() {displayInfo('mouseVibrationMessage')});
    info.onmouseenter = (function() {displayInfo('informationMessage')});
})();

$(document).ready(function(){
    let fontBigger = document.getElementById('format-size');
    let invertColors = document.getElementById('invert');
    fontBigger.onclick = function (element) {
        fontSize += 0.2;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code: 'document.body.style.fontSize = "' + fontSize + 'em ";' });

        });
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