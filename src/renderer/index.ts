import * as m  from 'mithril'
import { ipcRenderer as ipc } from 'electron';
import ui   from 'ui/main'
import game from 'core/game'
import fade from 'core/fade'
import controls from 'core/controls'
import Store          from 'common/store'
import Ui         from 'ui/mode'
const store = new Store()

import BootState       from 'states/boot'
import ConnectState    from 'states/connect'
import LoadState       from 'states/load'
import MenuState       from 'states/menu'
import ModePuzzleState from 'states/mode_puzzle'
import ModeSingleState from 'states/mode_single'
import ModeVsState     from 'states/mode_vs'
import PuzzleMenuState from 'states/puzzle_menu'

const states = [
  BootState,
  LoadState,
  MenuState,
  ConnectState,
  ModeVsState,
  ModeSingleState,
  ModePuzzleState,
  PuzzleMenuState
];

ui()

declare const window : any

// Create instance of each known state class and register them to the game
// instance.
states.forEach(stateClass => {
  const stateInstance = new stateClass();
  game.state.add(stateInstance.name, stateInstance);
});

game.state.start('boot')

ipc.on('play-single',(event,data) => {
  fade.out(function(){
    game.state.start('mode_single',true,false, {
      seed:    data.seed,
      timer:   data.timer
    })
  })
})
ipc.on('play-vs', (event,data) => {
  fade.out(function(){
    game.state.start('mode_vs',true,false, {
      seed:    data.seed,
      online:  data.online,
      cpu:     data.cpu,
      garbage: data.garbage,
      timer:   data.timer
    })
  })
})

ipc.on('replay-load', (event, {seed,inputs}) => {
  game.state.start('mode_vs',true,false, {
    seed:   seed,
    online: false,
    inputs: inputs,
    cpu: [false,false]
  })
})

ipc.on('network-connect', (event, data) => {
  game.state.start('connect',true,false,data)
})

ipc.on('snapshot-import', (event, data) => {
  window.stage.snapshots.snapshot_import(data)
})

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

window.snapshot_export_send = function(snapshot){ ipc.send('snapshot-export',snapshot) }
window.snapshot_import_send = function(){ ipc.send('snapshot-import') }
window.replay_export_send = function(){ ipc.send('replay-export') }
window.replay_import_send = function(){ ipc.send('replay-import') }
