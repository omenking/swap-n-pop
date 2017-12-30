import * as m  from 'mithril'
import {state} from 'devtools/common/data'
import {toggle_garbage, queue_garbage} from 'devtools/common/port'

function select_class(val){
  if (val > 0)
    return 'active'
  return ''
}


function select_player(){
  return m('select.player_select',
     {
       onchange: m.withAttr('value',function(val){ state.garbage_queue.pi = val})
     },
  [
    m('option',{value: 0},'Pl 1'),
    m('option',{value: 1},'Pl 2')
  ])
}

function select_combo(){
  return m('select.combo_select',
   {
     onchange: m.withAttr('value',function(val){ state.garbage_queue.combo = val}),
     className: select_class(state.garbage_queue.combo)
   },
 [
    m('option',{value: 0 },'No Combo'),
    m('option',{value: 4 },'Combo x4'),
    m('option',{value: 5 },'Combo x5'),
    m('option',{value: 6 },'Combo x6'),
    m('option',{value: 7 },'Combo x7'),
    m('option',{value: 8 },'Combo x8'),
    m('option',{value: 9 },'Combo x9'),
    m('option',{value: 10 },'Combo x10'),
    m('option',{value: 11 },'Combo x11'),
    m('option',{value: 12 },'Combo x12'),
    m('option',{value: 13 },'Combo x13')
  ])
}

function select_chain(){
  return m('select.chain_select',
       {
         onchange: m.withAttr('value',function(val){ state.garbage_queue.chain = val}),
         className: select_class(state.garbage_queue.chain)
       },
    [
      m('option',{value: 0} ,'No Chain'),
      m('option',{value: 2} ,'Chain x2'),
      m('option',{value: 3} ,'Chain x3'),
      m('option',{value: 4} ,'Chain x4'),
      m('option',{value: 5} ,'Chain x5'),
      m('option',{value: 6} ,'Chain x6'),
      m('option',{value: 7} ,'Chain x7'),
      m('option',{value: 8} ,'Chain x8'),
      m('option',{value: 9} ,'Chain x9'),
      m('option',{value: 10},'Chain x10'),
      m('option',{value: 11},'Chain x11'),
      m('option',{value: 12},'Chain x12')
  ])
}

function checkbox(){
  return m("input[type='checkbox']",{
      onclick: m.withAttr('checked', function(val){ 
        state.garbage = val
        toggle_garbage()
      }),
      checked: state.garbage
    })
}

function selects(){
  if (state.garbage !== true) { return }
  return m('.selects',[select_player(),
  select_combo(),
  select_chain(),
  m('.button.queue', {onclick: queue_garbage}, '>>'),
  m('.clear')])
}

export default function(){
  return m('.section.queue_garbage',[
    m('.lbl',[
      checkbox(),
      'Garbage'
    ]),
    selects()
  ])
}
