import electron from 'electron'
import ui       from 'ui/main'

const {ipcRenderer: ipc} = electron

ui()

import game             from 'core/game'
import StatesBoot       from 'states/boot'
import StatesLoad       from 'states/load'
import StatesMenu       from 'states/menu'
import StatesModeVs     from 'states/mode_vs'
import StatesModePuzzle from 'states/mode_puzzle'
import StatesPuzzleMenu from 'states/puzzle_menu'
import StatesConnect    from 'states/connect'

game.state.add('boot'       , StatesBoot)
game.state.add('load'       , StatesLoad)
game.state.add('menu'       , StatesMenu)
game.state.add('connect'    , StatesConnect)
game.state.add('mode_vs'    , StatesModeVs)
game.state.add('mode_puzzle', StatesModePuzzle)
game.state.add('puzzle_menu', StatesPuzzleMenu)
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
