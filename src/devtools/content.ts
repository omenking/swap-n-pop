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
    snapshot_prev : window.stage.snapshots.snapshot_at(tick-1),
    garbage       : window.stage.flag_garbage,
    time_trial    : window.stage.flag_timer,
    time_trial_val: window.stage.timer.countdown
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

function snapshot_export(tick : number){
  window.snapshot_export_send(window.stage.snapshots.snapshot_at(tick))
}

function panel_update(tick,pi,i,data){
  let pl;
  if (data.pi === 0) { pl = window.stage.playfield1 }
  else               { pl = window.stage.playfield0 }
  const panel = pl.stack_i(i)
  const snap  = panel.snap
  snap[2] = data.kind
  snap[3] = data.state
  snap[4] = data.counter
  snap[5] = data.chain
  panel.load(snap)
  window.stage.snapshots.snap_override(tick)
  window.stage.render()
  preview(tick)
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

function regenerate_from_seed(seed : string){
  window.stage.seed = seed
  window.stage.create()
  window.stage.render()
}

function toggle_garbage(bool){
  window.stage.flag_garbage = bool
  window.stage.render()
}

function toggle_timer(bool,val){
  window.stage.flag_timer = bool
  if(bool === true) {
    window.stage.timer.countdown = val
    window.stage.timer.tick = 0
  }
  window.stage.render()
}

function timer_update(val){
  window.stage.timer.countdown = val
  window.stage.timer.tick = 0
  window.stage.render()
}

function on_message(message, sender, send_response){
  if      (message.action === 'preview') { preview(message.tick)}
  else if (message.action === 'reload')  { reload() }
  else if (message.action === 'garbage_push')  { garbage_push(message.data) }
  else if (message.action === 'levels_update') { levels_update(message.levels) }
  else if (message.action === 'regenerate_from_seed') { regenerate_from_seed(message.seed) }
  else if (message.action === 'panel_update'){ panel_update(message.tick,message.pi,message.i,message.data) }
  else if (message.action === 'snapshot-export'){ snapshot_export(message.tick) }
  else if (message.action === 'snapshot-import'){ snapshot_import() }
  else if (message.action === 'replay-export'){ replay_export() }
  else if (message.action === 'replay-import'){ replay_import() }
  else if (message.action === 'toggle_garbage'){ toggle_garbage(message.bool) }
  else if (message.action === 'toggle_timer'){ toggle_timer(message.bool,message.val) }
  else if (message.action === 'timer_update'){ timer_update(message.val) }
}

window.devtools_stage_load   = load
window.devtools_stage_clear  = clear
