import electron from 'electron'
import ui from '@/ui/main'

const {ipcRenderer: ipc} = electron

ui()

import { WIN_WIDTH, WIN_HEIGHT } from '@/core/data';
const game         = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game')
import States       from '@/states'
import CoreControls from '@/core/controls'
import CoreSounds   from '@/core/sounds'
import Server       from '../main/server' // should be moved to common

game.controls = new CoreControls()
game.sounds   = new CoreSounds()
game.server   = new Server()
game.state.add('boot'       , States.Boot)
game.state.add('load'       , States.Load)
game.state.add('menu'       , States.Menu)
game.state.add('connect'    , States.Connect)
game.state.add('mode_vs'    , States.ModeVs)
game.state.add('mode_puzzle', States.ModePuzzle)
game.state.add('puzzle_menu', States.PuzzleMenu)
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
