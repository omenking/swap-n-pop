import * as m  from 'mithril'
import {update_levels} from 'devtools/common/port'
import {state} from 'devtools/common/data'

function level_select(i){
  return m(`select.level_select.pl_${i}`,
   { 
     onchange: m.withAttr('value', function(val){
       state.levels[i] = parseInt(val)
       update_levels()
     }),
     value: state.levels[i]

   }, [
     m('option',{value: 1}, 'Level 1'),
     m('option',{value: 2}, 'Level 2'),
     m('option',{value: 3}, 'Level 3'),
     m('option',{value: 4}, 'Level 4'),
     m('option',{value: 5}, 'Level 5'),
     m('option',{value: 6}, 'Level 6'),
     m('option',{value: 7}, 'Level 7'),
     m('option',{value: 8}, 'Level 8'),
     m('option',{value: 9}, 'Level 9'),
     m('option',{value: 10}, 'Level 10')
   ]
  )
}

export default function(){
  return m('.section.levels',[
    m('.lbl'   , 'Levels'),
    level_select(0),
    level_select(1)
  ])
}
