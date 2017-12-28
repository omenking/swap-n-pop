import {state} from 'devtools_common/data'
import * as m  from 'mithril'
/*
 * currently unused
 */
function tab_active(kind){
  if (kind === state.state_component)
    return 'active'
  return ''
}

function tab_click(kind){
  return function(){
    state.state_component = kind
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
