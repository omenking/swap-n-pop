// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*
import * as m from 'mithril'

declare var window: {
  document: any
  alert : any
}

declare var chrome: {
  devtools: any,
  runtime: any
}


const COMPONENTS = Symbol('components')
const SNAPSHOTS  = Symbol('snapshots')
const ROWS_INV   = 12
const ROWS_VIS   = 11
const ROWS       = ROWS_INV + ROWS_VIS
const COLS       = 6

const port = chrome.runtime.connect({name: 'devtools-panel'})
port.onMessage.addListener(on_message)
port.postMessage('connect')


export function xy2i(x: number, y: number): number {
  // x left-right
  // y top-down
  return (y * COLS) + x;
}

const snapshots = {
  stage : null,
  tick  : 0,
  len   : 0
}
let snapshot      : any
let snapshot_prev : any
let selected_tick = null
let state = COMPONENTS
const stack_actions_state = {
  rows: {
    inv: false,
    vis: true
  },
  playfields: {
    pl0: true,
    pl1: false
  }
}

function tab_active(kind){
  if (kind === state)
    return 'active'
  return ''
}

function tab_click(kind){
  return function(){
    state = kind
  }
}

function tab(kind,label){
  return m('.tab',
    {
      className: tab_active(kind),
      onclick: tab_click(kind)
    },
    label
  )
}

function connection_status(){
  let lbl = ''
  if (snapshots.stage === null) {
    lbl = 'No Stage Connected'
  } else if (snapshots.stage === '[object ModeVs]') {
    lbl = `ModeVs (t.${snapshots.tick})`
  }
  return m('.title',lbl)
}

function heading_components(){
  return m('.heading',[
    m('.title','Components'),
    m('.clear')
  ])
}

function heading_snapshots(){
  return m('.heading',[
    connection_status(),
    //tab(COMPONENTS,'Components'),
    //tab(SNAPSHOTS,'Snapshots'),
    m('.clear')
  ])
}

function item_snapshot_class(tick){
  const classes = []
  if (snapshots.tick === tick) { classes.push('current') }
  if (selected_tick  === tick) { classes.push('active')  }
  return classes.join(' ')
}

function item_snapshot_click(tick : number){
  return function(){
    selected_tick = tick
    port.postMessage({
      port: 'content-script',
      msg : {
        tick: tick,
        action : 'preview'
      }
    })
  }
}

function item_snapshot(i){
  let tick = snapshots.tick-i
  return m('.item.snapshot', {
    className: item_snapshot_class(tick),
    onclick:   item_snapshot_click(tick)
  },[
    `t.${tick}`,
    m('.marker')
  ])
}

function items_components(){
  let items = [m('.item.component.active','Stage (ModeVs)')]
  return m('.column_content',m('.items',items))
}

function items_snapshots(){
  const items = []
  for(let i = 0; i < snapshots.len; i++){
    items.push(item_snapshot(i))
  }
  return m('.column_content',m('.items',items))
}

function column_snapshots(){
  return m('.column.snapshots',[
    heading_snapshots(),
    items_snapshots()
  ])
}

function column_components(){
  if (snapshots.stage === null) { return }
  return m('.column.components',[
    heading_components(),
    items_components()
  ])
}

function content_class(){
  if (state === COMPONENTS)
    return 'components_index'
  else if (state === SNAPSHOTS)
    return 'snapshots_index'
}

function content(){
  return [
    content_primer(),
    content_mode_vs()
  ]
}

function content_primer(){
  if (snapshots.stage != null) { return }
  return m('.content_wrap.primer',m('.content',
    toast('Data will appear when you start a game and enter step mode')
  ))
}


function stack_y_counter_class(y){
  if (y < ROWS_INV)
    return 'inv'
  else
    return 'vis'
}

function stack_y_counter(y){
  return m('td.y',{
    className: stack_y_counter_class(y)
  }, y)
}

function stack_row(y : number, pi: number){
  if ( (y < ROWS_INV) && stack_actions_state.rows.inv === false) { return }
  if (!(y < ROWS_INV) && stack_actions_state.rows.vis === false) { return }

  return m('tr',[
    stack_y_counter(y),
    stack_panel(0,y,pi),
    stack_panel(1,y,pi),
    stack_panel(2,y,pi),

    stack_panel(3,y,pi),
    stack_panel(4,y,pi),
    stack_panel(5,y,pi)
  ])
}

