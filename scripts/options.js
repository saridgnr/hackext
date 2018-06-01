var blind, sight, color;
var options = {
  volume: false, 
  invert: false, 
  mouse: false,
  mono: false,
  cursor: false
};
chrome.storage.sync.get(['blindness'], function(result){
  blind = result.blindness;
});
chrome.storage.sync.get(['SightLoss'], function(result){
  sight = result.SightLoss;
});
chrome.storage.sync.get(['ColorBlindness'], function(result){
  color = result.ColorBlindness;
});
chrome.storage.sync.get(['volume'], function(result){
  options.volume = result.volume;
});
chrome.storage.sync.get(['invert'], function(result){
  options.invert = result.invert;
});
chrome.storage.sync.get(['monochrome'], function(result){
  options.mono = result.monochrome;
});
chrome.storage.sync.get(['mouse'], function(result){
  options.mouse = result.mouse;
});
chrome.storage.sync.get(['cursorSize'], function(result){
  cursor = result.cursorSize;
});

$(document).ready(function(){
  let editPage = document.getElementById('editButton');
  let savebutton = document.getElementById("saveButton");
  let blindness = document.getElementById("Blindness");
  let SightLoss = document.getElementById("SightLoss");
  let ColorBlindness = document.getElementById("ColorBlindness");
  
  let volumebtn = document.getElementById("volumebtn");
  let volumelbl = document.getElementById("volumelbl");
  let invertbtn = document.getElementById("invertbtn");
  let invertlbl = document.getElementById("invertlbl");
  let monobtn = document.getElementById("monobtn");
  let monolbl = document.getElementById("monolbl");
  let mousebtn = document.getElementById("mousebtn");
  let mouselbl = document.getElementById("mouselbl");
  let cursorbtn = document.getElementById("cursorbtn");
  let cursorlbl = document.getElementById("cursorlbl");

  blindness.disabled = true;
  SightLoss.disabled = true;
  ColorBlindness.disabled = true;
  savebutton.hidden = true;
  editPage.hidden = false;
  volumebtn.disabled = true;
  invertbtn.disabled = true;
  monobtn.disabled = true;
  mousebtn.disabled = true;
  cursorbtn.disabled = true;

  blindness.checked = blind;
  SightLoss.checked = sight;
  ColorBlindness.checked = color;

  volumelbl.innerText = "Read Content: " + options.volume;
  invertlbl.innerText = "Invert Colors: " + options.invert;
  monolbl.innerText = "Monochrome: " + options.mono;
  mouselbl.innerText = "Mouse Vibration: " + options.mouse;
  cursorlbl.innerText = "Enlarge Cursor: " + options.cursor;

  editPage.onclick = function(element){
    blindness.disabled = false;
    SightLoss.disabled = false;
    ColorBlindness.disabled = false;

    savebutton.hidden = false;
    editPage.hidden = true;
  };

  savebutton.onclick = function(element){
    blindness.disabled = true;
    SightLoss.disabled = true;
    ColorBlindness.disabled = true;

    savebutton.hidden = true;
    editPage.hidden = false;
    
    invertlbl.innerText = "Invert Colors: " + options.invert;
    
    chrome.storage.sync.set({'blindness': blindness.checked});
    chrome.storage.sync.set({'SightLoss': SightLoss.checked});
    chrome.storage.sync.set({'ColorBlindness': ColorBlindness.checked});
    chrome.storage.sync.set({'volume': options.volume});
    chrome.storage.sync.set({'invert': options.invert});
    chrome.storage.sync.set({'mouse': options.mouse});
    chrome.storage.sync.set({'monochrome': options.monochrome});
    chrome.storage.sync.set({'cursorSize': options.cursorSize});
  }

  blindness.onclick = function(event){
    if (blindness.checked){
      options.volume = true;
      options.mouse = true;
    }
    else{
      options.volume = false;
      options.mouse = false;
    }

    mouselbl.innerText = "Mouse Vibration: " + options.mouse;
    volumelbl.innerText = "Read Content: " + options.volume;
  }

  SightLoss.onclick = function(event){
    if(SightLoss.checked){
      options.cursorSize = true;
    }
    else{
      options.cursorSize = false;
    }

    cursorlbl.innerText = "Enlarge Cursor: " + options.cursorSize;
  }

  ColorBlindness.onclick = function(event){
    if(ColorBlindness.checked){
      options.monochrome = true;
    }
    else{
      options.monochrome = false;
    }

    monolbl.innerText = "Monochrome: " + options.monochrome;
  }
});