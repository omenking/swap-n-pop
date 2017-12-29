declare var window : any
declare var chrome : any

const port = chrome.runtime.connect({name: 'content-script'})
port.onMessage.addListener(on_message)
port.postMessage('connect')

function preview(tick){
  if (window.stage === null || window.stage === undefined){ return }
  port.postMessage({
    action        : 'preview',
    stage         : window.stage.toString(),
    tick          : window.stage.tick,
    len           : window.stage.snapshots.len,
    snapshot      : window.stage.snapshots.snapshot_at(tick),
    snapshot_prev : window.stage.snapshots.snapshot_at(tick-1)
  })
}

function reload(){
  if (window.stage === null || window.stage === undefined){ return }
  port.postMessage({
    action        : 'reload',
    stage         : window.stage.toString(),
    tick          : window.stage.tick,
    len           : window.stage.snapshots.len,
    snapshot      : window.stage.snapshots.snapshot_at(window.stage.tick),
    snapshot_prev : window.stage.snapshots.snapshot_at(window.stage.tick-1)
  })
}

function garbage_push(data){
  let pl;
  if (data.pi === 0) { pl = window.stage.playfield1 }
  else               { pl = window.stage.playfield0 }
  pl.garbage.push(data.combo,data.chain)
  window.stage.render()
}

function snapshot_export(tick : number){
  window.snapshot_export_send(window.stage.snapshots.snapshot_at(tick))
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
  else if (message.action === 'snapshot-export'){ snapshot_export(message.tick) }
  else if (message.action === 'snapshot-import'){ snapshot_import() }
  else if (message.action === 'replay-export'){ replay_export() }
  else if (message.action === 'replay-import'){ replay_import() }
}

function devtools_send(opts){
  port.postMessage(opts)
}
window.devtools_send          = devtools_send
