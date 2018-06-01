var fontSize = 1;
var isIverted = false;
var isMonochrome = false;

$(document).ready(function () {
    // Toggles the descrition for the extension's buttons on and off
    function toggleDesc() {
        var x = document.getElementById("description");
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

    function deleteDescriptiion() {
        let displayedTextBox = document.getElementById("info_text");
        displayedTextBox.innerText = "Hover over the buttons to see what they do.\n Descriptions will appear here.";
    }

    (function initiatePopupButtonDescriptions() {
        let formatSize = document.getElementById('format-size');
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

    $(document).ready(function () {
        let fontBigger = document.getElementById('format-size');
        let invertColors = document.getElementById('invert');
        let monochrome = document.getElementById('monochrome');

        fontBigger.onclick = function (element) {
            fontSize += 0.2;
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.fontSize = "' + fontSize + 'em ";' });

            });
        };

        invertColors.onclick = function (element) {
            if (!isIverted) {
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


        monochrome.onclick = function (element) {
            if (!isMonochrome) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.executeScript(
                        tabs[0].id,
                        { code: 'document.body.style.filter = "grayscale(100%)";' });

                });

                isMonochrome = true;
            }
            else {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.executeScript(
                        tabs[0].id,
                        { code: 'document.body.style.filter = "grayscale(0%)";' });

                });

                isMonochrome = false;
            }
        };


        profileBtn.onclick = function () {
            let color = "#F0F8FF";
            chrome.tabs.create({ url: "chrome-extension://ibnnncllgjfgllpeajodbdkfiajdgaod/options.html" });
        };
    });


      //alertify.alert('Ready!');


// // let changeColor = document.getElementById('changeColor');

// // chrome.storage.sync.get('color', function(data) {
// //   changeColor.style.backgroundColor = data.color;
// //   changeColor.setAttribute('value', data.color);
// // });

// // changeColor.onclick = function(element) {
// //   let color = element.target.value;
// //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// //     chrome.tabs.executeScript(
// //         tabs[0].id,
// //         {code: 'document.body.style.backgroundColor = "' + color + '";'});
// //   });
// // };


// let fontBigger = document.getElementById('format-size');

// chrome.storage.sync.get('fontScale', function(data){    
//     fontSize = data.fontScale;
//   });


// fontBigger.onclick = function (element) {
//     changeFontSize();
//     alert(fontSize);
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             { code: 'document.body.style.fontSize = "' + fontSize + 'em"; alert(' + fontSize + ')' });

//     });
// };

// function changeFontSize() {
//     fontSize += 0.2
// }


// alertify.defaults = {
//     autoReset: true,
//     basic: false,
//     closable: true,
//     closableByDimmer: true,
//     frameless: false,
//     maintainFocus: true, // <== global default not per instance, applies to all dialogs
//     maximizable: false,
//     modal: true,
//     movable: false,
//     moveBounded: false,
//     overflow: true,
//     padding: true,
//     pinnable: true,
//     pinned: true,
//     preventBodyShift: false, // <== global default not per instance, applies to all dialogs
//     resizable: false,
//     startMaximized: false,
//     transition: 'pulse',
//     notifier: {
//         // auto-dismiss wait time (in seconds)  
//         delay: 15,
//         // default position
//         position: 'bottom-right',
//         // adds a close button to notifier messages
//         closeButton: true
//     },
//     // language resources 
//     glossary: {
//         title: 'Rampa - Accessability',
//         ok: 'OK',
//         cancel: 'Cancel'
//     },
//     // theme settings
//     theme: {
//         // class name attached to prompt dialog input textbox.
//         input: 'ajs-input',
//         // class name attached to ok button
//         ok: 'ajs-ok',
//         // class name attached to cancel button 
//         cancel: 'ajs-cancel'
//     }
// };

// let infoElem = document.getElementById('info');
