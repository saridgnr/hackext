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
  options.cursor = result.cursorSize;
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

  if(options.volume){
    volumebtn.style.backgroundImage="url('images/icons/volume.svg')";
    volumebtn.style.backgroundColor="rgb(247, 184, 31)";
  }

  if(options.invert){
    invertbtn.style.backgroundImage="url('images/icons/base-invert.svg')";
    invertbtn.style.backgroundImage="rgb(247, 184, 31)";
  }

  if(options.mono){
    monobtn.style.backgroundColor="rgb(247, 184, 31)";
  }

  if(options.mouse){
    mousebtn.style.backgroundColor="rgb(247, 184, 31)";
  }

  if(options.cursor){
    cursorbtn.style.backgroundColor="rgb(247, 184, 31)";
  }

  editPage.onclick = function(element){
    blindness.disabled = false;
    SightLoss.disabled = false;
    ColorBlindness.disabled = false;

    savebutton.hidden = false;
    editPage.hidden = true;

    invertbtn.disabled = false;
    monobtn.disabled = false;
    cursorbtn.disabled = false;
    mousebtn.disabled = false;
    volumebtn.disabled = false;

    invertbtn.classList.add('edited');
    monobtn.classList.add('edited');
    cursorbtn.classList.add('edited');
    mousebtn.classList.add('edited');
    volumebtn.classList.add('edited');  
  };

  savebutton.onclick = function(element){
    blindness.disabled = true;
    SightLoss.disabled = true;
    ColorBlindness.disabled = true;

    savebutton.hidden = true;
    editPage.hidden = false;
    
    invertbtn.disabled = true;
    monobtn.disabled = true;
    cursorbtn.disabled = true;
    mousebtn.disabled = true;
    volumebtn.disabled = true;

    invertbtn.classList.remove('edited');
    monobtn.classList.remove('edited');
    cursorbtn.classList.remove('edited');
    mousebtn.classList.remove('edited');
    volumebtn.classList.remove('edited');  

    chrome.storage.sync.set({'blindness': blindness.checked});
    chrome.storage.sync.set({'SightLoss': SightLoss.checked});
    chrome.storage.sync.set({'ColorBlindness': ColorBlindness.checked});
    chrome.storage.sync.set({'volume': options.volume});
    chrome.storage.sync.set({'invert': options.invert});
    chrome.storage.sync.set({'mouse': options.mouse});
    chrome.storage.sync.set({'monochrome': options.mono});
    chrome.storage.sync.set({'cursorSize': options.cursor});
  }

  blindness.onclick = function(event){
    if (blindness.checked){
      options.volume = true;
      volumebtn.style.backgroundImage="url('images/icons/volume.svg')";
      volumebtn.style.backgroundColor="rgb(247, 184, 31)"
      options.mouse = true;
      mousebtn.style.backgroundColor="rgb(247, 184, 31)";
    }
    else{
      options.volume = false;
      volumebtn.style.backgroundImage="url('images/icons/volume-off.svg')";
      volumebtn.style.backgroundColor="rgb(239, 239, 239)";
      options.mouse = false;
      mousebtn.style.backgroundColor="rgb(239, 239, 239)";
    }

    mouselbl.innerText = "Mouse Vibration: " + options.mouse;
    volumelbl.innerText = "Read Content: " + options.volume;
  }

  SightLoss.onclick = function(event){
    if(SightLoss.checked){
      options.cursor = true;
      cursorbtn.style.backgroundColor="rgb(247, 184, 31)";
    }
    else{
      options.cursor = false;
      cursorbtn.style.backgroundColor="rgb(239, 239, 239)";
    }

    cursorlbl.innerText = "Enlarge Cursor: " + options.cursor;
  }

  ColorBlindness.onclick = function(event){
    if(ColorBlindness.checked){
      options.monochrome = true;
      monobtn.style.backgroundColor="rgb(247, 184, 31)";
    }
    else{
      options.monochrome = false;
      monobtn.style.backgroundColor="rgb(239, 239, 239)";
    }

    monolbl.innerText = "Monochrome: " + options.monochrome;
  }

  volumebtn.onclick = function(event){
    options.volume = !options.volume;
    if (!options.volume){
      volumebtn.style.backgroundColor="rgb(239, 239, 239)";
      volumebtn.style.backgroundImage="url('images/icons/volume-off.svg')";
    }
    else{
      volumebtn.style.backgroundColor="rgb(247, 184, 31)";
      volumebtn.style.backgroundImage="url('images/icons/volume.svg')";
    }

    volumelbl.innerText = "Read Content: " + options.volume;
  }

  invertbtn.onclick = function(event){
    options.invert = !options.invert;
    if(!options.invert){
      invertbtn.style.backgroundColor="rgb(239, 239, 239)";
      invertbtn.style.backgroundImage="url('images/icons/invert-colors.svg')";
    }
    else{
      if (options.mono){
        options.mono = false;
        monobtn.style.backgroundColor="rgb(239, 239, 239)";
        monolbl.innerText = "Monochrome: " + options.mono;
      }

      invertbtn.style.backgroundColor="rgb(247, 184, 31)";
      invertbtn.style.backgroundImage="url('images/icons/base-invert.svg')";
    }

    invertlbl.innerText = "Invert Colors: " + options.invert;
  }

  monobtn.onclick = function(event){
    options.mono = !options.mono;
    if(!options.mono){
      monobtn.style.backgroundColor="rgb(239, 239, 239)";
    }
    else{
      monobtn.style.backgroundColor="rgb(247, 184, 31)";

      if (options.invert){
        options.invert = false;
        invertbtn.style.backgroundColor="rgb(239, 239, 239)";
        invertlbl.innerText = "Invert Colors: " + options.invert;
      }
    }

    monolbl.innerText = "Monochrome: " + options.mono;
  }

  mousebtn.onclick = function(event){
    options.mouse = !options.mouse;
    if(!options.mouse){
      mousebtn.style.backgroundColor="rgb(239, 239, 239)";
    }
    else{
      mousebtn.style.backgroundColor="rgb(247, 184, 31)";
    }

    mouselbl.innerText = "Mouse Vibration: " + options.mouse;
  }

  cursorbtn.onclick = function(event){
    options.cursor = !options.cursor;
    if(!options.cursor){
      cursorbtn.style.backgroundColor="rgb(239, 239, 239)";
    }
    else{
      cursorbtn.style.backgroundColor="rgb(247, 184, 31)";
    }

    cursorlbl.innerText = "Enlarge Cursor: " + options.cursor;
  }
});