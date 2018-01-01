import * as m from 'mithril'
import {ipcRenderer as ipc} from 'electron'

import Store from 'common/store'
import ExternalAssets from "common/external_assets"

const store = new Store()
let asset_dir = store.get('asset-dir')
ipc.send('asset-list')

// change asset dir to a new one
ipc.on('asset-dir', (e, new_dir) => {
  asset_dir = new_dir
  m.redraw()
})

export default function render() {
  return m('form', [
    m('.text_field.replay_dir',[
      m('label', 'Asset Folder Location:'),
      m('.input', asset_dir),
      m('.buttons', [
        //m('.button.reveal', {onclick: () => ipc.send('asset-dir-reveal')}, 'Reveal'),
        m('.button.change', {onclick: () => ipc.send('asset-dir-change')}, 'Change'),
        m('.button.reset' , {onclick: () => ipc.send('asset-dir-reset')},  'Reset'),
      ]),
      m('.clear')
    ])
  ])
}
