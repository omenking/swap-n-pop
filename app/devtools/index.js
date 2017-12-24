var port = chrome.runtime.connect({name: 'devtools-page'})

function on_shown(){
  port.postMessage({port: 'content-script', msg: {action: 'reload'} })
}

chrome.devtools.panels.create("Swap'N'Pop", "icon.png", "panel.html", function(panel) {
  port.postMessage({
    tab_id : chrome.devtools.inspectedWindow.tabId,
    inject: 'content.js'
  });

  panel.onShown.addListener(on_shown)
});
