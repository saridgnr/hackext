var fontSize = 1;
var options = {
    info: true,
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
    let mouse = document.getElementById('mouse');
    let volume = document.getElementById('volume');
    let info = document.getElementById('info');
    let cursor = document.getElementById('cursorbtn');

    let displayedTextBox = document.getElementById("info_text");

    findActiveButtons();

    function findActiveButtons(){
        if(options.info){
            info.classList.add('selected');
        }
        if(options.cursor){
            cursor.classList.add('selected');
        }
        if(options.invert){
            invertColors.classList.add('selected');
            invertColors.style.backgroundColor = "url(images/icons/base-invert.svg)";
        }
        if(options.mono){
            monochrome.classList.add('selected');
        }
        if(options.mouse){
            mouse.classList.add('selected');
        }
        if(options.volume){
            volume.classList.add('selected');
            volume.style.backgroundImage = "url(images/icons/volume.svg)";
        }   
    }
    // Toggles the descrition for the extension's buttons on and off
    function toggleDesc() {
        let x = document.getElementById("description");
        options.info = !options.info;
        if (!options.info) {
            x.style.display = "block";
            info.classList.add('selected');

        } else {
            x.style.display = "none";
            info.classList.remove('selected');
        }
    }

    // The descriptions for eah of the buttons in the extension 
    const descriptions = {
        zoominMessage: "Increase the size of the text according to your selection",
        zoomoutMessage: "Decrease the size of the text according to your selection",
        ReadContentMessage: "Get your auditory output devices to read the highlighted text",
        invertColorsMessage: "Invert the colors to see the sites better",
        profileMessage: "Define your personal profile and chose your default settings",
        informationMessage: "Get all of the neccessary information about our extension",
        mouseVibrationMessage: "Get your mouse to vibrate with the arduino component" +
            " whenever you mouse is over a clickable object",
        monoMessage: "Get the site's content in grayscale",
        cursorMessage: "Enlarge the cursor inorder to see it better"
    };

    function displayInfo(messageName) { 
        displayedTextBox.innerText = descriptions[messageName];
    }

    function deleteDescriptiion() {
        displayedTextBox.innerText = "Hover for description!";
    }

    (function initiatePopupButtonDescriptions() {
        fontBigger.onmouseenter = (function () { displayInfo('zoominMessage') });
        fontSmaller.onmouseenter = (function () { displayInfo('zoomoutMessage') });
        volume.onmouseenter = (function () { displayInfo('ReadContentMessage') });
        invertColors.onmouseenter = (function () { displayInfo('invertColorsMessage') });
        monochrome.onmouseenter = (function () {displayInfo('monoMessage')});
        profileBtn.onmouseenter = (function () { displayInfo('profileMessage') });
        mouse.onmouseenter = (function () { displayInfo('mouseVibrationMessage') });
        info.onmouseenter = (function () { displayInfo('informationMessage') });
        cursor.onmouseenter = (function () {displayInfo('cursorMessage')});

        cursor.onmouseleave = (function () {deleteDescriptiion()});
        monochrome.onmouseleave = (function () { deleteDescriptiion()});
        fontBigger.onmouseleave = (function () { deleteDescriptiion() });
        fontSmaller.onmouseleave = (function(){deleteDescriptiion()});
        volume.onmouseleave = (function () { deleteDescriptiion() });
        invertColors.onmouseleave = (function () { deleteDescriptiion() });
        profileBtn.onmouseleave = (function () { deleteDescriptiion() });
        mouse.onmouseleave = (function () { deleteDescriptiion() });
        info.onmouseleave = (function () { deleteDescriptiion() });

        info.onclick = function () { toggleDesc(); };
    })();

    mouse.onclick = function (element) {
        if (!options.mouse) {
            $("button").each(function () {
                $(this).mouseenter(function () {
                    $.get("http://localhost:3000/", function (data, status) {
                        console.log(data);
                    });
                });
            });

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    {
                        code: `let allbuttons = document.getElementsByTagName("a");
    
                for (let i=0; i <  allbuttons.length; i++)  {
                     allbuttons[i].addEventListener("mouseenter",function () {
    
                        let xhr = new XMLHttpRequest();
                        xhr.open('GET', "http://localhost:3000/", true);
                        xhr.send();
                        console.log(xhr);
                        
                       });
                }`});

            });
        } else {
            $("button").each(function () {
                $(this).mouseenter(function () {
                    // $.get("http://localhost:3000/", function (data, status) {
                    //     console.log(data);
                    // });
                });
            });

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    {
                        code: `let allbuttons = document.getElementsByTagName("a");
    
                for (let i=0; i <  allbuttons.length; i++)  {
                     allbuttons[i].addEventListener("mouseenter",function () {
    
                        // let xhr = new XMLHttpRequest();
                        // xhr.open('GET', "http://localhost:3000/", true);
                        // xhr.send();
                        // console.log(xhr);
                        
                       });
                }`});

            });
        }
    }

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
            invertColors.classList.add('selected');
            invertColors.style.backgroundImage="url(images/icons/base-invert.svg)";
            options.invert = true;
        }
        else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.filter = "invert(0%)";' });

            });
            invertColors.classList.remove('selected');
            invertColors.style.backgroundImage="url(images/icons/invert-colors.svg)";
            options.invert = false;
        }
    };


    monochrome.onclick = function (element) {
        mono(element);
    };

    function mono(element) {
        if (options.mono) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.filter = "grayscale(100%)";' });
            });
            monochrome.classList.remove('selected');
            options.mono = false;
        }
        else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code: 'document.body.style.filter = "grayscale(0%)";' });
            });

            monochrome.classList.add('selected');
            options.mono = true;
        }
    }

    volume.onclick = function(element){
        options.volume = !options.volume;
        if(options.volume){
            volume.classList.add('selected');
            volume.style.backgroundImage = "url(images/icons/volume.svg)";
        }
        else{
            volume.classList.remove('selected');
            volume.style.backgroundImage = "url(images/icons/volume-off.svg)";
        }
    }

    mouse.onclick = function(element){
        options.mouse = !options.mouse;
        if(options.mouse){
            mouse.classList.add('selected');
        }
        else{
            mouse.classList.remove('selected');
        }
    }

    let mouseBigger = document.getElementById('cursorbtn');
    let isMouseBig = false;
    mouseBigger.onclick = function() {
        if(isMouseBig) {
            isMouseBig = false;
        } else {
            isMouseBig = true;
        }
    }
});