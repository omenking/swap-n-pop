import * as electron from 'electron'
import ui               from 'ui/main'
import game             from 'core/game'
import StatesBoot       from 'states/boot'
import StatesLoad       from 'states/load'
import StatesMenu       from 'states/menu'
import StatesModeVs     from 'states/mode_vs'
import StatesModePuzzle from 'states/mode_puzzle'
import StatesPuzzleMenu from 'states/puzzle_menu'
import StatesConnect    from 'states/connect'

const {ipcRenderer: ipc} = electron

ui()

function prep_state(klass){
  const state = new klass()
  return {
    init     : state.init,
    create   : state.create,
    update   : state.update,
    render   : state.render,
    shutdown : state.shutdown
  }
}

game.state.add('boot', new StatesBoot());
game.state.add('load'       , prep_state(StatesLoad))
game.state.add('menu'       , prep_state(StatesMenu))
game.state.add('connect'    , prep_state(StatesConnect))
game.state.add('mode_vs'    , prep_state(StatesModeVs))
game.state.add('mode_puzzle', prep_state(StatesModePuzzle))
game.state.add('puzzle_menu', prep_state(StatesPuzzleMenu))
game.state.start('boot')

ipc.on('play-vs', (event, {seed,online,cpu}) => {
  game.state.start('mode_vs',true,false, {
    seed:   seed,
    online: online,
    cpu:    cpu
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
