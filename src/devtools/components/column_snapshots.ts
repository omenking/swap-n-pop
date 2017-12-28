import * as m             from 'mithril'
import {snapshot_preview} from 'devtools_common/port'
import {state}            from 'devtools_common/data'

function connection_status(){
  let lbl = ''
  if (state.stage === null) {
    lbl = 'No Stage Connected'
  } else if (state.stage === '[object ModeVs]') {
    lbl = `ModeVs (t.${state.snapshots.tick})`
  }
  return m('.title',lbl)
}

function heading(){
  return m('.heading',[
    connection_status(),
    m('.clear')
  ])
}

function item_class(tick){
  const classes = []
  if (state.snapshots.tick === tick) { classes.push('current') }
  if (state.selected_tick  === tick) { classes.push('active')  }
  return classes.join(' ')
}

function item_click(tick : number){
  return function(){
    snapshot_preview(tick)
  }
}

function item(i){
  let tick = state.snapshots.tick-i
  return m('.item.snapshot', {
    className: item_class(tick),
    onclick:   item_click(tick)
  },[
    `t.${tick}`,
    m('.marker')
  ])
}



function items(){
  const items = []
  for(let i = 0; i < state.snapshots.len; i++){
    items.push(item(i))
  }
  return m('.column_content',m('.items',items))
}

export default function column(){
  return m('.column.snapshots',[
    heading(),
    items()
  ])
}
