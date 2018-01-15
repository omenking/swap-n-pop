import * as m  from 'mithril'
import {ipcRenderer as ipc} from 'electron'
import controls from 'core/controls'

import Ui         from 'ui/mode'
import UiInput    from 'ui/input'
import UiNetwork  from 'ui/network'
import UiAudio    from 'ui/audio'
import UiReplay   from 'ui/replay'
import UiAssets   from 'ui/external_assets'
import {render as UiLogin}  from 'ui/login'
import {render as UiSignup} from 'ui/signup'
import {render as UiForgot} from 'ui/forgot'
import {render as UiIncomplete} from 'ui/incomplete'

/** declare html window.document to be usable */
declare var window: {
  document: any
}

/**
 * Wether the current mode is active or not
 * @param new_mode if the current mode equals the new mode return active
 */
function class_tab(new_mode: string) : string {
  return Ui.mode === new_mode ? 'active' : ''
}

/**
 * Returns a function that will set the current Ui.mode to the defined one
 * @param new_mode object returns a object
 */
function click_tab(new_mode: string) : object {
  return () => Ui.mode = new_mode
}

/** Return a mithril navigator object with all the tabs and on click methods, names etc */
function nav() : object {
  function nav_tab(mode: string, name: string) : object {
    return m('.tab', {className: class_tab(mode), onclick: click_tab(mode)}, name)
  }

  return m('nav.divider', [
    nav_tab('input', 'Inputs'),
    nav_tab('network', 'Network'),
    nav_tab('audio', 'Audio'),
    nav_tab('replay', 'Replay'),
    nav_tab('assets', 'External Assets'),
    m('.clear')
  ])
}

/**
 * Looks through all contents and once one is the same as the current mode it gets returned
 * @returns a mithril object with each mode's content function being called
 */
function content() : object {
  function check_content(contents: any) {
    for (let content of contents) {
      if (Ui.mode === content.mode)
        return m(`.content.settings_${content.mode}`, content.method())
    }
  }

  return check_content([
    {mode: 'input',   method: UiInput},
    {mode: 'network', method: UiNetwork},
    {mode: 'audio',   method: UiAudio},
    {mode: 'replay',  method: UiReplay},
    {mode: 'assets',  method: UiAssets}
  ])
}


const app = {
  view: function(){
    if       (Ui.mode === 'incomplete' ) { return UiIncomplete()  }
    else if  (Ui.mode === 'login'      ) { return UiLogin()  }
    else if  (Ui.mode === 'signup'     ) { return UiSignup() }
    else if  (Ui.mode === 'forgot'     ) { return UiForgot() }
    else if  (Ui.mode !== false) {
      return m('.wrap1', m('.wrap2',
       [nav(), content()]
      ))
    } else {
      undefined
    }
  }
}

/** mounts the all mithril objects to the html ui div, only visible if Ui.mode is true */
export default function render(){
  m.mount(window.document.getElementById('ui'), app)
}

ipc.on('close', function(event, data) {
  console.log('closing time')
  Ui.access()
})

ipc.on('reload', function(event, data) {
  console.log('reload',data.mode)
  controls.stop()
  Ui.mode = data.mode
  window.document.getElementById('game').classList.add('hide')
  m.redraw()
})

