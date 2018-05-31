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

let infoElem = document.getElementById('info');

// infoElem.onclick = function () {
//     let test = chrome.tabs.getCurrent(function () {
//         alertify.alert('Ready!');
//     });
//     console.log(test);
// };
