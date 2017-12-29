declare var window : any
declare var chrome : any

const port = chrome.runtime.connect({name: 'content-script'})
port.onMessage.addListener(on_message)
port.postMessage('connect')

function preview(tick){
  if (window.stage === null || window.stage === undefined){ return }
  port.postMessage(payload('preview',tick))
}

function reload(){
  if (window.stage === null || window.stage === undefined){ return }
  port.postMessage(payload('reload',window.stage.tick))
}

function load(){
  if (window.stage === null || window.stage === undefined){ return }
  port.postMessage(payload('load',window.stage.tick))
}

function payload(action,tick){
  return {
    action        : action,
    stage         : window.stage.toString(),
    tick          : window.stage.tick,
    seed          : window.stage.seed,
    len           : window.stage.snapshots.len,
    snapshot      : window.stage.snapshots.snapshot_at(tick),
    snapshot_prev : window.stage.snapshots.snapshot_at(tick-1)
  }
}

function clear(){
  port.postMessage({action: 'clear'})
}

function garbage_push(data){
  let pl;
  if (data.pi === 0) { pl = window.stage.playfield1 }
  else               { pl = window.stage.playfield0 }
  pl.garbage.push(data.combo,data.chain)
  window.stage.render()
}

function levels_update(levels){
  window.stage.levels[0].level = levels[0]
  window.stage.levels[1].level = levels[1]
  window.stage.render()
}

function snapshot_export(){
  window.snapshot_export_send(window.stage.snapshots.snapshot_at(window.stage.tick))
}

function snapshot_import(){
  window.snapshot_import_send()
}

function replay_export(){
  window.replay_export_send()
}

function replay_import(){
  window.replay_import_send()
}

function on_message(message, sender, send_response){
  if      (message.action === 'preview') { preview(message.tick)}
  else if (message.action === 'reload')  { reload() }
  else if (message.action === 'garbage_push')  { garbage_push(message.data) }
  else if (message.action === 'levels_update') { levels_update(message.levels) }
  else if (message.action === 'snapshot-export'){ snapshot_export() }
  else if (message.action === 'snapshot-import'){ snapshot_import() }
  else if (message.action === 'replay-export'){ replay_export() }
  else if (message.action === 'replay-import'){ replay_import() }
}

window.devtools_stage_load   = load
window.devtools_stage_clear  = clear
