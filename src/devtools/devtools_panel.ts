// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*
import * as m  from 'mithril'
import {state}                  from 'devtools/common/data'
import {port, snapshot_preview} from 'devtools/common/port'
import column_components        from 'devtools/components/column_components'
import column_snapshots         from 'devtools/components/column_snapshots'
import content_mode_vs          from 'devtools/components/content_mode_vs'
import content_primer           from 'devtools/components/content_primer'
import actions                  from 'devtools/components/actions'

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
      //column_components(),
      actions(),
      content_primer(),
      content_mode_vs()
    ]
  }
}

m.mount(window.document.body, app)