function stack_panel_prop_class(val,val_prev){
  if (val !== val_prev){
    return 'changed'
  }
  return ''
}
function stack_panel_data(i: number, data, data_prev){
  return [
    m('.prop.index'  ,{title: 'Index'  },i),
    m('.prop.kind'   ,{title: 'Kind'   , className: stack_panel_prop_class(data[2],data_prev[2])},data[2] ? data[2] : 'null'),
    m('.prop.state'  ,{title: 'State'  , className: stack_panel_prop_class(data[3],data_prev[3])},data[3]),
    m('.prop.counter',{title: 'Counter', className: stack_panel_prop_class(data[4],data_prev[4])},data[4]),
    m('.prop.chain'  ,{title: 'Chain'  , className: stack_panel_prop_class(data[5],data_prev[5])},data[5])
  ]
}

function kind_class(val){
  return `devtools_panel${val}`
}

function stack_panel_class(data,data_prev){
  const classes = []
  if (data[2] !== null)
    classes.push(kind_class(data[2]))

  if (
      data[2] !== data_prev[2] ||
      data[3] !== data_prev[3] ||
      data[4] !== data_prev[4] ||
      data[5] !== data_prev[5]
     ){
    classes.push('changed')
  }
  return classes.join(' ')
}

function stack_panel(x: number, y: number, pi: number){
  const i         = xy2i(x,y)
  const data      = snapshot[pi+1][2][i]
  const data_prev = snapshot_prev[pi+1][2][i]
  return m('td', { className: stack_panel_class(data,data_prev)},
    stack_panel_data(i,data,data_prev)
  )
}

function stack(pi : number){
  if (stack_actions_state.playfields[`pl${pi}`] === false) { return }
  const rows = []
  for(let i = 0; i < ROWS; i++){
    rows.push(stack_row(i,pi))
  }
  return m('.stack',m('table',rows))
}

function stack_actions_checkbox_selected(group,key){
  return function(selected){
    stack_actions_state[group][key] = selected
  }
}

function stack_actions_checkbox(group,key,lbl){
  return m('.checkbox',[
    m("input[type='checkbox']",{
      onclick: m.withAttr('checked', stack_actions_checkbox_selected(group,key)),
      checked: stack_actions_state[group][key]
    }),
    m('span', lbl)
  ])
}
function stack_actions(){
  return m('.stack_actions',[
    m('span.lbl','Rows'),
    stack_actions_checkbox('rows','inv','Invisible'),
    stack_actions_checkbox('rows','vis','Visible'),
    m('span.lbl.playfields','Playfields'),
    stack_actions_checkbox('playfields','pl0','Player 1'),
    stack_actions_checkbox('playfields','pl1','Player 2')
  ])
}

function content_mode_vs(){
  if (snapshots.stage != '[object ModeVs]') { return }
  return m('.content_wrap.mode_vs',m('.content',
    stack_actions(),
    stack(0),
    stack(1),
    m('.clear')
  ))
}

function toast(val){
  return m('.toast', m('span',val))
}

const app = {
  view: function(){
    return [
      column_snapshots(),
      column_components(),
      content()
    ]
  }
}

const el = window.document.body
m.mount(el, app)

function on_message(message, sender, send_response){
  if (message.action === 'clear') {
    snapshots.stage    = null
    snapshots.tick     = 0
    snapshots.len      = 0
    snapshot           = null
    snapshot_prev      = null
    selected_tick      = 0
  } else if (message.action === 'reload') {
    snapshots.stage    = message.stage
    snapshots.tick     = message.tick
    snapshots.len      = message.len
    snapshot           = message.snapshot
    snapshot_prev      = message.snapshot_prev
    selected_tick      = message.tick
  } else if (message.action === 'load') {
    snapshots.stage    = message.stage
    snapshots.tick     = message.tick
    snapshots.len      = message.len
    snapshot           = message.snapshot
    snapshot_prev      = message.snapshot_prev
    selected_tick      = message.tick
  } else if (message.action === 'preview') {
    snapshots.stage    = message.stage
    snapshots.tick     = message.tick
    snapshots.len      = message.len
    snapshot           = message.snapshot
    snapshot_prev      = message.snapshot_prev
  }
  m.redraw()
}

window.document.onkeydown = function (e) {
  if ([38,87,75].includes(e.keyCode)) { //up w k
    if (selected_tick !== snapshots.tick){
      item_snapshot_click(selected_tick+1)()
      m.redraw()
    }
  } else if ([40,83,74].includes(e.keyCode)) { //down s j
    if (selected_tick !== snapshots.tick-snapshots.len+1){
      item_snapshot_click(selected_tick-1)()
      m.redraw()
    }
  }
}
