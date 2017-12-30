import * as m  from 'mithril'
import {state} from 'devtools/common/data'

declare var chrome : any
export const port = chrome.runtime.connect({name: 'devtools-panel'})
port.onMessage.addListener(on_message)
function on_message(message, sender, send_response){
  if (message.action === 'clear') {
    state.clear()
    m.redraw()
  } else if (['reload','load','preview'].includes(message.action)){
    state.stage          = message.stage
    state.snapshots.tick = message.tick
    state.snapshots.len  = message.len
    state.seed           = message.seed
    state.snapshot       = message.snapshot
    state.snapshot_prev  = message.snapshot_prev
    state.garbage        = message.garbage
    state.time_trial     = message.time_trial
    state.time_trial_val = message.time_trial_val
    if (message.action !== 'preview'){
      state.selected_tick  = message.tick
    }
    m.redraw()
  }
}

export function snapshot_preview(tick: number){
  state.selected_tick = tick
  port.postMessage({
    port: 'content-script',
    msg : {
      tick: tick,
      action : 'preview'
    }
  })
}

export function queue_garbage(){
  port.postMessage({
    port: 'content-script',
    msg : {
      action : 'garbage_push',
      data: {
        pi:    state.garbage_queue.pi,
        chain: state.garbage_queue.chain,
        combo: state.garbage_queue.combo
      }
    }
  })
  state.garbage_queue.combo = 0
  state.garbage_queue.chain = 0
}

export function update_levels(){
  port.postMessage({
    port: 'content-script',
    msg : {
      action: 'levels_update',
      levels: state.levels
    }
  })
}

export function regenerate_from_seed(){
  port.postMessage({
    port: 'content-script',
    msg : {
      action: 'regenerate_from_seed',
      seed: state.seed
    }
  })
}
export function update_panel(){
  port.postMessage({
    port: 'content-script',
    msg : {
      action: 'panel_update',
      tick: state.selected_tick,
      pi: state.selected_panel[0],
      i : state.selected_panel[1],
      data: state.panel_form
    }
  })
}

export function toggle_garbage(){
  port.postMessage({
    port: 'content-script',
    msg : {
      action: 'toggle_garbage',
      bool: state.garbage
    }
  })
}

export function toggle_timer(){
  port.postMessage({
    port: 'content-script',
    msg : {
      action: 'toggle_timer',
      bool: state.time_trial,
      val: state.time_trial_val
    }
  })
}

export function update_timer(){
  port.postMessage({
    port: 'content-script',
    msg : {
      action: 'timer_update',
      val: state.time_trial_val
    }
  })
}
