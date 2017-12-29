import * as m from 'mithril'
import {port} from 'devtools/common/port'


function export_click(){
  port.postMessage({port: 'content-script',msg:{action:'replay-export'}})
}
function import_click(){
  port.postMessage({port: 'content-script',msg:{action:'replay-import'}})
}

export default function(){
  return m('.section.snapshot_import_export',[
    m('.lbl'      , 'Snapshots'),
    m('.button.import', { onclick: import_click }, 'Import' ),
    m('.button.export', { onclick: export_click }, 'Export' )
  ])
}
