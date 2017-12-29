import {port}     from 'devtools_common/port'
import panel_form from 'devtools_components/panel_form'
import * as m  from 'mithril'
import {COMP_STAGE, state} from 'devtools_common/data'
import {ROWS_INV, ROWS_VIS, ROWS, COLS} from 'core/data'

export function xy2i(x: number, y: number): number {
  // x left-right
  // y top-down
  return (y * COLS) + x;
}

function stack_y_counter_class(y){
  if (y < ROWS_INV)
    return 'inv'
  else
    return 'vis'
}

function stack_y_counter(y){
  return m('td.panel.y',{
    className: stack_y_counter_class(y)
  }, y)
}

function stack_row(y : number, pi: number){
  if ( (y < ROWS_INV) && state.stack_actions_rows.inv === false) { return }
  if (!(y < ROWS_INV) && state.stack_actions_rows.vis === false) { return }

  return m('tr',[
    stack_y_counter(y),
    panel(0,y,pi),
    panel(1,y,pi),
    panel(2,y,pi),

    panel(3,y,pi),
    panel(4,y,pi),
    panel(5,y,pi)
  ])
}

function prop_class(val,val_prev){
  if (val !== val_prev){
    return 'changed'
  }
  return ''
}

function panel_img(kind,i){
  if (kind === null ) {
    return m('img', {title: i, src: `devtools_panel_null.png`})
  } else {
    return m('img', {title: i, src: `devtools_panel${kind}.png`})
  }
}
function panel_data(i: number, data, data_prev){
  return m('.table',[
    m('tr',[
      //m('td',m('.prop.index'  ,{title: 'Index'  },i)),
      m('td',panel_img(data[2],i)),
      m('td.info',[
        m('.prop.kind' ,{title: 'Kind'   , className: prop_class(data[2],data_prev[2])},data[2] ? data[2] : 'null'),
        m('.prop.state',{title: 'State'  , className: prop_class(data[3],data_prev[3])},data[3]),
        m('.num',[
          m('span.prop.counter',{title: 'Counter', className: prop_class(data[4],data_prev[4])},data[4]),
          ',',
          m('span.prop.chain'  ,{title: 'Chain'  , className: prop_class(data[5],data_prev[5])},data[5])
        ])
      ])
    ])
  ])
}

//function kind_class(val){
  //return `devtools_panel${val}`
//}

function panel_class(data,data_prev){
  const classes = []
  //if (data[2] !== null)
    //classes.push(kind_class(data[2]))

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

function panel_click(i,data){
  return function(){
    state.reset_panel_form(data)
    state.selected_panel = i
  }
}

function panel(x: number, y: number, pi: number){
  const i         = xy2i(x,y)
  const data      = state.snapshot[pi+1][2][i]
  const data_prev = state.snapshot_prev[pi+1][2][i]
  return m('td.panel', { onclick: panel_click(i,data), className: panel_class(data,data_prev)},[
    panel_form(i,data,data_prev),
    panel_data(i,data,data_prev)
  ])
}

function stack(pi : number){
  if (state.stack_actions_playfields[`pl${pi}`] === false) { return }
  const rows = []
  for(let i = 0; i < ROWS; i++){
    rows.push(stack_row(i,pi))
  }
  return m('.stack',m('table',rows))
}

function selected(group,key){
  return function(selected){
    state['stack_actions_'+group][key] = selected
  }
}

function checkbox(group,key,lbl){
  return m('.checkbox',[
    m("input[type='checkbox']",{
      onclick: m.withAttr('checked', selected(group,key)),
      checked: state['stack_actions_'+group][key]
    }),
    m('span', lbl)
  ])
}

function export_replay_click(){
  port.postMessage({port: 'content-script',msg:{action:'replay-export', tick: state.selected_tick}})
}
function import_replay_click(){
  port.postMessage({port: 'content-script',msg:{action:'replay-import'}})
}
function export_snapshot_click(){
  port.postMessage({port: 'content-script',msg:{action:'snapshot-export', tick: state.selected_tick}})
}
function import_snapshot_click(){
  port.postMessage({port: 'content-script',msg:{action:'snapshot-import'}})
}

function actions(){
  return m('.actions.stack_actions',[
    m('span.lbl.first','Rows'),
    checkbox('rows','inv','Invisible'),
    checkbox('rows','vis','Visible'),
    m('span.lbl.playfields','Playfields'),
    checkbox('playfields','pl0','Player 1'),
    checkbox('playfields','pl1','Player 2'),
    m('span.lbl'      , 'Replays')  ,
    m('.button.import', { onclick: import_replay_click }, 'Import' ),
    m('.button.export', { onclick: import_replay_click }, 'Export' ),
    m('span.lbl'      , 'Snapshots'),
    m('.button.import', { onclick: import_snapshot_click }, 'Import' ),
    m('.button.export', { onclick: export_snapshot_click }, 'Export' )
  ])
}

export default function content(){
  if (state.stage != '[object ModeVs]') { return }
  if (state.state_component !== COMP_STAGE ) {return}
  return m('.content_wrap.mode_vs',m('.content',
    actions(),
    stack(0),
    stack(1),
    m('.clear')
  ))
}
