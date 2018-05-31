// let changeColor = document.getElementById('changeColor');

  // chrome.storage.sync.get('color', function(data) {
  //   changeColor.style.backgroundColor = data.color;
  //   changeColor.setAttribute('value', data.color);
  // });

  // changeColor.onclick = function(element) {
  //   let color = element.target.value;
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     chrome.tabs.executeScript(
  //         tabs[0].id,
  //         {code: 'document.body.style.backgroundColor = "' + color + '";'});
  //   });
  // };
  alertify.defaults = {
    autoReset:true,
    basic:false,
    closable:true,
    closableByDimmer:true,
    frameless:false,
    maintainFocus:true, // <== global default not per instance, applies to all dialogs
    maximizable:false,
    modal:true,
    movable:false,
    moveBounded:false,
    overflow:true,
    padding: true,
    pinnable:true,
    pinned:true,
    preventBodyShift:false, // <== global default not per instance, applies to all dialogs
    resizable:false,
    startMaximized:false,
    transition:'pulse',
    notifier:{
        // auto-dismiss wait time (in seconds)  
        delay:15,
        // default position
        position:'bottom-right',
        // adds a close button to notifier messages
        closeButton: true
    },
    // language resources 
    glossary:{
        title:'Rampa - Accessability',
        ok: 'OK',
        cancel: 'Cancel'            
    },
    // theme settings
    theme:{
        // class name attached to prompt dialog input textbox.
        input:'ajs-input',
        // class name attached to ok button
        ok:'ajs-ok',
        // class name attached to cancel button 
        cancel:'ajs-cancel'
    }
};

let infoElem = document.getElementById('info');

infoElem.onclick = function(){
  let color = "#F0F8FF"; 
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });

    //alertify.alert('Ready!');
};