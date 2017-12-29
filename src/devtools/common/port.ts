import * as m  from 'mithril'
import {state} from 'devtools_common/data'

declare var chrome : any
export const port = chrome.runtime.connect({name: 'devtools-panel'})
port.onMessage.addListener(on_message)
function on_message(message, sender, send_response){
  if (message.action === 'clear') {
    state.clear()
  } else if (['reload','load','preview'].includes(message.action)){
    state.stage          = message.stage
    state.snapshots.tick = message.tick
    state.snapshots.len  = message.len
    state.snapshot       = message.snapshot
    state.snapshot_prev  = message.snapshot_prev
    if (message.action !== 'preview'){
      state.selected_tick  = message.tick
    }
  }
  m.redraw()
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
