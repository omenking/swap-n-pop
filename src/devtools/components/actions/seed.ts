import * as m  from 'mithril'
import {state} from 'devtools/common/data'

function input_seed(){
  return m("input[type='text']", {
    onchange: m.withAttr('value',function(val){ state.seed = val}),
    value: state.seed
  })
}

export default function(){
  return m('.section.actions_seed',[
    input_seed(),
    m('.button', 'Gen'),
    m('.clear')
  ])
}
