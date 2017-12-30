import * as m  from 'mithril'
import {state} from 'devtools/common/data'
import {toggle_timer, update_timer} from 'devtools/common/port'

function checkbox(){
  return m("input[type='checkbox']",{
      onclick: m.withAttr('checked', function(val){ 
        if (state.time_trial_val === 0) {state.time_trial_val = 120}
        state.time_trial = val
        toggle_timer()
      }),
      checked: state.time_trial
  })
}

function onsubmit(e){
  e.preventDefault()
  update_timer()
  return false
}

function input(){
  if (state.time_trial !== true) {return }
  return m('form', {onsubmit: onsubmit},
    m("input[type='text']",{
      oninput: m.withAttr('value',function(val){
        state.time_trial_val = parseInt(val)
        update_timer()
      }),
      value: state.time_trial_val
    })
  )
}

export default function(){
  return m('.section.time_trial',[
    m('.lbl',[
      checkbox(),
      'Timer'
    ]),
    input(),
    m('.clear')
  ])
}
