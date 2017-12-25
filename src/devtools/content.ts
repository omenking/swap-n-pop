declare var window : any
declare var chrome : any

const port = chrome.runtime.connect({name: 'content-script'})
port.onMessage.addListener(on_message)
port.postMessage('connect')

function process_array(dup,data){
  for (let i = 0; i < data.length; i++) {
    if (typeof(data[i]) === "symbol") {
      dup[i] = data[i].toString()
    } else if (data[i] instanceof Array) {
      dup[i] = process_array([],data[i])
    } else {
      dup[i] = data[i]
    }
  }
  return dup
}
/*
 * Symbols will show up null when passed so we
 * need to deep copy the data and convert Symbols
 * to strings
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
 */
function process_data(stage,tick){
  const data = stage.snapshots.snapshot_at(tick)
  return process_array([],data)
}
function preview(tick){
  if (window.stage === null || window.stage === undefined){ return }
  port.postMessage({
    action        : 'preview',
    stage         : window.stage.toString(),
    tick          : window.stage.tick,
    len           : window.stage.snapshots.len,
    snapshot      : process_data(window.stage,tick),
    snapshot_prev : process_data(window.stage,tick-1)
  })
}

function reload(){
  if (window.stage === null || window.stage === undefined){ return }
  port.postMessage({
    action        : 'reload',
    stage         : window.stage.toString(),
    tick          : window.stage.tick,
    len           : window.stage.snapshots.len,
    snapshot      : process_data(window.stage,window.stage.tick),
    snapshot_prev : process_data(window.stage,window.stage.tick-1)
  })
}
function on_message(message, sender, send_response){
  if      (message.action === 'preview') { preview(message.tick)}
  else if (message.action === 'reload')  { reload() }
}

function devtools_send(opts){
  port.postMessage(opts)
}
window.devtools_send          = devtools_send
window.devtools_process_data  = process_data
