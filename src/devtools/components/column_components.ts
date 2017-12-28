import * as m  from 'mithril'
import {COMP_STAGE, COMP_GARBA, state} from 'devtools_common/data'

function heading(){
  return m('.heading',[
    m('.title','Components'),
    m('.clear')
  ])
}

function item_click(key){
  return function(){
    state.state_component = key
  }
}

function item_class(key){
  if (state.state_component === key)
    return 'active'
  return ''
}

function item(key,title){
  return m('.item.component', {
             onclick: item_click(key), 
             className: item_class(key)
  },title)
}
function items(){
  let items = [
    item(COMP_STAGE,'Stage (ModeVs)'),
    item(COMP_GARBA,'GarbageQueue')
  ]
  return m('.column_content',m('.items',items))
}

export default function column(){
  if (state.stage === null) { return }
  return m('.column.components',[
    heading(),
    items()
  ])
}
