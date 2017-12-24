// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// 
// Can use:
// chrome.tabs.*
// chrome.extension.*

declare var chrome : any

const ports = {}

function msg_devtools_page(message, sender, send_response){
  if (message === 'connect') { return }
  if (message.port) {
    ports[message.port].postMessage(message.msg)
  } else {
    chrome.tabs.executeScript(message.tab_id,{ file: message.inject })
  }
}

function msg_devtools_panel(message, sender, send_response){
  if (message === 'connect') { return }
  if (message.port) {
    ports[message.port].postMessage(message.msg)
  }
}

function msg_content_script(message, sender, send_response){
  if (message === 'connect') { return }
  ports['devtools-panel'].postMessage(message)
}

function on_connect(port) {
  ports[port.name] = port
  switch (port.name){
    case 'devtools-page' : { ports['devtools-page'].onMessage.addListener(msg_devtools_page);  break; }
    case 'content-script': { ports['content-script'].onMessage.addListener(msg_content_script); break; }
    case 'devtools-panel': { ports['devtools-panel'].onMessage.addListener(msg_devtools_panel); break; }
  }
}
chrome.extension.onConnect.addListener(on_connect)
