import * as m  from 'mithril'
/*
 * currently unused
 */
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
