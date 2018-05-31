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
];

$(document).ready(function(){
  let editPage = document.getElementById('editButton');
  let savebutton = document.getElementById("saveButton");
  let blindness = document.getElementById("Blindness");
  let SightLoss = document.getElementById("SightLoss");
  let ColorBlindness = document.getElementById("ColorBlindness");

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

    // Save to cookies...
  }
});
//document.getElementById("lifecheck").checked