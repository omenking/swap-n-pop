import {
  STATIC,
  HANG,
  FALL,
  LAND,
  SWAP_L,
  SWAP_R,
  SWAPPING_L,
  SWAPPING_R,
  CLEAR,
  GARBAGE
} from 'core/data'
import {state} from 'devtools_common/data'
import * as m  from 'mithril'

function select_kind(){
  return m('select',
  {
    onchange: m.withAttr('value',function(val){ state.panel_form.kind = val}),
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
    onchange: m.withAttr('value',function(val){ state.panel_form.state = val}),
    value: state.panel_form.state
  },[
    m('option', {value: STATIC}   , "STATIC"),
    m('option', {value: HANG}     , "HANG"),
    m('option', {value: FALL}     , "FALL"),
    m('option', {value: LAND}     , "LAND"),
    m('option', {value: SWAP_L}   , "SWAP_L"),
    m('option', {value: SWAP_R}   , "SWAP_R"),
    m('option', {value: SWAPPING_L}, "SWAPING_L"),
    m('option', {value: SWAPPING_R}, "SWAPING_R"),
    m('option', {value: CLEAR}    , "CLEAR"),
    m('option', {value: GARBAGE}  , "GARBAGE")
  ])
}

function input_chain(){
    return m("input[type='text']", {
    onchange: m.withAttr('value',function(val){ state.panel_form.chain = val}),
    value: state.panel_form.chain
  })
}

function input_counter(){
  return m("input[type='text']", {
    onchange: m.withAttr('value',function(val){ state.panel_form.counter = val}),
    value: state.panel_form.counter
  })
}


export default function panel_form(i,data,data_prev){
  if (state.selected_panel === i) { 
    return m('.panel_form',m('table',
      m('tr', m('td.lbl', 'Index')  , m('td', i)),
      m('tr', m('td.lbl', 'Kind')   , m('td', select_kind())),
      m('tr', m('td.lbl', 'State')  , m('td', select_state())),
      m('tr', m('td.lbl', 'Counter'), m('td', input_counter())),
      m('tr', m('td.lbl', 'Chain')  , m('td', input_chain()))
    ))
  } else {
    return
  }
}
