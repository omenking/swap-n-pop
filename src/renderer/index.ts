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


game.state.add('boot'       , new StatesBoot())
game.state.add('load'       , new StatesLoad())
game.state.add('menu'       , new StatesMenu())
game.state.add('connect'    , new StatesConnect())
game.state.add('mode_vs'    , new StatesModeVs())
game.state.add('mode_puzzle', new StatesModePuzzle())
game.state.add('puzzle_menu', new StatesPuzzleMenu())
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
