import * as m from 'mithril'
import {port} from 'devtools/common/port'

function export_click(){
  port.postMessage({port: 'content-script',msg:{action:'snapshot-export'}})
}
function import_click(){
  port.postMessage({port: 'content-script',msg:{action:'snapshot-import'}})
}

export default function(){
  return m('.section.replay_import_export',[
    m('.lbl'      , 'Replays')  ,
    m('.button.import', { onclick: import_click }, 'Import' ),
    m('.button.export', { onclick: import_click }, 'Export' )
  ])
}
