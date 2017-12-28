// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*
import * as m  from 'mithril'
import {state} from 'devtools_common/data'
import {port, snapshot_preview} from 'devtools_common/port'
import column_components from 'devtools_components/column_components'
import column_snapshots  from 'devtools_components/column_snapshots'
import content_mode_vs   from 'devtools_components/content_mode_vs'
import content_garbage   from 'devtools_components/content_garbage'
import content_primer    from 'devtools_components/content_primer'

declare var window : any

port.postMessage('connect')

window.document.onkeydown = function (e) {
  if ([38,87,75].includes(e.keyCode)) { //up w k
    if (state.selected_tick !== state.snapshots.tick){
      snapshot_preview(state.selected_tick+1)
      m.redraw()
    }
  } else if ([40,83,74].includes(e.keyCode)) { //down s j
    if (state.selected_tick !== state.snapshots.tick-state.snapshots.len+1){
      snapshot_preview(state.selected_tick-1)
      m.redraw()
    }
  }
}

const app = {
  view: function(){
    return [
      column_snapshots(),
      column_components(),
      [
        content_primer(),
        content_mode_vs(),
        content_garbage()
      ]
    ]
  }
}

m.mount(window.document.body, app)
