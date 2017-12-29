import * as m from 'mithril'
import {state} from 'devtools/common/data'


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

export default function(){
  return m('.section.stack_actions',[
    m('table',[
      m('tr',[
        m('td',m('.lbl.first','Rows')),
        m('td',checkbox('rows','inv','INV')),
        m('td',checkbox('rows','vis','VIS')),
      ]),
      m('tr',[
        m('td',m('.lbl.playfields','Playfields')),
        m('td',checkbox('playfields','pl0','PL 1')),
        m('td',checkbox('playfields','pl1','PL 2'))
      ])
    ])
  ])
}
