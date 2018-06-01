var fontSize = 1;
var options = {
    volume: false, 
    invert: false, 
    mouse: false,
    mono: false,
    cursor: false
};

$(document).ready(function () {
    // chrome.storage.sync.get(['volume'], function(result){
    //     options.volume = result.volume;
    // });
    // chrome.storage.sync.get(['invert'], function(result){
    //     options.invert = result.invert;
    // });
    // chrome.storage.sync.get(['monochrome'], function(result){
    //     options.mono = result.monochrome;
    //     mono(null);
    // });
    // chrome.storage.sync.get(['mouse'], function(result){
    //     options.mouse = result.mouse;
    // });
    // chrome.storage.sync.get(['cursorSize'], function(result){
    //     options.cursor = result.cursorSize;
    // });
    
    let fontBigger = document.getElementById('format-size-in');
    let fontSmaller = document.getElementById('format-size-out');
    let invertColors = document.getElementById('invert');
    let monochrome = document.getElementById('monochrome');
    let profileBtn = document.getElementById('profile');
    // Toggles the descrition for the extension's buttons on and off
    function toggleDesc() {
        let x = document.getElementById("description");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    // The descriptions for eah of the buttons in the extension 
    const descriptions = {
        textSizeMessage: "Change the size of the text according to your selection",
        ReadContentMessage: "Get your auditory output devices to read the highlighted text",
        invertColorsMessage: "Invert the colors to see the sites better",
        profileMessage: "Define your personal profile of all our available features",
        informationMessage: "Get all of the neccessary information about our extension",
        mouseVibrationMessage: "Get your mouse to vibrate with the arduino component" +
            " whenever you mouse over a clickable object"

    };

    function displayInfo(messageName) {
        let displayedTextBox = document.getElementById("info_text");
        displayedTextBox.innerText = descriptions[messageName];
    }

    function deleteDescriptiion() {
        let displayedTextBox = document.getElementById("info_text");
        displayedTextBox.innerText = "Hover for description!";
    }

    (function initiatePopupButtonDescriptions() {
        let formatSize = document.getElementById('format-size-in');
        let volume = document.getElementById('volume');
        let invert = document.getElementById('invert');
        let profile = document.getElementById('profile');
        let mouse = document.getElementById('mouse');
        let info = document.getElementById('info');

        formatSize.onmouseenter = (function () { displayInfo('textSizeMessage') });
        volume.onmouseenter = (function () { displayInfo('ReadContentMessage') });
        invert.onmouseenter = (function () { displayInfo('invertColorsMessage') });
        profile.onmouseenter = (function () { displayInfo('profileMessage') });
        mouse.onmouseenter = (function () { displayInfo('mouseVibrationMessage') });
        info.onmouseenter = (function () { displayInfo('informationMessage') });

        formatSize.onmouseleave = (function () { deleteDescriptiion() });
        volume.onmouseleave = (function () { deleteDescriptiion() });
        invert.onmouseleave = (function () { deleteDescriptiion() });
        profile.onmouseleave = (function () { deleteDescriptiion() });
        mouse.onmouseleave = (function () { deleteDescriptiion() });
        info.onmouseleave = (function () { deleteDescriptiion() });

        info.onclick = function () { toggleDesc() };
    })();


    fontBigger.onclick = function (element) {
        fontSize += 0.2;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code: 'document.body.style.fontSize = "' + fontSize + 'em ";' });

        });
    };

    fontSmaller.onclick = function (element) {
        fontSize -= 0.2;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code: 'document.body.style.fontSize = "' + fontSize + 'em ";' });

        });
    };

    profileBtn.onclick = function (element) {
        let color = "#F0F8FF";
        //chrome.tabs.create({ url: "chrome-extension://ibnnncllgjfgllpeajodbdkfiajdgaod/options.html" });
        chrome.tabs.create({ 'url': "/options.html" });
    };

    invertColors.onclick = function (element) {
        if (!options.invert) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.filter = "invert(100%)";' });

            });

            options.invert = true;
        }
        else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.filter = "invert(0%)";' });

            });

            options.invert = false;
        }
    };


    monochrome.onclick = function (element) {
        mono(element);
    };

    function mono(element){
        if (options.mono) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.filter = "grayscale(100%)";' });

            });

            options.mono = false;
        }
        else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.filter = "grayscale(0%)";' });

            });

            options.mono = true;
        }
    }
});

let mouseBigger = document.getElementById('cursorbtn');
let isMouseBig = false;
mouseBigger.onclick = function() {
    if(isMouseBig) {
        isMouseBig = false;
    } else {
        isMouseBig = true;
    }
}