import * as m  from 'mithril'
import {state} from 'devtools_common/data'
import toast   from 'devtools_components/toast'

function input_seed(){
  return m("input[type='text']", {
    onchange: m.withAttr('value',function(val){ state.actions_primer.seed = val}),
    value: state.actions_primer.seed
  })
}

function actions(){
  return m('.actions',[
    input_seed(),
    m('.button', 'Gen'),
    m('.clear')
  ])
}

export default function content_primer(){
  if (state.stage != null) { return }
  return m('.content_wrap.primer',m('.content',
    actions(),
    toast('Data will appear when you start a game and enter step mode')
  ))
}
