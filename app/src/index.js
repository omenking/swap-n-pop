const APP = require('../app')('../')
const {ipcRenderer: ipc} = require('electron')

function attach_state(klass){
  var state = new klass()
  return {
    init:     state.init,
    create:   state.create,
    update:   state.update,
    render:   state.render,
    shutdown: state.shutdown
  }
}

const {WIN_WIDTH, WIN_HEIGHT} = require(APP.path.core('data'))
const game         = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game')
const States       = require(APP.path.root('src','renderer','states'))(game)
const CoreControls = require(APP.path.core('controls'))(game)
const CoreSounds   = require(APP.path.core('sounds'))(game)

game.controls = new CoreControls()
game.sounds   = new CoreSounds()
game.state.add('boot'       , attach_state(States.Boot))
game.state.add('menu'       , attach_state(States.Menu))
game.state.add('connect'    , attach_state(States.Connect))
game.state.add('mode_vs'    , attach_state(States.ModeVs))
game.state.add('mode_puzzle', attach_state(States.ModePuzzle))
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
