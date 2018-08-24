import {
  STATIC,
  HANG,
  FALL,
  LAND,
  CLEAR,
  MOVE,
  GARBAGE
} from 'common/data'
import {state} from 'devtools/common/data'
import {update_panel} from 'devtools/common/port'
import * as m  from 'mithril'

function select_kind(){
  return m('select',
  {
    onchange: m.withAttr('value',function(val){ 
      state.panel_form.kind = val
      update_panel()
    }),
    value: state.panel_form.kind
  },[
    m('option',{value: null}, "null"),
    m('option',{value: 0}, "0 - Cyan"),
    m('option',{value: 1}, "1 - Blue"),
    m('option',{value: 2}, "2 - Green"),
    m('option',{value: 3}, "3 - Purple"),
    m('option',{value: 4}, "4 - Red"),
    m('option',{value: 5}, "5 - Yellow"),
    m('option',{value: 6}, "6 - Shock")
  ])
}

function select_state(){
  return m('select',
  {
    onchange: m.withAttr('value',function(val){ 
      state.panel_form.state = val
      update_panel()
    }),
    value: state.panel_form.state
  },[
    m('option', {value: STATIC}   , "STATIC"),
    m('option', {value: HANG}     , "HANG"),
    m('option', {value: FALL}     , "FALL"),
    m('option', {value: LAND}     , "LAND"),
    m('option', {value: MOVE}, "MOVE"),
    m('option', {value: CLEAR}    , "CLEAR"),
    m('option', {value: GARBAGE}  , "GARBAGE")
  ])
}

function onsubmit(e){
  e.preventDefault()
  update_panel()
  return false
}
function input_chain(){
  return m('form', {onsubmit: onsubmit},
    m("input[type='text']", {
    onchange: m.withAttr('value',function(val){ state.panel_form.chain = val}),
    value: state.panel_form.chain
  }))
}

function input_counter(){
  return m('form', {onsubmit: onsubmit},
  m("input[type='text']", {
    onchange: m.withAttr('value',function(val){ state.panel_form.counter = val}),
    value: state.panel_form.counter
  }))
}

declare const alert : any

function close(e){
  e.preventDefault()
  state.reset_panel_form(null)
  m.redraw()
  return false
}

export default function panel_form(pi,i,data,data_prev){
  if (
      state.selected_panel[0] === pi &&
      state.selected_panel[1] === i
     ) { 
    return m('.panel_form',[
    m('.close',{onclick: close},'[ x ]'),
    m('table',
      m('tr', m('td.lbl', 'Index')  , m('td', i)),
      m('tr', m('td.lbl', 'Kind')   , m('td', select_kind())),
      m('tr', m('td.lbl', 'State')  , m('td', select_state())),
      m('tr', m('td.lbl', 'Counter'), m('td', input_counter())),
      m('tr', m('td.lbl', 'Chain')  , m('td', input_chain()))
    )])
  }
  return m('.nada','')
}
