import * as m  from 'mithril'
import {state} from 'devtools/common/data'
import {regenerate_from_seed} from 'devtools/common/port'

function input_seed(){
  return m("input[type='text']", {
    onchange: m.withAttr('value',function(val){ state.seed = val}),
    value: state.seed
  })
}

function gen(){
  regenerate_from_seed()
}

export default function(){
  return m('.section.actions_seed',[
    input_seed(),
    m('.button', {onclick: gen},'Gen'),
    m('.clear')
  ])
}
